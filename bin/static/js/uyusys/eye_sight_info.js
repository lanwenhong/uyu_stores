/**
 * Created by mac on 17/4/1.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule","vue", "yanzheng"],function($, ajax_rule, vue, yanzheng){
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

            $('.js_search').on('click', function() {
                var refer_tel = $('.js_search_phone').val();
                var store_user_id = localStorage.getItem("userid");
                var req = {
                    se_userid:store_user_id,
                    phone_num:refer_tel
                };
                alert(JSON.stringify(req));
                ajax_rule.ajax_rule('/store/v1/api/eyesight', 'POST', 'json', req, '.zheceng', function (respData) {
                    // $(".consumer_name").val(respData["username"]);
                    // $(".consumer_phone").val(respData["mobile"]);

                    alert(JSON.stringify(respData));
                });
            });
        });
    });
});