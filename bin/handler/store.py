#coding: utf-8

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


class StoreH5Main(core.Handler):
    def GET(self):
        self.write(template.render('index.html'))


class StoreH5EyeSight(core.Handler):
    def GET(self):
        self.write(template.render('eye_sight.html'))


class StoreH5Train(core.Handler):
    def GET(self):
        self.write(template.render("train.html"))



class StoreH5Dev(core.Handler):
    def GET(self):
        self.write(template.render("dev.html"))



class StoreH5Bill(core.Handler):
    def GET(self):
        self.write(template.render("bill.html"))


class StoreH5DisRecord(core.Handler):
    def GET(self):
        self.write(template.render("dis_record.html"))


class StoreH5DisComsumerInfo(core.Handler):
    def GET(self):
        self.write(template.render("dis_consumer_info.html"))


class StoreH5EyeSightInfo(core.Handler):
    def GET(self):
        self.write(template.render("eye_sight_info.html"))


class StoreEyesightRegister(core.Handler):
    def GET(self):
        self.write(template.render("register.html"))


class StoreForgetPassword(core.Handler):
    def GET(self):
        self.write(template.render("forget_pwd.html"))



class StoreAllocateHandler(core.Handler):

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

        where = {'store_id': self.store_id, 'busicd': define.BUSICD_CHAN_ALLOT_TO_COSUMER}
        other = ' order by create_time desc'
        keep_fields = [
            'orderno', 'consumer_id', 'training_times',
            'training_amt', 'status', 'buyer', 'create_time'
        ]
        ret = self.db.select(table='training_operator_record', fields=keep_fields, where=where, other=other)
        return ret

    @with_database('uyu_core')
    def _trans_record(self, data):
        if not data:
            return []

        for item in data:
            item['create_time'] = datetime.datetime.strftime(item['create_time'], '%Y-%m-%d %H:%M:%S') if item['create_time'] else ''

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


class StoreConumerInfoHandler(core.Handler):

    _get_handler_fields = [
        Field('store_userid', T_INT, False)
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
            store_userid = params['store_userid']
            ret = self._get_store_id(store_userid)
            if not ret:
                return error(UAURET.DATAERR)
            store_id = ret['id']
            info_data = self._query_handler(store_id)
            data['info'] = self._trans_record(info_data)
            return success(data)
        except Exception as e:
            log.warn(e)
            log.warn(traceback.format_exc())
            return error(UAURET.DATAERR)


    @with_database('uyu_core')
    def _get_store_id(self, store_userid):
        ret = self.db.select_one(table='stores', fields='*', where={'userid': store_userid})
        return ret


    @with_database('uyu_core')
    def _query_handler(self, store_id):
        where = {'store_id': store_id}
        keep_fields = ['userid', 'remain_times', 'create_time']
        other = ' order by create_time desc '
        ret = self.db.select(table='consumer', fields=keep_fields, where=where, other=other)
        return ret


    @with_database('uyu_core')
    def _trans_record(self, data):
        keep_fields = ['login_name', 'phone_num', 'nick_name', 'username', 'state', 'email']

        if not data:
            return []

        for item in data:
            consumer_id = item['userid']
            item['create_time'] = datetime.datetime.strftime(item['create_time'], '%Y-%m-%d %H:%M:%S')
            ret = self.db.select_one(table='auth_user', fields=keep_fields, where={'id': consumer_id})
            for key in keep_fields:
                v = ret.get(key)
                if key not in ['state']:
                    item[key] = v if v else ''
                else:
                    item[key] = define.UYU_USER_STATE_MAP.get(v)


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
