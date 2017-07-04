# -*- coding: utf-8 -*-
import re
import logging
import datetime
import traceback
import config
from uyubase.uyu import define
from zbase.base.dbpool import get_connection_exception
log = logging.getLogger()


def gen_ret_range(page, maxnum):
    start = maxnum * page - maxnum
    end = start + maxnum
    return start, end


def gen_offset(page, maxnum):
    limit = maxnum
    offset = (page -1) * maxnum
    return offset, limit


def check_mobile(mobile):
    pattern = re.compile(r'^([0-9]{11})$')
    is_mobile = pattern.match(mobile)
    return is_mobile


def bind_default_store(userid):
    f_name = 'bind_default_store'
    STORE_ID = config.TEST_STORE_ID
    log.debug('func=%s|userid=%s|STORE_ID=%s', f_name, userid, STORE_ID)
    if STORE_ID in ['', None]:
        return 
    with get_connection_exception('uyu_core') as conn:
        now = datetime.datetime.now()
        where = {'id': STORE_ID}
        ret = conn.select_one(table='stores', fields='*', where=where)
        log.debug('func=%s|where=%s|ret=%s', f_name, where, ret)
        channel_id = ret.get('channel_id')
        values = {
            'eyesight_id': userid,
            'store_id': config.TEST_STORE_ID,
            'channel_id': channel_id,
            'is_valid': define.UYU_STORE_EYESIGHT_BIND,
            'ctime': now,
            'utime': now
        }
        ret = conn.insert(table='store_eyesight_bind', values=values)
        log.debug('func=%s|insert|ret=%s', f_name, ret)
