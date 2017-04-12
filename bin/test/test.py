#coding: utf-8

from zbase.base import logger
from zbase.base.http_client import RequestsClient
from zbase.server.client import HttpClient

import json
import hashlib

log = logger.install('stdout')


def test_login():
    SERVER   = [{'addr':('127.0.0.1', 8382), 'timeout':20},]
    client = HttpClient(SERVER, client_class = RequestsClient)
    send = {"mobile": "17889807865", "password": "807865"}
    ret = client.post('/store/v1/api/login', send)
    log.info(ret)
    print client.client.headers


def test_store_info():
    SERVER   = [{'addr':('127.0.0.1', 8382), 'timeout':20},]
    client = HttpClient(SERVER, client_class = RequestsClient)
    send = {"se_userid": 1203, "userid": 1203}
    headers = {'cookie': 'sessionid=7dcf5197-5413-4690-87f5-dd26315110a7'}

    ret = client.get('/store/v1/api/store_info', send, headers=headers)
    log.info(ret)


def test_store_to_comsumer():
    SERVER   = [{'addr':('127.0.0.1', 8182), 'timeout':20},]
    client = HttpClient(SERVER, client_class = RequestsClient)
    send = {"busicd": "STORE_ALLOT_TO_COMSUMER", "se_userid": 1178, "consumer_mobile": 16756789090, "training_times": 1}
    headers = {'cookie': 'sessionid=58af802a-15c7-4d96-8a2e-7b6b641c53ba'}
    ret = client.post('/store/v1/api/store_to_consumer', send, headers=headers)
    x = json.loads(ret)
    print x["resperr"]


def test_load_consumer():
    SERVER   = [{'addr':('127.0.0.1', 8182), 'timeout':20},]
    client = HttpClient(SERVER, client_class = RequestsClient)
    send = {"se_userid": 1178, "mobile": "16756789090"}
    headers = {'cookie': 'sessionid=58af802a-15c7-4d96-8a2e-7b6b641c53ba'}
    ret = client.post('/store/v1/api/load_consumer', send, headers=headers)
    log.info(ret)


def test_sms_send():
    SERVER   = [{'addr':('127.0.0.1', 8086), 'timeout':2000},]
    client = HttpClient(SERVER, client_class = RequestsClient)
    post_data = {'mobile': '13802438716'}
    ret = client.post('/store/v1/api/sms_send', post_data)
    log.info(ret)


def test_pass_change():
    SERVER   = [{'addr':('127.0.0.1', 8086), 'timeout':2000},]
    client = HttpClient(SERVER, client_class = RequestsClient)
    post_data = {'mobile': '13802438716', 'vcode': 7421, 'password': hashlib.md5('12345678').hexdigest()}
    ret = client.post('/store/v1/api/passwd_change', post_data)


if __name__ == '__main__':
    #test_login()
    # test_store_info()
    #test_store_to_comsumer()
    #test_load_consumer()
    # test_sms_send()
    test_pass_change()
