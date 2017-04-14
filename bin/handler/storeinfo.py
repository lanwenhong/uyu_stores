#coding: utf-8
from zbase.web import core
from zbase.web.validator import with_validator_self, Field, T_REG, T_INT, T_STR


from uyubase.base.usession import uyu_check_session, USession
from uyubase.base.uyu_user import VCode, UUser
from uyubase.uyu.define import UYU_SYS_ROLE_STORE
from uyubase.uyu import define


from zbase.base.dbpool import with_database

from uyubase.base.response import success, error, UAURET
from uyubase.uyu.define import UYU_SYS_ROLE_OP, UYU_USER_ROLE_SUPER,UYU_OP_ERR

from runtime import g_rt
from config import cookie_conf

import logging, datetime, calendar

log = logging.getLogger()


class StoreInfoHandler(core.Handler):
    _get_handler_fields = [
        Field('userid', T_INT, False),
    ]

    def _get_handler_errfunc(self, msg):
        return error(UAURET.PARAMERR, respmsg=msg)

    @with_database('uyu_core')
    def _gen_training_dayinfo(self, store_id):
        q_day = datetime.datetime.now().strftime("%Y-%m-%d")
        q_start = q_day + " " + "00:00:00"
        q_end = q_day + " " + "23:59:59"
        log.debug("q_start: %s q_end: %s", q_start, q_end)
        sql = "select sum(training_times), sum(training_amt) from training_operator_record where store_id=%d and busicd='%s' and (create_time BETWEEN '%s' and '%s') and status=%d" % (
            store_id,
            define.BUSICD_CHAN_ALLOT_TO_COSUMER,
            q_start,
            q_end,
            define.UYU_ORDER_STATUS_SUCC,
        )
        ret = self.db.get(sql)
        if not ret:
            return 0, 0
        t = int(ret.get("sum(training_times)")) if ret.get("sum(training_times)") else 0
        a = int(ret.get("sum(training_amt)")) if ret.get("sum(training_amt)") else 0
        log.debug("t: %s a: %s", t, a)

        if t and a:
            return t, a

        return 0, 0


    @with_database('uyu_core')
    def _gen_training_moninfo(self, store_id):
        q_mon = datetime.datetime.now().strftime("%Y-%m")
        log.debug("mon: %s", q_mon[-2:])
        d_last = str(calendar.monthrange(int(q_mon[:4]), int(q_mon[-2:]))[1])
        q_start = q_mon + "-" + "01" + " " + "00:00:00"
        q_end = q_mon + "-" + d_last + " " + "23:59:59"
        log.debug("q_start: %s q_end: %s", q_start, q_end)
        sql = "select sum(training_times), sum(training_amt) from training_operator_record where store_id=%d and busicd='%s' and (create_time BETWEEN '%s' and '%s') and status=%d" % (
            store_id,
            define.BUSICD_CHAN_ALLOT_TO_COSUMER,
            q_start,
            q_end,
            define.UYU_ORDER_STATUS_SUCC,
        )
        ret = self.db.get(sql)
        if not ret:
            return 0, 0
        t = int(ret.get("sum(training_times)")) if ret.get("sum(training_times)") else 0
        a = int(ret.get("sum(training_amt)")) if ret.get("sum(training_amt)") else 0
        log.debug("t: %s a: %s", t, a)

        if t and a:
            return t, a
        return 0, 0

    @with_database('uyu_core')
    def _get_prepayflag(self, channel_id):
        dbret = self.db.select_one('stores', {"channel_id": channel_id})
        return dbret.get("is_prepayment", 0)


    @uyu_check_session(g_rt.redis_pool, cookie_conf, UYU_SYS_ROLE_STORE)
    @with_validator_self
    def _get_handler(self):
        params = self.validator.data
        userid = params["userid"]

        self.user.load_user()
        self.user.load_profile()
        self.user.load_store()

        store_id = self.user.sdata["id"]
        d_t, d_amt = self._gen_training_dayinfo(store_id)
        m_t, m_amt = self._gen_training_moninfo(store_id)

        if not self.user.udata or not self.user.pdata or not self.user.sdata:
            return error(UAURET.USERERR)
        ret = {}
        ret["store_name"] = self.user.sdata.get("store_name", "")
        ret["remain_times"] = self.user.sdata.get("remain_times", 0)
        ret["d_train"] = d_t
        ret["d_amt"] = d_amt
        ret["m_train"] = m_t
        ret["m_amt"] = m_amt
        ret["is_prepayment"] = self._get_prepayflag(self.user.sdata["channel_id"])

        return success(ret)

    def GET(self, *args):
        return self._get_handler()
