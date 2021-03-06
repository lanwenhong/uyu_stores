#!/home/qfpay/python/bin/python
# -*- coding: utf-8 -*-
import os
import sys
import urls
import dbenc
import logging
HOME = os.path.dirname(os.path.abspath(__file__))

from zbase.base import logger
from zbase.base import dbpool
from zbase.base import loader

from zbase.web import core
from zbase.web import cache
from zbase.web import runner
from zbase.web import template

loader.loadconf_argv(HOME)
import config

if config.LOGFILE:
    log = logger.install(config.LOGFILE)
else:
    log = logger.install('stdout')

template.install(config.template)

config.URLS = urls.urls

def _trans_token_db_conf(db_settings):
    import copy
    db_settings = copy.deepcopy(db_settings)

    ret = {}
    dbconf = dbenc.DBConf()

    for db_name, db_cfg in db_settings.items():
        token = db_cfg.pop('token')
        new_cfg = dbconf.get_dbpool(token, **db_cfg)

        ret[db_name] = new_cfg

    return ret


def install_db():
    databases = _trans_token_db_conf(config.database)
    log.info(databases)
    dbpool.install(databases)

app = core.WebApplication(config)


if __name__ == '__main__':
    install_db()
    runner.run_simple(app, host=config.HOST, port=config.PORT)
