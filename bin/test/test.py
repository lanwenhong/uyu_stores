#coding: utf-8
import unittest
from zbase.base import logger
from zbase.base.http_client import RequestsClient
from zbase.server.client import HttpClient

import json
import hashlib

log = logger.install('stdout')


class TestUyuStores(unittest.TestCase):

    def setUp(self):
        self.url = ''
        self.send = {}
        self.host = '127.0.0.1'
        self.port = 8086
        self.timeout = 2000
        self.server = [{'addr':(self.host, self.port), 'timeout':self.timeout},]
        self.client = HttpClient(self.server, client_class = RequestsClient)
        self.headers = {'cookie': 'sessionid=a4c37bec-2637-4954-9681-ad869194d9fe'}


    @unittest.skip("skipping")
    def test_login(self):
        self.url = '/store/v1/api/login'
        self.send = {
            "mobile": "13802438733",
            "new_password": hashlib.md5('438733').hexdigest(),
            "old_password": '123456'
        }
        ret = self.client.post(self.url, self.send)
        print '--headers--'
        print self.client.client.headers
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    @unittest.skip("skipping")
    def test_store_info(self):
        self.url = '/store/v1/api/store_info'
        self.send = {"se_userid": 51561, "userid": 51561}
        ret = self.client.get(self.url, self.send, headers=self.headers)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    @unittest.skip("skipping")
    def test_store_to_comsumer(self):
        self.url = '/store/v1/api/store_to_consumer'
        self.send = {
            "busicd": "STORE_ALLOT_TO_COMSUMER",
            "se_userid": 51561,
            "consumer_mobile": 13475481297,
            "training_times": 1
        }
        ret = self.client.post(self.url, self.send, headers=self.headers)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    @unittest.skip("skipping")
    def test_load_consumer(self):
        self.url = '/store/v1/api/load_consumer'
        self.send = {"se_userid": 51561, "mobile": "13802438755"}
        ret = self.client.post(self.url, self.send, headers=self.headers)
        log.info(ret)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    @unittest.skip("skipping")
    def test_load_consumer_detail(self):
        self.url = '/store/v1/api/load_consumer_detail'
        self.send = {"se_userid": 51561, "mobile": "13802438755"}
        ret = self.client.post(self.url, self.send, headers=self.headers)
        log.info(ret)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')

    @unittest.skip("skipping")
    def test_sms_send(self):
        self.url = '/store/v1/api/sms_send'
        self.send = {'mobile': '13802438716'}
        ret = self.client.post(self.url, self.send)
        log.info(ret)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    @unittest.skip("skipping")
    def test_pass_change(self):
        self.url = '/store/v1/api/passwd_change'
        self.send = {
            'mobile': '13802438716',
            'vcode': 8696,
            'password': hashlib.md5('12345678').hexdigest()
        }
        ret = self.client.post(self.url, self.send)
        log.info(ret)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    @unittest.skip("skipping")
    def test_eyesight_list(self):
        self.url = '/store/v1/api/eyesight_list'
        self.send = {'page': 1, 'maxnum': 10, 'se_userid': 51561}
        ret = self.client.get(self.url, self.send, headers=self.headers)
        log.info(ret)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    @unittest.skip("skipping")
    def test_device_list(self):
        self.url = '/store/v1/api/device_list'
        self.send = {'page': 1, 'maxnum': 10, 'se_userid': 51561}
        ret = self.client.get(self.url, self.send, headers=self.headers)
        log.info(ret)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    @unittest.skip("skipping")
    def test_store_allocate_list(self):
        self.url = '/store/v1/api/store_allocate_list'
        self.send = {'page': 1, 'maxnum': 10, 'se_userid': 51561}
        ret = self.client.get(self.url, self.send, headers=self.headers)
        log.info(ret)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    @unittest.skip("skipping")
    def test_store_settle_list(self):
        self.url = '/store/v1/api/settle_list'
        self.send = {'page': 1, 'maxnum': 10, 'se_userid': 51561}
        ret = self.client.get(self.url, self.send, headers=self.headers)
        log.info(ret)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    @unittest.skip("skipping")
    def test_eyesight_info(self):
        self.url = '/store/v1/api/eyesight'
        self.send = {
            # 'phone_num': '13475481270',  #视光师ok
            # 'phone_num': '13802438719',  #消费者ok
            'phone_num': '13000000003',  #门店fail
            'se_userid': 51561
        }
        ret = self.client.get(self.url, self.send, headers=self.headers)
        log.info(ret)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    @unittest.skip("skipping")
    def test_eyesight_bind(self):
        self.url = '/store/v1/api/eyesight'
        self.send = {
            #'userid': '1232', #视光师 ok
            #'userid': '1269', #视光师 ok
            'userid': '1197', #门店 fail
            'se_userid': 51561
        }
        ret = self.client.post(self.url, self.send, headers=self.headers)
        log.info(ret)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    @unittest.skip("skipping")
    def test_store_consumer_list(self):
        self.url = '/store/v1/api/store_consumer_list'
        self.send = {'store_userid': '51561', 'se_userid': 51561}
        ret = self.client.get(self.url, self.send, headers=self.headers)
        log.info(ret)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    #@unittest.skip("skipping")
    def test_eyesight_register(self):
        self.url = '/store/v1/api/eyesight_register'
        self.send = {
            'mobile': '13928478196',
            'nick_name': '小8196',
            'username': '王小8196',
            'email': '13928478196@cc.com'
            }
        ret = self.client.post(self.url, self.send)
        log.info(ret)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')



suite = unittest.TestLoader().loadTestsFromTestCase(TestUyuStores)
unittest.TextTestRunner(verbosity=2).run(suite)
