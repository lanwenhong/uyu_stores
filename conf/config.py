# -*- coding: utf-8 -*-
import os
HOME = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'bin')
rtenv = 'product'

LOGFILE = {
    'root': {
        'filename': {
            'DEBUG': os.path.join(HOME, '../log/store_debug.log'),
            'WARN': os.path.join(HOME, '../log/store_warn.log'),
        }
    }
}


# 数据库配置
database = {
    'uyu_core':{
        'engine': 'pymysql',
        'passwd': '123456',
        'charset': 'utf8',
        'db': 'ychannel',
        'idle_timeout': 60,
        'host': '127.0.0.1',
        'user': 'yyy',
        'port': 3306,
        'conn': 5
    },
    'uyu_old':{
        'engine': 'pymysql',
        'passwd': '123456',
        'charset': 'utf8',
        'db': 'uyu_old',
        'idle_timeout': 60,
        'host': '127.0.0.1',
        'user': 'yyy',
        'port': 3306,
        'conn': 5
    }
}

# web config
# URLS配置
URLS = None
# 静态路径配置
STATICS = {'/static/':'/static/'}
# 模板配置
TEMPLATE = {
    'cache': True,
    'path': '',
    'tmp': os.path.join(HOME, '../tmp'),
}
# 中间件
MIDDLEWARE = ()
# WEB根路径
DOCUMENT_ROOT = HOME
# 页面编码
CHARSET = 'UTF-8'
# APP就是一个子目录
APPS = ()
DATABASE = {}
# 调试模式: True/False
# 生产环境必须为False
DEBUG = True
# 模版路径
template = os.path.join(HOME, 'template')

# 服务地址
HOST = '0.0.0.0'
# 服务端口
PORT = 8089
#redis
redis_url = 'redis://127.0.0.1:4600/0'
#cookie 配置
cookie_conf = { 'expires':60*60*24*3, 'max_age':60*60*24*3, 'domain':'121.40.177.111', 'path':'/'}
#绑定测试门店ID
TEST_STORE_ID = 54
#绑定测试渠道
TEST_CHNL_ID = 108
#测试渠道分成模式
TEST_CHNL_MODE = 0
#开启注册为门店模式True
TEST_SWITCH = False
