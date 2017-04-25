# -*- coding: utf-8 -*-
import re
import logging
import traceback
log = logging.getLogger()


def gen_ret_range(page, maxnum):
    start = maxnum * page - maxnum
    end = start + maxnum
    return start, end


def check_mobile(mobile):
    pattern = re.compile(r'^([0-9]{11})$')
    is_mobile = pattern.match(mobile)
    return is_mobile
