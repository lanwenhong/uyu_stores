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
                var store_user_id = localStorage.getItem("userid");
                var req = {
                    se_userid:store_user_id,
                    phone_num:refer_tel
                };
                ajax_rule.ajax_rule('/store/v1/api/eyesight', 'GET', 'json', req, '.zheceng', function (respData) {
                    eyesightInfo = respData;
                    $(".eye_sight_name").val(respData["username"]);
                    $(".eye_sight_nickname").val(respData["nick_name"]);
                    $(".eye_sight_phone").val(respData["mobile"]);
                });
            });

            $('.js_bottom_button_action').on('click', function () {
                if (eyesightInfo !== null && eyesightInfo !== undefined){
                    var store_user_id = localStorage.getItem("userid");
                    var req = {
                        se_userid:store_user_id,
                        userid:eyesightInfo['id']
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
                        native.alert({msg:msgStr}, function (cb) {
                            console.log(cb.ret);
                        });
                    });
                }else {
                    native.alert({msg:"请先查到你要添加的试光师"}, function (cb) {
                        console.log(cb.ret);
                    })
                }
            });
        });
    });
});