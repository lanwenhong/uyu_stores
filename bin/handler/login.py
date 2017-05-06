#coding: utf-8
from zbase.web import core
from zbase.web.validator import with_validator_self, Field, T_REG, T_INT, T_STR


from uyubase.base.usession import uyu_set_cookie, USession
from uyubase.base.uyu_user import VCode, UUser
from uyubase.uyu.define import UYU_SYS_ROLE_STORE
from zbase.base.dbpool import with_database

from uyubase.base.response import success, error, UAURET
from uyubase.uyu import define
from uyubase.uyu.define import UYU_SYS_ROLE_OP, UYU_USER_ROLE_SUPER, UYU_OP_ERR, UYU_USER_ROLE_STORE
from uyubase.base.send_sms import UYUSendSMS

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

    def _post_handler_errfunc(self, msg):
        return error(UAURET.PARAMERR, respmsg=msg)

    @with_database('uyu_core')
    def _get_div_type(self, userid):
        ret = self.db.select_one('stores',  {"userid": userid})
        chan_id = ret["channel_id"]
        ret = self.db.select_one("channel", {"id": chan_id})
        is_prepayment = ret["is_prepayment"]

        return is_prepayment


    @with_database('uyu_core')
    def _check_bind(self, userid):
        ret = self.db.select_one('store_eyesight_bind', {'eyesight_id': userid, 'is_valid': define.UYU_STORE_EYESIGHT_BIND})
        return ret

    @with_database('uyu_core')
    def _get_store_userid(self, store_id):
        ret = self.db.select_one('stores', {'id': store_id})
        return ret

    @with_database('uyu_core')
    def _get_user(self, userid):
        ret = self.db.select_one(table='auth_user', fields='*', where={'id': userid})
        return ret

    @uyu_set_cookie(g_rt.redis_pool, cookie_conf, UYU_USER_ROLE_STORE)
    @with_validator_self
    def _post_handler(self, *args):
        params = self.validator.data
        mobile = params['mobile']
        new_password = params["new_password"]
        old_password = params["old_password"]

        u_op = UUser()
        ret = u_op.call("check_userlogin", mobile, new_password, UYU_SYS_ROLE_STORE, old_password)
        if not u_op.udata:
            return error(UAURET.USERNOTEXISTS)

        if not u_op.login or ret == UYU_OP_ERR:
            log.warn("mobile: %s login forbidden", mobile)
            return error(UAURET.PWDERR)

        log.debug("get user data: %s", u_op.udata)
        log.debug("userid: %d login succ", u_op.udata["id"])

        user_type = u_op.udata['user_type']
        if user_type == define.UYU_USER_ROLE_EYESIGHT:
            ret = self._check_bind(u_op.udata["id"])
            if not ret:
                return error(UAURET.LOGINERR)
            else:
                login_id = u_op.udata["id"]
                store_id = ret.get('store_id')
                s_ret = self._get_store_userid(store_id)
                userid = s_ret.get('userid')

                store_ret = self._get_user(userid)
                log.debug('store userid=%s, ret=%s', userid, store_ret)
                store_status = store_ret.get('state')
                if store_status != define.UYU_USER_STATE_OK:
                    return error(UAURET.LOGINERR)

                is_prepayment = s_ret.get('is_prepayment')
                if login_id > 30000 and login_id < 40000:
                    login_old_id = login_id - 30000
                else:
                    login_old_id = login_id

                return success({"userid": userid, "is_prepayment": is_prepayment, "login_id": login_id, "login_old_id": login_old_id})

        is_prepayment = self._get_div_type(u_op.udata["id"])
        store_userid = u_op.udata["id"]
        if store_userid > 50000 and store_userid < 60000:
            login_old_id = store_userid - 50000
        else:
            login_old_id = store_userid
        return success({"userid": store_userid, "is_prepayment": is_prepayment, "login_id": store_userid, "login_old_id": login_old_id})

    def POST(self, *args):
        self.set_headers({'Content-Type': 'application/json; charset=UTF-8'})
        ret = self._post_handler(args)
        log.debug("ret: %s", ret)
        return ret


