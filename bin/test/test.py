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


    @unittest.skip("skipping")
    def test_login(self):
        self.url = '/store/v1/api/login'
        self.send = {
            # "mobile": "13475481254",
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
        headers = {'cookie': 'sessionid=7dcf5197-5413-4690-87f5-dd26315110a7'}
        ret = self.client.get(self.url, self.send, headers=headers)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    @unittest.skip("skipping")
    def test_store_to_comsumer(self):
        self.url = '/store/v1/api/store_to_consumer'
        self.send = {
            "busicd": "STORE_ALLOT_TO_COMSUMER",
            "se_userid": 51561,
            "consumer_mobile": 13100000001,
            "training_times": 1
        }
        headers = {'cookie': 'sessionid=0548f7ab-1fe7-4b8e-bb02-77b8f620b979'}
        ret = self.client.post(self.url, self.send, headers=headers)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    @unittest.skip("skipping")
    def test_load_consumer(self):
        self.url = '/store/v1/api/load_consumer'
        self.send = {"se_userid": 51561, "mobile": "13100000001"}
        headers = {'cookie': 'sessionid=0548f7ab-1fe7-4b8e-bb02-77b8f620b979'}
        ret = self.client.post(self.url, self.send, headers=headers)
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
            'vcode': 4805,
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
        headers = {'cookie': 'sessionid=38126e96-5c05-4c4e-96e8-bd846b455daf'}
        ret = self.client.get(self.url, self.send, headers=headers)
        log.info(ret)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    @unittest.skip("skipping")
    def test_device_list(self):
        self.url = '/store/v1/api/device_list'
        self.send = {'page': 1, 'maxnum': 10, 'se_userid': 51561}
        headers = {'cookie': 'sessionid=38126e96-5c05-4c4e-96e8-bd846b455daf'}
        ret = self.client.get(self.url, self.send, headers=headers)
        log.info(ret)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    @unittest.skip("skipping")
    def test_store_allocate_list(self):
        self.url = '/store/v1/api/store_allocate_list'
        self.send = {'page': 1, 'maxnum': 10, 'se_userid': 51561}
        headers = {'cookie': 'sessionid=38126e96-5c05-4c4e-96e8-bd846b455daf'}
        ret = self.client.get(self.url, self.send, headers=headers)
        log.info(ret)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    @unittest.skip("skipping")
    def test_store_settle_list(self):
        self.url = '/store/v1/api/settle_list'
        self.send = {'page': 1, 'maxnum': 10, 'se_userid': 51561}
        headers = {'cookie': 'sessionid=38126e96-5c05-4c4e-96e8-bd846b455daf'}
        ret = self.client.get(self.url, self.send, headers=headers)
        log.info(ret)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    @unittest.skip("skipping")
    def test_eyesight_info(self):
        self.url = '/store/v1/api/eyesight'
        self.send = {'phone_num': '13475481254', 'se_userid': 51561}
        headers = {'cookie': 'sessionid=38126e96-5c05-4c4e-96e8-bd846b455daf'}
        ret = self.client.get(self.url, self.send, headers=headers)
        log.info(ret)
        respcd = json.loads(ret).get('respcd')
        self.assertEqual(respcd, '0000')


    @unittest.skip("skipping")
    def test_eyesight_bind(self):
        self.url = '/store/v1/api/eyesight'
        self.send = {'userid': '1217', 'se_userid': 51561}
        headers = {'cookie': 'sessionid=38126e96-5c05-4c4e-96e8-bd846b455daf'}
        ret = self.client.post(self.url, self.send, headers=headers)
        log.info(ret)
        respcd = json.loads(ret).get('respcd')


    #@unittest.skip("skipping")
    def test_store_consumer_list(self):
        self.url = '/store/v1/api/store_consumer_list'
        self.send = {'store_userid': '51561', 'se_userid': 51561}
        headers = {'cookie': 'sessionid=38126e96-5c05-4c4e-96e8-bd846b455daf'}
        ret = self.client.get(self.url, self.send, headers=headers)
        log.info(ret)


suite = unittest.TestLoader().loadTestsFromTestCase(TestUyuStores)
unittest.TextTestRunner(verbosity=2).run(suite)
