/**
 * Created by mac on 17/3/15.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule","vue", "native"],function($, ajax_rule, vue, native){
        $(document).ready(function() {

            var page = 1;
            var vukk = new vue({
                el: '#wap',
                data: {
                    devices: new Array(),
                },
                created: function () {
                    var _this = this;
                    _this.frist_list_page();//获取店铺数据
                },
                methods: {
                    frist_list_page: function () {
                        var _this = this;
                        native.getUserIdFromObjC({}, function (cb) {
                            var userid = cb['userid'];
                            var listReq = {
                                se_userid: userid,
                                maxnum: "10",
                                page:''+page
                            };

                            native.uyuLog({'logMsg':JSON.stringify(listReq)},function (res) {
                                console.log(cb.ret);
                            });

                            ajax_rule.ajax_rule('/store/v1/api/device_list', 'GET', 'json', listReq, '.zheceng', function (respData) {
                                var devArr = respData['info'];
                                if (devArr.length > 0){
                                    page = page + 1;
                                    $('.section_nothing').hide();
                                }else if (devArr.length == 0){
                                    $('.section_nothing').show();
                                }
                                for (var i = 0; i < devArr.length; i++){
                                    _this.devices.push(devArr[i]);
                                }
                            });
                        });

                    },
                    next_list_page:function () {
                        var _this = this;
                        native.getUserIdFromObjC({}, function (cb) {
                            var userid = cb['userid'];
                            var listReq = {
                                se_userid: userid,
                                maxnum: "10",
                                page:''+page
                            };

                            native.uyuLog({'logMsg':JSON.stringify(listReq)},function (res) {
                                console.log(cb.ret);
                            });
                            ajax_rule.ajax_rule('/store/v1/api/device_list', 'GET', 'json', listReq, '.zheceng', function (respData) {
                                var devArr = respData['info'];
                                if (devArr.length > 0){
                                    page = page + 1;
                                }else if (devArr.length == 0){

                                }
                                for (var i = 0; i < devArr.length; i++){
                                    _this.devices.push(devArr[i]);
                                }
                            });
                        });
                    }
                }
            });

            native.updateCurrentView(function () {
                page = 1;
                var len = vukk.devices.length;
                vukk.devices.splice(0, len);
                vukk.next_list_page();
            });

            native.pullUpRefresh(function (resp) {
                vukk.next_list_page();
            });
        });
    });
});