class SmsHandler(core.Handler):
    _post_handler_fields = [
        Field('mobile', T_REG, False, match=r'^(1\d{10})$'),
    ]

    _get_handler_fields = [
        Field('mobile', T_REG, False, match=r'^(1\d{10})$'),
        Field('vcode', T_REG, False, match=r'^([0-9]{4})$'),
    ]

    def _get_handler_errfunc(self, msg):
        return error(UAURET.PARAMERR, respmsg=msg)

    def _post_handler_errfunc(self, msg):
        return error(UAURET.PARAMERR, respmsg=msg)

    @with_validator_self
    def _post_handler(self, *args):
        params = self.validator.data
        mobile = params['mobile']

        uop = UUser()
        uop.load_user_by_mobile(mobile)
        if len(uop.udata) == 0:
            return error(UAURET.NODATA)

        store_role = [define.UYU_USER_ROLE_STORE, define.UYU_USER_ROLE_HOSPITAL, define.UYU_USER_ROLE_EYESIGHT]
        user_type = uop.udata.get('user_type')
        if user_type not in store_role:
            log.debug('sms handler mobile=%s user_type=%s not in %s', mobile, user_type, store_role)
            return error(UAURET.ROLEERR)

        vop = VCode()
        vcode = vop.gen_vcode(mobile)
        log.debug("get vcode: %s", vcode)
        if not vcode:
            return error(UAURET.VCODEERR)
        sms_op = UYUSendSMS()
        ret = sms_op.send_sms(mobile, [vcode, 1], define.RONG_YUN_SMS_UYU_TEMPID_VERIFY_CODE)
        if not ret:
            log.debug('send_sms mobile=%s, vcode=%s except', mobile, vcode)
        else:
            status_code = ret.get('statusCode')
            if status_code == '000000':
                log.debug('send_sms mobile=%s, vcode=%s ok', mobile, vcode)
            else:
                log.debug('send_sms mobile=%s, vcode=%s fail', mobile, vcode)
        return success({})

    def POST(self, *args):
        self.set_headers({'Content-Type': 'application/json; charset=UTF-8'})
        ret = self._post_handler(args)
        self.write(ret)

    def GET(self, *args):
        pass


class ChangePassHandler(core.Handler):
    _post_handler_fields = [
        Field('mobile', T_REG, False, match=r'^(1\d{10})$'),
        Field('vcode', T_REG, False, match=r'^([0-9]{4})$'),
        Field('password', T_STR, False),
    ]

    def _post_handler_errfunc(self, msg):
        return error(UAURET.PARAMERR, respmsg=msg)

    @with_validator_self
    def _post_handler(self, *args):
        params = self.validator.data
        mobile = params['mobile']
        vcode = params['vcode']
        password = params["password"]

        u_op = UUser()
        u_op.load_user_by_mobile(mobile)
        if len(u_op.udata) == 0:
            log.debug('change password handler mobile=%s not exists', mobile)
            return error(UAURET.USERERR)

        store_role = [define.UYU_USER_ROLE_STORE, define.UYU_USER_ROLE_HOSPITAL, define.UYU_USER_ROLE_EYESIGHT]
        user_type = u_op.udata.get('user_type')
        if user_type not in store_role:
            log.debug('change password handler mobile=%s user_type=%s not in %s', mobile, user_type, store_role)
            return error(UAURET.ROLEERR)

        respcd = u_op.change_password(mobile, vcode, password)
        if respcd != UAURET.OK:
            return error(respcd)
        return success({})

    def POST(self, *args):
        self.set_headers({'Content-Type': 'application/json; charset=UTF-8'})
        ret = self._post_handler(self, args)
        self.write(ret)
