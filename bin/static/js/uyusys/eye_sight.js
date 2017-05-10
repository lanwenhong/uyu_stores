/**
 * Created by mac on 17/3/15.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule", "vue", "native", "yanzheng"],function($, ajax_rule, vue, native, yanzheng){
        $(document).ready(function() {

            var page = 1;
            var vukk = new vue({
                el: '#wap',
                data: {
                    eye_sights: new Array(),
                },
                created: function () {
                    this.frist_list_page();//获取店铺数据
                },
                updated: function() {
                    native.getUserIdFromObjC({}, function (cb) {
                        var userid = cb['userid'];
                        var login_id = cb['login_id'];
                        if (userid === login_id){
                            $('.eye_sight_delete').show();
                        }else {
                            $('.eye_sight_delete').hide();
                        }
                    });
                },
                methods: {
                    frist_list_page: function () {
                        var _this = this;
                        native.getUserIdFromObjC({}, function (cb) {
                            var userid = cb['userid'];
                            var login_id = cb['login_id'];

                            native.getDeviceInfo({"getDevInfo":"获取设备信息"}, function (cb) {
                                var listReq = {
                                    se_userid: userid,
                                    maxnum: "10",
                                    page:''+page,
                                    os:cb['os'],
                                    sys_version:cb['sys_version'],
                                    app_version:cb['app_version']
                                };
                                native.uyuLog({'logMsg':JSON.stringify(listReq)},function (cb) {
                                    console.log(cb.ret);
                                });
                                ajax_rule.ajax_rule('/store/v1/api/eyesight_list', 'GET', 'json', listReq, '.zheceng', function (respData) {
                                    var eyesightArr = respData['info'];
                                    if (eyesightArr.length > 0){
                                        page = page + 1;
                                        $('.section_nothing').hide();
                                    }else if (eyesightArr.length == 0){
                                        $('.section_nothing').show();
                                    }
                                    for (var i = 0; i < eyesightArr.length; i++){
                                        _this.eye_sights.push(eyesightArr[i]);
                                    }
                                });
                            });

                        });

                    },
                    next_list_page:function () {
                        var _this = this;
                        native.getUserIdFromObjC({}, function (cb) {
                            var userid = cb['userid'];
                            var login_id = cb['login_id'];

                            native.getDeviceInfo({"getDevInfo":"获取设备信息"}, function (cb) {
                                var listReq = {
                                    se_userid: userid,
                                    maxnum: "10",
                                    page:''+page,
                                    os:cb['os'],
                                    sys_version:cb['sys_version'],
                                    app_version:cb['app_version']
                                };
                                native.uyuLog({'logMsg':JSON.stringify(listReq)},function (cb) {
                                    console.log(cb.ret);
                                });
                                ajax_rule.ajax_rule('/store/v1/api/eyesight_list', 'GET', 'json', listReq, '.zheceng', function (respData) {
                                    var eyesightArr = respData['info'];
                                    if (eyesightArr.length > 0){
                                        page = page + 1;
                                        $('.section_nothing').hide();
                                    }else if (eyesightArr.length == 0){
                                        $('.section_nothing').show();
                                    }
                                    for (var i = 0; i < eyesightArr.length; i++){
                                        _this.eye_sights.push(eyesightArr[i]);
                                    }
                                });
                            });

                        });

                    },
                    unbindEyeSight:function (event) {

                        var target = event.target;
                        var index = parseInt(target.getAttribute("data-index"));
                        var eyeSight = _this.eye_sights[index];

                        ajax_rule.ajax_rule('/store/v1/api/eyesight_unbind', 'POST', 'json', eyeSight, '.zheceng', function (respData) {
                            alert("解绑成功");
                        });
                    }
                    
                }
            });

            native.regNativeCallJS("addEyeSight", function (cb) {
                //去添加试光师的页面
                native.regNativeCallJS("notiUpdateEyesightView", function () {
                    page = 1;
                    var len = vukk.eye_sights.length;
                    vukk.eye_sights.splice(0, len);
                    vukk.next_list_page();
                });

                var regNoti = {
                    notiName:"updateEyesightWebView",
                    notiRespFuncName:"notiUpdateEyesightView"
                };
                native.regNotifiaction(regNoti, function () {
                    var openUrl = location.protocol + '//' + location.host + '/store/v1/page/eye_sight_info.html';

                    if (window.WebViewJavascriptBridge !== "undefined") {
                        var openUrlData ={
                            url:openUrl,
                            pullDown:"0",
                            pullUp:"0"
                        };
                        native.openUrl(openUrlData, function (cb) {
                            console.log("call back");
                        });
                    } else {
                        alert("location.href");
                        location.href = openUrl;
                    }
                });
            });
            var rightConfig = {
                type:"jsfunc",
                title:"添加",
                funcName:"addEyeSight"
            };
            native.addRightBtn(rightConfig, function (cb) {
                console.log(cb.ret);
            });

            //注册下拉刷新方法
            native.updateCurrentView(function () {
                page = 1;
                var len = vukk.eye_sights.length;
                vukk.eye_sights.splice(0, len);
                vukk.next_list_page();
            });
            //注册上拉加载的方法
            native.pullUpRefresh(function (resp) {
                vukk.next_list_page();
            });
        });
    });
});