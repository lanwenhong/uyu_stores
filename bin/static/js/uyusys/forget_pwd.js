/**
 * Created by mac on 17/4/19.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule", "native", "yanzheng", "md5"],function($, ajax_rule, native, yanzheng, md5){
        $(document).ready(function() {
            $('.js_phone').on('input', function() {
                var refer_tel = $('.js_phone').val();
                if (!yanzheng.strIsNullUndefine(refer_tel)){
                    if (refer_tel.length > 0 && refer_tel.length < 11){
                        var fristStr = refer_tel.substring(0, 1);
                        if (fristStr != '1'){
                            native.uyuAlert({msg:"请输入1开头的手机号"}, function (cb) {
                                console.log(cb.ret)
                            });
                        }
                    }else if(refer_tel.length == 11) {
                        yanzheng.available_phone(refer_tel);
                    }
                }
            });



            $('#get_identyCode').on('click', function() {
                var time0 = $('.js_show_entycode i').text();
                if (time0 < 61)
                {
                    //倒计时，不响应事件
                    return;
                }
                var refer_tel = $('.js_phone').val();

                if (yanzheng.available_phone(refer_tel)){
                    native.getDeviceInfo({"getDevInfo":"获取设备信息"}, function (cb) {
                        var getSMSData = {
                            mobile:refer_tel,
                            os:cb['os'],
                            sys_version:cb['sys_version'],
                            app_version:cb['app_version']
                        };

                        ajax_rule.ajax_rule('/store/v1/api/sms_send', 'POST', 'json', getSMSData, '.zheceng', function (respData) {
                            //发送验证码成功
                            timedCount();
                            $(".js_get_entycode").hide();
                            $(".js_show_entycode").show();

                        });
                    });
                }
            });


            $(".js_modify_pwd").on("click", function () {
                var phone = $('.js_phone').val();
                var smsCode = $('.js_sms_code').val();
                var pwd1 = $('.js_new_pwd').val();
                var pwd2 = $('.js_sure_pwd').val();
                if (!yanzheng.available_phone(phone)){
                    return;
                }

                if (!yanzheng.available_code(smsCode)){
                    return;
                }
                if (yanzheng.strIsNullUndefine(pwd1) || yanzheng.strIsNullUndefine(pwd2)){
                    native.uyuAlert({msg:"请输入6~18位验证码"}, function (cb) {
                    });
                    return;
                }else {
                    if (pwd1 !== pwd2){
                        native.uyuAlert({msg:"两次输入的密码不一致, 请重新输入"}, function (cb) {
                        });
                    }else if(pwd1.length >= 6 &&
                        pwd1.length <= 18 &&
                        pwd2.length >= 6 &&
                        pwd2.length <= 18){
                        var encPassword = md5.hex_md5(pwd1);
                        native.getDeviceInfo({"getDevInfo":"获取设备信息"}, function (cb) {
                            var modifyData = {
                                mobile:phone,
                                password:encPassword,
                                vcode:smsCode,
                                os:cb['os'],
                                sys_version:cb['sys_version'],
                                app_version:cb['app_version']
                            };
                            ajax_rule.ajax_rule('/store/v1/api/passwd_change', 'POST', 'json', modifyData, '.zheceng', function (respData) {
                                //发送验证码成功
                                native.uyuAlert({msg:"修改密码成功, 请重新登录"}, function (cb) {
                                    native.popToRootVC({msg:"退回根页面"}, function (cb) {
                                    });
                                });

                            });
                        });

                    }else {
                        native.uyuAlert({msg:"密码不合法，请重新输入"}, function (cb) {
                        });
                    }
                }
            });

        });
    });
});

//倒计时60s
function timedCount() {
    var time0 = $('.js_show_entycode i').text();
    $('.js_show_entycode i').text(time0 - 1);

    t = setTimeout("timedCount()", 1000);
    if (time0 == 0) {
        clearTimeout(t);
        $('.js_get_entycode').show();
        $('.js_show_entycode i').text(61);
        $('.js_show_entycode').hide();
    }
}