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
                    allRecords: new Array(),
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
                            native.getDeviceInfo({"getDevInfo":"获取设备信息"}, function (cb) {
                                var listReq = {
                                    os:cb['os'],
                                    sys_version:cb['sys_version'],
                                    app_version:cb['app_version'],
                                    se_userid: userid,
                                    maxnum: "10",
                                    page:''+page
                                };

                                native.uyuLog({'logMsg':JSON.stringify(listReq)},function (cb) {
                                    console.log(cb.ret);
                                });

                                ajax_rule.ajax_rule('/store/v1/api/store_allocate_list', 'GET', 'json', listReq, '.zheceng', function (respData) {
                                    var recordArr = respData['info'];
                                    if (recordArr.length > 0){
                                        page = page + 1;
                                        $('.section_nothing').hide();
                                    }else if (recordArr.length == 0){
                                        $('.section_nothing').text("门店还没有分配记录");
                                        $('.section_nothing').show();
                                    }
                                    for (var i = 0; i < recordArr.length; i++){
                                        _this.allRecords.push(recordArr[i]);
                                    }
                                });
                            });
                        });

                    },
                    next_list_page:function () {
                        var _this = this;
                        native.getUserIdFromObjC({}, function (cb) {
                            var userid = cb['userid'];
                            native.getDeviceInfo({"getDevInfo":"获取设备信息"}, function (cb) {
                                var listReq = {
                                    os:cb['os'],
                                    sys_version:cb['sys_version'],
                                    app_version:cb['app_version'],
                                    se_userid: userid,
                                    maxnum: "10",
                                    page:''+page
                                };

                                native.uyuLog({'logMsg':JSON.stringify(listReq)},function (cb) {
                                    console.log(cb.ret);
                                });

                                ajax_rule.ajax_rule('/store/v1/api/store_allocate_list', 'GET', 'json', listReq, '.zheceng', function (respData) {
                                    var recordArr = respData['info'];
                                    if (recordArr.length > 0){
                                        page = page + 1;
                                        $('.section_nothing').hide();
                                    }else if (recordArr.length == 0){
                                        $('.section_nothing').text("门店还没有更多分配记录");
                                        $('.section_nothing').show();
                                    }
                                    for (var i = 0; i < recordArr.length; i++){
                                        _this.allRecords.push(recordArr[i]);
                                    }
                                });
                            });
                        });
                    }
                }
            });

            //注册下拉刷新方法
            native.updateCurrentView(function () {
                page = 1;
                var len = vukk.allRecords.length;
                vukk.allRecords.splice(0, len);
                vukk.frist_list_page();
            });

            native.pullUpRefresh(function (resp) {
                vukk.next_list_page();
            });

        });
    });
});