/**
 * Created by mac on 17/4/1.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule","vue", "yanzheng", "native"],function($, ajax_rule, vue, yanzheng, native){
        $(document).ready(function() {

            $('.js_search_phone').on('input', function() {
                var refer_tel = $('.js_search_phone').val();
                if (refer_tel !== null && refer_tel !== undefined){
                    if(refer_tel.length > 11){
                        $('.js_search_phone').val(refer_tel.substring(0, 11));

                        refer_tel = $('.js_search_phone').val();
                        yanzheng.testPhone('.js_search_phone');
                    }else if(refer_tel.length == 11){
                        //电话号码刚好11位
                        yanzheng.testPhone('.js_search_phone');
                    }else {
                        //取消验证
                    }
                }
            });

            var eyesightInfo;
            $('.js_search').on('click', function() {
                var refer_tel = $('.js_search_phone').val();
                var val_exp = /(^(\d{3,4}-)?\d{7,8})$|^1[0-9]{10}$/;
                if (val_exp.test(refer_tel))
                {
                    alert("start");
                    native.getUserIdFromObjC({}, function (cb) {
                        var userid = cb['userid'];
                        native.getDeviceInfo({"getDevInfo":"获取设备信息"}, function (cb) {
                            var req = {
                                se_userid:userid,
                                phone_num:refer_tel,
                                os:cb['os'],
                                sys_version:cb['sys_version'],
                                app_version:cb['app_version']
                            };
                            ajax_rule.ajax_rule('/store/v1/api/eyesight', 'GET', 'json', req, '.zheceng', function (respData) {
                                eyesightInfo = respData;
                                alert(JSON.stringify(respData));
                                $(".eye_sight_name").val(respData["username"]);
                                $(".eye_sight_nickname").val(respData["nick_name"]);
                                $(".eye_sight_phone").val(respData["mobile"]);
                            });
                        });
                    });
                }else {
                    native.uyuAlert({msg:"手机号不合法!"}, function (cb) {
                    });
                }

            });

            $('.js_bottom_button_action').on('click', function () {
                if (eyesightInfo !== null && eyesightInfo !== undefined){
                    native.getUserIdFromObjC({}, function (cb) {
                        var userid = cb['userid'];
                        native.getDeviceInfo({"getDevInfo":"获取设备信息"}, function (cb) {
                            var req = {
                                se_userid:userid,
                                userid:eyesightInfo['id'],
                                os:cb['os'],
                                sys_version:cb['sys_version'],
                                app_version:cb['app_version']
                            };

                            ajax_rule.ajax_rule('/store/v1/api/eyesight', 'POST', 'json', req, '.zheceng', function (respData) {
                                //先通知上一级页面更新
                                var postNoti = {
                                    notiName:"updateEyesightWebView",
                                    notiRespFuncName:"notiUpdateEyesightView"
                                };
                                native.postNotifiaction(postNoti, function (cb) {
                                    console.log(cb.ret);
                                });
                                //在弹窗提示
                                var msgStr = eyesightInfo['nick_name']+' 试光师成功添加到门店';
                                native.uyuAlert({msg:msgStr}, function (cb) {
                                    console.log(cb.ret);
                                });
                            });
                        });

                    });
                }else {
                    native.uyuAlert({msg:"请先查到你要添加的试光师"}, function (cb) {
                        console.log(cb.ret);
                    })
                }
            });
        });
    });
});