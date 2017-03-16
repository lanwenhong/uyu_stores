#coding: utf-8

from zbase.base import logger
from zbase.base.http_client import RequestsClient
from zbase.server.client import HttpClient

import json

log = logger.install('stdout')


def test_login():
    SERVER   = [{'addr':('127.0.0.1', 8082), 'timeout':20},]
    client = HttpClient(SERVER, client_class = RequestsClient)
    send = {"mobile": "13600000013", "password": "000013"}
    ret = client.post('/store/v1/api/login', send)
    log.info(ret)
    print client.client.headers

def test_store_info():
    SERVER   = [{'addr':('127.0.0.1', 8082), 'timeout':20},]
    client = HttpClient(SERVER, client_class = RequestsClient)
    send = {"se_userid": 1178, "userid": 1178}
    headers = {'cookie': 'sessionid=8ccf8089-6da7-4be8-97b7-f59db6211b0d'}

    ret = client.get('/store/v1/api/store_info', send, headers=headers)
    log.info(ret)

def test_store_to_comsumer():
    SERVER   = [{'addr':('127.0.0.1', 8082), 'timeout':20},]
    client = HttpClient(SERVER, client_class = RequestsClient)
    send = {"busicd": "STORE_ALLOT_TO_COMSUMER", "se_userid": 1178, "consumer_mobile": 16756789090, "training_times": 11}
    headers = {'cookie': 'sessionid=58af802a-15c7-4d96-8a2e-7b6b641c53ba'}
    ret = client.post('/store/v1/api/store_to_consumer', send, headers=headers)
    x = json.loads(ret)
    print x["resperr"]

if __name__ == '__main__':
    #test_login()
    #test_store_info()
    test_store_to_comsumer()
