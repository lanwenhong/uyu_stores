# -*- coding: utf-8 -*-
import uuid
import traceback
from zbase.web import core
from zbase.web import template
from zbase.web.validator import with_validator_self, Field, T_REG, T_INT, T_STR, T_FLOAT
from zbase.base.dbpool import with_database
from uyubase.base.response import success, error, UAURET
from uyubase.base.usession import uyu_check_session, uyu_check_session_for_page, KickSession
from uyubase.base.uyu_user import UUser
from uyubase.base.uyu_user import gen_old_password
from uyubase.uyu.define import UYU_SYS_ROLE_STORE
from uyubase.uyu import define

from runtime import g_rt
from config import cookie_conf
from config import TEST_STORE_ID
from config import TEST_CHNL_ID
from config import TEST_SWITCH
from config import TEST_CHNL_MODE
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


            session_value = self.session.get_session()
            log.debug('session value: %s', session_value)
            print 'self.session get session store userid'
            store_userid = session_value.get('userid')
            log.debug('session store userid=%s', store_userid)


            uop = UUser()
            # uop.call('load_info_by_userid', self.user.userid)
            uop.call('load_info_by_userid', store_userid)
            self.store_id = uop.sdata['store_id']

            # start, end = tools.gen_ret_range(curr_page, max_page_num)
            offset, limit = tools.gen_offset(curr_page, max_page_num)
            info_data = self._query_handler(offset, limit)

            data['info'] = self._trans_record(info_data)
            return success(data)
        except Exception as e:
            log.warn(e)
            log.warn(traceback.format_exc())
            return error(UAURET.DATAERR)


    @with_database('uyu_core')
    def _query_handler(self, offset, limit):

        where = {'store_id': self.store_id, 'is_valid': define.UYU_STORE_EYESIGHT_BIND}
        other = ' order by ctime desc limit %d offset %d' % (limit, offset)
        keep_fields = [
            'store_eyesight_bind.id', 'store_eyesight_bind.eyesight_id',
            'store_eyesight_bind.ctime', 'auth_user.username', 'auth_user.phone_num'
        ]
        ret = self.db.select_join(
            table1='store_eyesight_bind',
            table2='auth_user',
            on={'store_eyesight_bind.eyesight_id': 'auth_user.id'},
            fields=keep_fields, where=where, other=other)
        return ret

    @with_database('uyu_core')
    def _trans_record(self, data):
        if not data:
            return []

        for item in data:
            item['ctime'] = datetime.datetime.strftime(item['ctime'], '%Y-%m-%d %H:%M:%S') if item['ctime'] else ''

        return data

    def GET(self):
           try:
               self.set_headers({'Content-Type': 'application/json; charset=UTF-8'})
               data = self._get_handler()
               log.debug('return data:%s', data)
               return data
           except Exception as e:
               log.warn(e)
               log.warn(traceback.format_exc())
               return error(UAURET.SERVERERR)


class EyeSightHandler(core.Handler):

    _get_handler_fields = [
        # Field('phone_num', T_REG, False, match=r'^(1\d{10})$'),
        Field("phone_num", T_STR, False),
    ]

    _post_handler_fields = [
        Field('userid', T_INT, False, match=r'^([0-9]{0,10})$'),
    ]

    def _get_handler_errfunc(self, msg):
        return error(UAURET.PARAMERR, respmsg=msg)

    def _post_handler_errfunc(self, msg):
        return error(UAURET.PARAMERR, respmsg=msg)

    @uyu_check_session(g_rt.redis_pool, cookie_conf, UYU_SYS_ROLE_STORE)
    @with_validator_self
    def _get_handler(self):
        if not self.user.sauth:
            return error(UAURET.SESSIONERR)
        params = self.validator.data
        phone_num = params['phone_num']
        log.debug('mobile=%s and type=%s', phone_num, type(phone_num))
        if not isinstance(phone_num, basestring):
            log.debug('invalid mobile after validator trans')
            return error(UAURET.DATAERR)
        uop = UUser()
        is_mobile = tools.check_mobile(phone_num)
        if is_mobile:
            uop.load_user_by_mobile(phone_num)
        else:
            uop.load_user_by_login_name(phone_num)
        log.debug('udata: %s', uop.udata)
        # if len(uop.udata) == 0 or uop.udata.get("user_type", -1) != define.UYU_USER_ROLE_EYESIGHT:
        if len(uop.udata) == 0 or uop.udata.get("user_type", -1) not in [define.UYU_USER_ROLE_EYESIGHT, define.UYU_USER_ROLE_COMSUMER]:
            return error(UAURET.USERROLEERR)

        ret = {}
        ret["id"] = uop.udata["id"]
        ret["mobile"] = uop.udata["phone_num"]
        ret["nick_name"] = uop.udata["nick_name"]
        ret["username"] = uop.udata.get("username", '')

        return success(ret)

    def GET(self, *args):
        self.set_headers({'Content-Type': 'application/json; charset=UTF-8'})
        return self._get_handler()

    @uyu_check_session(g_rt.redis_pool, cookie_conf, UYU_SYS_ROLE_STORE)
    @with_validator_self
    def _post_handler(self):
        if not self.user.sauth:
            return error(UAURET.SESSIONERR)
        try:
            params = self.validator.data
            self.user.load_user()
            self.user.load_profile()
            self.user.load_store()
            params["store_id"] = self.user.sdata["id"]
            params["channel_id"] = self.user.sdata["channel_id"]
            uop = UUser()
            flag, err_code = uop.store_bind_eyesight(params["userid"], params["store_id"], params["channel_id"])
            if flag:
                return success({})
            else:
                return error(err_code)
        except Exception as e:
            log.warn(e)
            log.warn(traceback.format_exc())
            return error(UAURET.DATAEXIST)

    def POST(self, *arg):
        self.set_headers({'Content-Type': 'application/json; charset=UTF-8'})
        return self._post_handler()


