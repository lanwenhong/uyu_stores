/**
 * Created by mac on 17/4/19.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule","yanzheng", "native"],function($, ajax_rule, yanzheng, native){
        $(document).ready(function() {
            $('.js_phone').on('input', function() {
                var refer_tel = $('.js_phone').val();
                if (refer_tel.length > 0 && refer_tel.length < 11){
                    var fristStr = refer_tel.substring(0, 1);
                    if (fristStr != '1'){
                        native.uyuAlert({msg:"请输入1开头的手机号"}, function (cb) {
                            console.log(cb.ret)
                        });
                    }
                }else if(refer_tel.length > 11){
                    $('.js_phone').val(refer_tel.substring(0, 11));
                    native.uyuAlert({msg:"请应该输入11位电话号码"}, function (cb) {
                        console.log(cb.ret)
                    });
                }else if(refer_tel.length == 11){
                    yanzheng.testPhone(refer_tel);
                }

            });

            $('.js_nick_name').on('input', function() {
                var nickName = $('.js_nick_name').val();
                if (nickName > 12){
                    $('.js_nick_name').val(nickName.substring(0, 18));
                }
            });

            $('.js_user_name').on('input', function() {
                var userName = $('.js_user_name').val();
                if (userName > 18){
                    $('.js_user_name').val(userName.substring(0, 18));
                }
            });

            $('.js_register').on('input', function() {
                var phone = $('.js_phone').val();
                var nickName = $('.js_nick_name').val();
                var userName = $('.js_user_name').val();
                var emailStr = $('.js_email').val();
                if (!yanzheng.testPhone(phone)){
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


                native.getDeviceInfo({"getDevInfo":"获取设备信息"}, function (cb) {
                    var modifyData = {
                        mobile:phone,
                        nick_name:nickName,
                        username:userName,
                        os:cb['os'],
                        sys_version:cb['sys_version'],
                        app_version:cb['app_version']
                    };
                    if (!yanzheng.strIsNullUndefine(emailStr)){
                        if (!yanzheng.email_test(emailStr)){
                            native.uyuAlert({msg:"请输入合法的邮箱"}, function (cb) {
                            });
                            return;
                        }else {
                            modifyData.email = emailStr;
                        }
                    }

                    native.uyuLog({'logMsg':JSON.stringify(modifyData)},function (cb) {
                        console.log(cb.ret);
                    });

                    ajax_rule.ajax_rule('/store/v1/api/eyesight_register', 'POST', 'json', modifyData, '.zheceng', function (respData) {
                        //发送验证码成功
                        native.uyuAlert({msg:"修改密码成功, 请重新登录"}, function (cb) {
                        });
                    });
                });
            });


        });
    });
});