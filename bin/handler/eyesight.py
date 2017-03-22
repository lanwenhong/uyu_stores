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


class EyesightInfoHandler(core.Handler):
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

            data['info'] = info_data[start:end]
            return success(data)
        except Exception as e:
            log.warn(e)
            log.warn(traceback.format_exc())
            return error(UAURET.DATAERR)


    @with_database('uyu_core')
    def _query_handler(self):

        where = {'store_id': self.store_id, 'is_valid': define.UYU_STORE_EYESIGHT_BIND}
        other = ' order by ctime desc'
        keep_fields = [
            'store_eyesight_bind.id', 'store_eyesight_bind.eyesight_id',
            'store_eyesight_bind.ctime', 'auth_user.username']
        ret = self.db.select_join(
            table1='store_eyesight_bind',
            table2='auth_user',
            on={'store_eyesight_bind.eyesight_id': 'auth_user.id'},
            fields=keep_fields, where=where, other=other)
        return ret

    def GET(self):
           try:
               data = self._get_handler()
               return data
           except Exception as e:
               log.warn(e)
               log.warn(traceback.format_exc())
               return error(UAURET.SERVERERR)
