#coding: utf-8

from handler import store
from handler import login

urls = (
    ('^/store/v1/page/index$', store.StoreH5Main),
    ('^/store/v1/page/eye_sight$', store.StoreH5EyeSight),
    ('^/store/v1/page/train$', store.StoreH5Train),
    ('^/store/v1/page/dev$', store.StoreH5Dev),
    ('^/store/v1/page/bill$', store.StoreH5Bill),
    ('^/store/v1/page/dis_record$', store.StoreH5DisRecord),
    ('^/store/v1/page/dis_comsumer_info$', store.StoreH5DisComsumerInfo),
    
    #api
    ('^/store/v1/api/login$', login.LoginHandler),
)
