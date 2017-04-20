/**
 * Created by mac on 17/3/15.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule", "yanzheng", "native"],function($, ajax_rule, yanzheng, native){
        $(document).ready(function() {

            var userCanDist;

            $('.js_search').on('click', function() {
                var refer_tel = $('.js_search_phone').val();
                if (!yanzheng.strIsNullUndefine(refer_tel)){
                    native.getUserIdFromObjC({}, function (cb) {
                        var userid = cb['userid'];
                        native.getDeviceInfo({"getDevInfo":"获取设备信息"}, function (cb) {
                            var req = {
                                os:cb['os'],
                                sys_version:cb['sys_version'],
                                app_version:cb['app_version'],
                                se_userid:userid,
                                mobile:refer_tel
                            };
                            ajax_rule.ajax_rule('/store/v1/api/load_consumer', 'POST', 'json', req, '.zheceng', function (respData) {
                                $(".consumer_name").val(respData["username"]);
                                var resMobile = respData["mobile"];
                                if (resMobile!== null && resMobile !== undefined){
                                    $(".consumer_phone").val(resMobile);
                                }
                                userCanDist = respData["username"];
                            });
                        });
                    });
                }else {
                    native.uyuAlert({msg:"消费者账号或手机号不合法!"}, function (cb) {
                    });
                }

            });

            function fetch_left_Times() {
                native.getUserIdFromObjC({}, function (cb) {
                    var userid = cb['userid'];
                    native.getDeviceInfo({"getDevInfo":"获取设备信息"}, function (cb) {
                        var getInfoData = {
                            se_userid: userid,
                            userid: userid,
                            os:cb['os'],
                            sys_version:cb['sys_version'],
                            app_version:cb['app_version']
                        };
                        ajax_rule.ajax_rule('/store/v1/api/store_info', 'GET', 'json', getInfoData, '.zheceng', function (respData) {
                            $("#store_left_times").text(respData["remain_times"]);
                        });
                    });

                });
            }

            fetch_left_Times();

            $(".js_distribute_times").on("click", function () {
                var accountOrMobile = $('.js_search_phone').val();
                var buy_times = $('.consumer_buy_times').val();

                var val_exp = /^[0-9]*$/;
                if (!val_exp.test(buy_times)) {
                    native.uyuAlert({msg:"你输入的次数不合法"}, function (cb) {
                    });
                    return;
                }

                if (!yanzheng.strIsNullUndefine(accountOrMobile)){
                    native.getUserIdFromObjC({}, function (cb) {
                        var userid = cb['userid'];

                        native.getDeviceInfo({"getDevInfo":"获取设备信息"}, function (cb) {
                            var distReqData = {busicd: "STORE_ALLOT_TO_COMSUMER",
                                se_userid: userid,
                                consumer_mobile: accountOrMobile,
                                training_times: buy_times,
                                os:cb['os'],
                                sys_version:cb['sys_version'],
                                app_version:cb['app_version']
                            };
                            ajax_rule.ajax_rule('/store/v1/api/store_to_consumer', 'POST', 'json', distReqData, '.zheceng', function (respData) {
                                //分配成功的逻辑
                                //先通知上一级页面更新
                                var postNoti = {
                                    notiName:"updateMineWebView",
                                    notiRespFuncName:"notiUpdateCurentView"
                                };
                                native.postNotifiaction(postNoti, function (cb) {
                                    console.log(cb.ret);
                                });
                                //更新本页面的次数
                                fetch_left_Times();
                                //本页面弹窗提示
                                native.uyuAlert({msg:"为消费者分配训练次数成功!"}, function (cb) {
                                });
                            });
                        });

                    });

                }else {
                    native.uyuAlert({msg:"消费者账号或手机号不合法!"}, function (cb) {
                    });
                }
            });
        });
    });
});