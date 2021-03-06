#coding: utf-8

from zbase.web import core
from zbase.web import template

class StoreH5Main(core.Handler):
    def GET(self):
        self.write(template.render('index.html'))


class StoreH5EyeSight(core.Handler):
    def GET(self):
        self.write(template.render('eyesight.html'))


class StoreH5Train(core.Handler):
    def GET(self):
        self.write(template.render("train.html"))



class StoreH5Dev(core.Handler):
    def GET(self):
        self.write(template.render("devices.html"))



class StoreH5Bill(core.Handler):
    def GET(self):
        self.write(template.render("bills.html"))


class StoreH5DisRecord(core.Handler):
    def GET(self):
        self.write(template.render("distribute_records.html"))


class StoreH5DisComsumerInfo(core.Handler):
    def GET(self):
        self.write(template.render("distribute_consumer_info.html"))
