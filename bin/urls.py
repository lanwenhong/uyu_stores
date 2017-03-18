#coding: utf-8

from handler import store
from handler import login
from handler import storeinfo, train

urls = (
    ('^/store/v1/page/index.html$', store.StoreH5Main),
    ('^/store/v1/page/eye_sight.html$', store.StoreH5EyeSight),
    ('^/store/v1/page/train.html$', store.StoreH5Train),
    ('^/store/v1/page/dev.html$', store.StoreH5Dev),
    ('^/store/v1/page/bill.html$', store.StoreH5Bill),
    ('^/store/v1/page/dis_record.html$', store.StoreH5DisRecord),
    ('^/store/v1/page/dis_consumer_info.html$', store.StoreH5DisComsumerInfo),
    
    #api
    ('^/store/v1/api/login$', login.LoginHandler),
    ('^/store/v1/api/store_info$', storeinfo.StoreInfoHandler),
    ('^/store/v1/api/store_to_consumer$', train.StoreToComsumer),
)
