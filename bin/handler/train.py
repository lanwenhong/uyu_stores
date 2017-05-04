#coding: utf-8

from zbase.web import core
from zbase.web.validator import with_validator_self, Field, T_REG, T_INT, T_STR


from uyubase.base.usession import uyu_check_session, USession
from uyubase.base.uyu_user import VCode, UUser
from uyubase.uyu.define import UYU_SYS_ROLE_STORE
from uyubase.uyu import define


from zbase.base.dbpool import with_database

from uyubase.base.response import success, error, UAURET
from uyubase.uyu.define import UYU_SYS_ROLE_OP, UYU_USER_ROLE_SUPER, UYU_OP_ERR, UYU_OP_OK

from uyubase.base.training_op import TrainingOP

from runtime import g_rt
from config import cookie_conf

import logging, datetime, calendar
import tools
log = logging.getLogger()

class StoreToComsumer(core.Handler):
    _post_handler_fields = [
        # Field("userid", T_INT, False),
        Field("busicd", T_STR, False),
        # Field("consumer_mobile", T_STR, False, match=r'^(1\d{10})$'),
        Field("consumer_mobile", T_STR, False),
        Field("training_times", T_INT, False),
    ]

    def _post_handler_errfunc(self, msg):
        return error(UAURET.PARAMERR, respmsg=msg)

    @with_database('uyu_core')
    def _check_permission(self, params):
        mobile = params["consumer_mobile"]
        is_mobile = tools.check_mobile(mobile)
        if is_mobile:
            dbret = self.db.select_one("auth_user", {"phone_num": mobile})
        else:
            dbret = self.db.select_one("auth_user", {"login_name": mobile})

        if params["busicd"] != define.BUSICD_CHAN_ALLOT_TO_COSUMER:
            return error(UAURET.BUSICEERR)

        if not dbret:
            log.warn("mobile: %s not register", mobile)
            return UYU_OP_ERR
        params["consumer_id"] = dbret["id"]
        state = dbret["state"]
        user_type = dbret["user_type"]
        # if user_type != define.UYU_USER_ROLE_COMSUMER or state != define.UYU_USER_STATE_OK:
        if user_type not in [define.UYU_USER_ROLE_COMSUMER, define.UYU_USER_ROLE_EYESIGHT] or state != define.UYU_USER_STATE_OK:
            log.debug("user: %s forbidden user_type: %d state: %d", mobile, user_type, state)
            return UYU_OP_ERR

        dbret = self.db.select_one("channel", {"id": self.user.sdata["channel_id"]})
        if not dbret:
            return UYU_OP_ERR
        params["ch_training_amt_per"] = dbret["training_amt_per"]

        return UYU_OP_OK


    @uyu_check_session(g_rt.redis_pool, cookie_conf, UYU_SYS_ROLE_STORE)
    @with_validator_self
    def _post_handler(self):
        if not self.user.sauth:
            return error(UAURET.SESSIONERR)

        params = self.validator.data
        log.debug("client data: %s", params)

        mobile = params.get('consumer_mobile')
        log.debug('mobile=%s and type=%s', mobile, type(mobile))
        if not isinstance(mobile, basestring):
            log.debug('invalid mobile after validator trans')
            return error(UAURET.DATAERR)

        self.user.load_user()
        self.user.load_profile()
        self.user.load_store()
        if self._check_permission(params) == UYU_OP_ERR:
             return error(UAURET.ORDERERR)


        params["training_amt"] = params["training_times"] * self.user.sdata["training_amt_per"]
        params["store_id"] = self.user.sdata["id"]
        params["store_training_amt_per"] = self.user.sdata["training_amt_per"]
        params["channel_id"] = self.user.sdata["channel_id"]


        log.debug("after add client data: %s", params)

        top = TrainingOP(cdata=params, suser=self.user.udata, session=self.session)
        ret = top.create_store_allot_to_consumer_order()
        if top.respcd:
            return error(top.respcd)
        if ret == UYU_OP_ERR:
            return error(UAURET.ORDERERR)
        return success({})

    def POST(self):
        self.set_headers({'Content-Type': 'application/json; charset=UTF-8'})
        return self._post_handler()
