# -*- coding: utf-8 -*-

import traceback
from zbase.web import core
from zbase.web import template
from zbase.web.validator import with_validator_self, Field, T_REG, T_INT, T_STR, T_FLOAT
from zbase.base.dbpool import with_database
from uyubase.base.response import success, error, UAURET
from uyubase.base.usession import uyu_check_session, uyu_check_session_for_page
from uyubase.base.uyu_user import UUser
from uyubase.uyu.define import UYU_SYS_ROLE_STORE
from uyubase.uyu import define

from runtime import g_rt
from config import cookie_conf
import logging, datetime, time
import tools
log = logging.getLogger()


class SettleInfoHandler(core.Handler):
    _get_handler_fields = [
        Field('page', T_INT, False),
        Field('maxnum', T_INT, False),
    ]

    def _get_handler_errfunc(self, msg):
        return error(UAURET.PARAMERR, respmsg=msg)

    @uyu_check_session(g_rt.redis_pool, cookie_conf, UYU_SYS_ROLE_STORE)
    @with_validator_self
    def _get_handler(self, *args):
        if not self.user.sauth:
            return error(UAURET.SESSIONERR)
        try:
            data = {}
            params = self.validator.data
            curr_page = params.get('page')
            max_page_num = params.get('maxnum')

            uop = UUser()
            uop.call('load_info_by_userid', self.user.userid)
            self.store_id = uop.sdata['store_id']

            start, end = tools.gen_ret_range(curr_page, max_page_num)
            info_data = self._query_handler()

            data['info'] = self._trans_record(info_data[start:end])
            return success(data)
        except Exception as e:
            log.warn(e)
            log.warn(traceback.format_exc())
            return error(UAURET.DATAERR)

    @with_database('uyu_core')
    def _query_handler(self):

        where = {'store_id': self.store_id}
        keep_fields = [
            'settle_cycle', 'settle_trainning_nums', 'settle_amt', 'store_divide_amt'
        ]
        other = ' order by settle_cycle desc '
        ret = self.db.select(table='settlement_record', fields=keep_fields, where=where, other=other)
        return ret


    @with_database('uyu_core')
    def _trans_record(self, data):
        if not data:
            return []

        for item in data:
            item['settle_cycle'] = item['settle_cycle'].strftime('%Y-%m')
            item['store_divide_amt'] = '%0.2f' % (item['store_divide_amt'] / 100.0)
            item['settle_amt'] = '%0.2f' % (item['settle_amt'] / 100.0)

        return data

    def GET(self):
        try:
            self.set_headers({'Content-Type': 'application/json; charset=UTF-8'})
            data = self._get_handler()
            log.debug('#return data:%s', data)
            return data
        except Exception as e:
            log.warn(e)
            log.warn(traceback.format_exc())
            return error(UAURET.SERVERERR)
