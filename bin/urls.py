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

    # api
    # 登录接口
    ('^/store/v1/api/login$', login.LoginHandler),
    # 发送验证码接口
    ('^/store/v1/api/sms_send$', login.SmsHandler),
    # 密码修改接口
    ('^/store/v1/api/passwd_change$', login.ChangePassHandler),
    # 门店信息接口
    ('^/store/v1/api/store_info$', storeinfo.StoreInfoHandler),
    # 门店分配点数给消费者
    ('^/store/v1/api/store_to_consumer$', train.StoreToComsumer),
    # 加载消费者数据
    ('^/store/v1/api/load_consumer$', consumer.LoadConsumerHandler),
    # 视光师数据接口
    ('^/store/v1/api/eyesight_list$', eyesight.EyesightInfoHandler),
    # 获取视光师信息
    ('^/store/v1/api/eyesight$', eyesight.EyeSightHandler),
    # 设备数据
    ('^/store/v1/api/device_list$', device.DeviceInfoHandler),
    # 门店分配记录数据
    ('^/store/v1/api/store_allocate_list$', store.StoreAllocateHandler),
    # 结算信息
    ('^/store/v1/api/settle_list$', settle.SettleInfoHandler),
    # 获取门店的消费者
    ('^/store/v1/api/store_consumer_list$', store.StoreConumerInfoHandler),

    #test
    ('^/store/v1/page/test.html$', test.TestHandler),
)
