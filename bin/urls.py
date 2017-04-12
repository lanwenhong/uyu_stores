#coding: utf-8

from handler import store
from handler import login
from handler import eyesight
from handler import device
from handler import storeinfo, train, consumer
from handler import test
from handler import settle

urls = (
    ('^/store/v1/page/index.html$', store.StoreH5Main),
    ('^/store/v1/page/eye_sight.html$', store.StoreH5EyeSight),
    ('^/store/v1/page/train.html$', store.StoreH5Train),
    ('^/store/v1/page/dev.html$', store.StoreH5Dev),
    ('^/store/v1/page/bill.html$', store.StoreH5Bill),
    ('^/store/v1/page/dis_record.html$', store.StoreH5DisRecord),
    ('^/store/v1/page/dis_consumer_info.html$', store.StoreH5DisComsumerInfo),
    ('^/store/v1/page/eye_sight_info.html$', store.StoreH5EyeSightInfo),
    ('^/store/v1/page/login.html$', test.TestHandler),
    #api
    ('^/store/v1/api/login$', login.LoginHandler),
    ('^/store/v1/api/sms_send$', login.SmsHandler),
    ('^/store/v1/api/passwd_change$', login.ChangePassHandler),
    ('^/store/v1/api/store_info$', storeinfo.StoreInfoHandler),
    ('^/store/v1/api/store_to_consumer$', train.StoreToComsumer),
    ('^/store/v1/api/load_consumer$', consumer.LoadConsumerHandler),
    ('^/store/v1/api/eyesight_list$', eyesight.EyesightInfoHandler),
    ('^/store/v1/api/eyesight$', eyesight.EyeSightHandler),
    ('^/store/v1/api/device_list$', device.DeviceInfoHandler),
    ('^/store/v1/api/store_allocate_list$', store.StoreAllocateHandler),
    ('^/store/v1/api/settle_list$', settle.SettleInfoHandler),

    #test
    ('^/store/v1/page/test.html$', test.TestHandler),
)
