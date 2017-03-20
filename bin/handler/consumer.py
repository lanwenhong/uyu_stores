#coding: utf-8
import os, sys
from zbase.base.dbpool import with_database
import logging, time, random
import traceback

from uyubase.base.response import success, error, UAURET
from uyubase.uyu import define
from uyubase.uyu.define import UYU_OP_OK, UYU_OP_ERR
from uyubase.base.uyu_user import UUser

from zbase.web import core
from zbase.web.validator import with_validator_self, Field, T_REG, T_INT, T_STR

from uyubase.base.usession import uyu_check_session, USession
from runtime import g_rt
from config import cookie_conf

from uyubase.uyu.define import UYU_SYS_ROLE_STORE, UYU_OP_ERR, UYU_OP_OK, UYU_USER_ROLE_COMSUMER, UYU_USER_STATE_OK

import logging, datetime
log = logging.getLogger()


class LoadConsumerHandler(core.Handler):
    _post_handler_fields = [
        Field("mobile",  T_STR, False, match=r'^(1\d{10})$'),
    ]
    

    @uyu_check_session(g_rt.redis_pool, cookie_conf, UYU_SYS_ROLE_STORE)
    @with_validator_self
    def _post_handler(self):
        if not self.user.sauth:
            return error(UAURET.SESSIONERR)
        params = self.validator.data
        uu = UUser() 
        uu.load_user_by_mobile(params["mobile"])
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