class EyeSightRegisterHandler(core.Handler):

    _post_handler_fields = [
        Field('mobile', T_REG, False, match=r'^(1\d{10})$'),
        Field('nick_name', T_STR, False),
        Field('username', T_STR, False),
        Field('email', T_STR, True, match=r'^[a-zA-Z0-9_\-\'\.]+@[a-zA-Z0-9_]+(\.[a-z]+){1,2}$'),
        Field('new_password', T_STR, False),
        Field('old_password', T_STR, False),
    ]

    def _post_handler_errfunc(self, msg):
        return error(UAURET.PARAMERR, respmsg=msg)


    @with_validator_self
    def _post_handler(self):
        try:
            params = self.validator.data
            mobile = params['mobile']
            nick_name = params.get('nick_name')
            email = params.get('email')
            params['user_type'] = define.UYU_USER_ROLE_EYESIGHT
            # params['password'] = mobile[-6:]
            params['sex'] = 0
            new_password = params.pop('new_password')
            old_password = params.pop('old_password')
            if new_password != old_password:
                log.warn('new_password=%s|old_password=%s|not equal', new_password, old_password)
                return error(UAURET.DATAERR)
            params['password'] = new_password
            uop = UUser()
            if not TEST_SWITCH:
                log.debug('EyeSightRegisterHandler eyesight mode')
                flag, userid = uop.internal_user_register(params)
                if flag:
                    data = {}
                    now = datetime.datetime.now()
                    data['id'] = userid
                    data['login_name'] = mobile
                    # data['password'] = gen_old_password(mobile[-6:])
                    data['password'] = gen_old_password(new_password)
                    data['phone_num'] = mobile
                    data['nick_name'] = nick_name
                    data['optometrist_type'] = 2
                    data['created_at'] = now
                    data['updated_at'] = now
                    data['sex'] = 0
                    data['recommend_code'] = str(uuid.uuid4())
                    data['portrait_data'] = ''
                    data['portrait_type'] = ''
                    data['email'] = email
                    uop.call('record_optometrists', data)
                    if TEST_STORE_ID not in ['', None]:
                        tools.bind_default_store(userid)
                    return success({'userid': userid})
                else:
                    return error(UAURET.DATAEXIST)
            else:
                pdata = {}
                udata = {
                   'login_name': mobile,
                   'nick_name': params.get('nick_name'),
                   'phone_num': mobile,
                   'password': params['password'],
                   'email': params.get('email'),
                   'username': params.get('username')       
                }
                sdata = {
                    'store_type':  define.UYU_STORE_ROLE_STORE,
                    'store_name': udata['username'],
                    'store_mobile': mobile,
                    'channel_id': TEST_CHNL_ID,
                    'is_prepayment': TEST_CHNL_MODE
                }
                log.debug('EyeSightRegisterHandler store mode')
		ret = uop.call("create_store_transaction", udata, pdata, sdata)
		if ret == define.UYU_OP_ERR:
		    return error(UAURET.REGISTERERR)
                else:
                    return success({'userid': uop.userid})
        except Exception as e:
            log.warn(e)
            log.warn(traceback.format_exc())
            return error(UAURET.DATAEXIST)


    def POST(self, *arg):
        self.set_headers({'Content-Type': 'application/json; charset=UTF-8'})
        return self._post_handler()


class EyesightUnbindHandler(core.Handler):

    _post_handler_fields = [
        Field('eyesight_id', T_INT, False, match=r'^([0-9]{0,10})$'),
    ]

    def _post_handler_errfunc(self, msg):
        return error(UAURET.PARAMERR, respmsg=msg)


    @uyu_check_session(g_rt.redis_pool, cookie_conf, UYU_SYS_ROLE_STORE)
    @with_validator_self
    def _post_handler(self):
        if not self.user.sauth:
            return error(UAURET.SESSIONERR)
        try:
            params = self.validator.data
            eyesight_id = params['eyesight_id']
            session_value = self.session.get_session()
            login_id = session_value.get('login_id')
            store_userid = session_value.get('userid')

            if login_id != store_userid:
                log.debug('login_id=%d, store_userid=%d not equal invalid store or hospital user', login_id, store_userid)
                return error(UAURET.ROLEERR)


            uop = UUser()
            uop.call('load_info_by_userid', store_userid)
            store_id = uop.sdata["store_id"]

            ret = uop.unbind_eyesight(eyesight_id, store_id)
            if ret > 0:
                k = KickSession(g_rt.redis_pool, eyesight_id)
                k.kick()
                return success({})
            else:
                return error(UAURET.UNBINDEYEERR)

        except Exception as e:
            log.warn(e)
            log.warn(traceback.format_exc())
            return error(UAURET.DATAEXIST)

    def POST(self, *arg):
        self.set_headers({'Content-Type': 'application/json; charset=UTF-8'})
        return self._post_handler()
