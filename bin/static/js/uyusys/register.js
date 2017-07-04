/**
 * Created by mac on 17/4/19.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule","yanzheng", "native"],function($, ajax_rule, yanzheng, native){
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
                    }else if(refer_tel.length == 11){
                        yanzheng.available_phone(refer_tel);
                    }
                }
            });


            $('.js_register').on('click', function() {
                var phone = $('.js_phone').val();
                var nickName = $('.js_nick_name').val();
                var userName = $('.js_user_name').val();
                var emailStr = $('.js_email').val();
                var passworld = $('.js_password').val();
                var passworld_sure = $('.js_password_sure');

                if (!yanzheng.available_phone(phone)){
                    return;
                }
                if (yanzheng.strIsNullUndefine(nickName)){
                    native.uyuAlert({msg:"请输入昵称"}, function (cb) {
                    });
                    return;
                }
                if (yanzheng.strIsNullUndefine(userName)){
                    native.uyuAlert({msg:"请输入用户名"}, function (cb) {
                    });
                    return;
                }
                if (yanzheng.strIsNullUndefine(passworld)){
                    native.uyuAlert({msg:"请输入密码"}, function (cb) {
                    });
                    return;
                }
                if (yanzheng.strIsNullUndefine(passworld_sure)){
                    native.uyuAlert({msg:"请确认密码"}, function (cb) {
                    });
                    return;
                }
                if (passworld.length < 6 || passworld.length > 18){
                    native.uyuAlert({msg:"请输入6~18位密码"}, function (cb) {
                    });
                    return;
                }
                if (passworld_sure.length < 6 || passworld_sure.length > 18){
                    native.uyuAlert({msg:"请输入6~18位密码"}, function (cb) {
                    });
                    return;
                }
                if (passworld === passworld_sure){
                    native.uyuAlert({msg:"两次输入的密码不一致,请重新输入"}, function (cb) {
                    });
                    return;
                }


                native.getDeviceInfo({"getDevInfo":"获取设备信息"}, function (cb) {
                    var deviceInfo = cb;
                    native.handlePassword({'password':passworld}, function (cb) {
                        var regData = {
                            mobile:phone,
                            nick_name:nickName,
                            username:userName,
                            old_passworld:deviceInfo['old_passworld'],
                            new_passworld:deviceInfo['new_passworld'],
                            os:deviceInfo['os'],
                            sys_version:deviceInfo['sys_version'],
                            app_version:deviceInfo['app_version']
                        };
                        if (!yanzheng.strIsNullUndefine(emailStr)){
                            if (!yanzheng.available_email(emailStr)) {
                                return;
                            }
                            regData.email =emailStr;
                        }
                        ajax_rule.ajax_rule('/store/v1/api/eyesight_register', 'POST', 'json', regData, '.zheceng', function (respData) {
                            //发送验证码成功

                            native.uyuAlert({msg:"注册成功"}, function (cb) {
                                native.popToRootVC({msg:"退回根页面"}, function (cb) {
                                });
                            });

                        });
                    });

                });
            });


        });
    });
});