#coding: utf-8
from zbase.web import core
from zbase.web.validator import with_validator_self, Field, T_REG, T_INT, T_STR


from uyubase.base.usession import uyu_set_cookie, USession
from uyubase.base.uyu_user import VCode, UUser
from uyubase.uyu.define import UYU_SYS_ROLE_STORE
from zbase.base.dbpool import with_database

from uyubase.base.response import success, error, UAURET
from uyubase.uyu.define import UYU_SYS_ROLE_OP, UYU_USER_ROLE_SUPER, UYU_OP_ERR, UYU_USER_ROLE_STORE

from runtime import g_rt
from config import cookie_conf

import logging

log = logging.getLogger()


class LoginHandler(core.Handler):
    _post_handler_fields = [
        Field('mobile', T_REG, False, match=r'^(1\d{10})$'),
        Field('new_password', T_STR, False),
        Field('old_password', T_STR, False),
    ]

    @with_database('uyu_core')
    def _get_div_type(self, userid):
        ret = self.db.select_one('stores',  {"userid": userid})
        chan_id = ret["channel_id"]
        ret = self.db.select_one("channel", {"id": chan_id})
        is_prepayment = ret["is_prepayment"]

        return is_prepayment

    @uyu_set_cookie(g_rt.redis_pool, cookie_conf, UYU_USER_ROLE_STORE)
    @with_validator_self
    def _post_handler(self, *args):
        params = self.validator.data
        mobile = params['mobile']
        new_password = params["new_password"]
        old_password = params["old_password"]

        u_op = UUser()
        ret = u_op.call("check_userlogin", mobile, new_password, UYU_SYS_ROLE_STORE, old_password)
        if not u_op.login or ret == UYU_OP_ERR:
            log.warn("mobile: %s login forbidden", mobile)
            return error(UAURET.USERERR)

        log.debug("get user data: %s", u_op.udata)
        log.debug("userid: %d login succ", u_op.udata["id"])

        is_prepayment = self._get_div_type(u_op.udata["id"])
        return success({"userid": u_op.udata["id"], "is_prepayment": is_prepayment})

    def POST(self, *args):
        ret = self._post_handler(args)
        log.debug("ret: %s", ret)
        return ret
