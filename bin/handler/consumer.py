#coding: utf-8
import re
import os, sys
from zbase.base.dbpool import with_database
import logging, time, random
import traceback

from uyubase.base.response import success, error, UAURET
from uyubase.uyu import define
from uyubase.uyu.define import UYU_OP_OK, UYU_OP_ERR
from uyubase.base.uyu_user import UUser

from zbase.web import core
from zbase.base.dbpool import with_database
from zbase.web.validator import with_validator_self, Field, T_REG, T_INT, T_STR

from uyubase.base.usession import uyu_check_session, USession
from runtime import g_rt
from config import cookie_conf

from uyubase.uyu.define import UYU_SYS_ROLE_STORE, UYU_OP_ERR, UYU_OP_OK, UYU_USER_ROLE_COMSUMER, UYU_USER_STATE_OK

import logging, datetime
import tools
log = logging.getLogger()


class LoadConsumerDetailHandler(core.Handler):
    _post_handler_fields = [
        # Field("mobile", T_STR, False, match=r'^(1\d{10})$'),
        Field("mobile", T_STR, False),
    ]

    def _post_handler_errfunc(self, msg):
        return error(UAURET.PARAMERR, respmsg=msg)

    @with_database('uyu_core')
    def _get_remain_times(self, userid):
        ret = self.db.select_one(table='consumer', fields='sum(remain_times) as remain_times', where={'userid': userid})
        remain_times = int(ret['remain_times']) if ret['remain_times'] else 0
        return remain_times


    @uyu_check_session(g_rt.redis_pool, cookie_conf, UYU_SYS_ROLE_STORE)
    @with_validator_self
    def _post_handler(self):
        if not self.user.sauth:
            return error(UAURET.SESSIONERR)
        params = self.validator.data
        mobile = params.get('mobile')
        uu = UUser()
        is_mobile = tools.check_mobile(mobile)
        if is_mobile:
            uu.load_user_by_mobile(mobile)
        else:
            uu.load_user_by_login_name(mobile)
        log.debug('##len:%s', len(uu.udata))
        log.debug('##udata:%s', uu.udata)
        if len(uu.udata) == 0:
            log.debug('mobile=%s not exists', mobile)
            return error(UAURET.USERERR)

        if uu.udata["state"]!= UYU_USER_STATE_OK or uu.udata["user_type"] != UYU_USER_ROLE_COMSUMER:
            return error(UAURET.USERERR)

        ret = {}
        ret["userid"] = uu.udata["id"]
        ret["mobile"] = uu.udata["phone_num"]
        ret["username"] = uu.udata.get("username", "")
        ret["nick_name"] = uu.udata.get("nick_name", "")
        ret["email"] = uu.udata.get("email", "")
        ret["login_name"] = uu.udata.get("login_name", "")
        ret["phone_num"] = uu.udata.get("phone_num", "")
        ret["state"] = define.UYU_USER_STATE_MAP.get(uu.udata.get("state"), '')
        ret["create_time"] = datetime.datetime.strftime(uu.udata.get("ctime"), '%Y-%m-%d %H:%M:%S') if uu.udata.get("ctime") else ''
        ret["remain_times"] = self._get_remain_times(uu.udata["id"])
        return success(ret)

    def POST(self, *args):
        return self._post_handler()


class LoadConsumerHandler(core.Handler):
    _post_handler_fields = [
        # Field("mobile", T_STR, False, match=r'^(1\d{10})$'),
        Field("mobile", T_STR, False),
    ]

    def _post_handler_errfunc(self, msg):
        return error(UAURET.PARAMERR, respmsg=msg)

    @uyu_check_session(g_rt.redis_pool, cookie_conf, UYU_SYS_ROLE_STORE)
    @with_validator_self
    def _post_handler(self):
        if not self.user.sauth:
            return error(UAURET.SESSIONERR)
        params = self.validator.data
        mobile = params.get('mobile')
        uu = UUser()
        is_mobile = tools.check_mobile(mobile)
        if is_mobile:
            uu.load_user_by_mobile(mobile)
        else:
            uu.load_user_by_login_name(mobile)
        log.debug('##len:%s', len(uu.udata))
        log.debug('##udata:%s', uu.udata)
        if len(uu.udata) == 0:
            return error(UAURET.USERERR)

        if uu.udata["state"]!= UYU_USER_STATE_OK or uu.udata["user_type"] != UYU_USER_ROLE_COMSUMER:
            return error(UAURET.USERERR)

        ret = {}
        ret["userid"] = uu.udata["id"]
        ret["mobile"] = uu.udata["phone_num"]
        ret["username"] = uu.udata.get("username", "")
        ret["nick_name"] = uu.udata.get("nick_name", "")
        return success(ret)

    def POST(self, *args):
        return self._post_handler()
