/**
 * Created by mac on 17/3/15.
 */
require(['../require-config'], function() {
    require(["zepto", "yangzheng", "ajax_rule","vue"],function($, yangzheng, ajax_rule, vue){
        $(document).ready(function() {

            //获取userid
            $('.consumer_phone').on('input', function() {
                var refer_tel = $('.consumer_phone').val();
                if (!yanzheng.strIsNullUndefine(refer_tel)){
                    if(refer_tel.length > 11){
                        $('.js_phone').val(refer_tel.substring(0, 11));
                        yangzheng.tel_test(".consumer_phone");
                    }else if(refer_tel.length == 11){
                        //电话号码刚好11位
                        yanzheng.tel_test('.consumer_phone');
                    }else {
                        //取消验证
                    }
                }

            });

            $('.consumer_buy_times').on('input', function() {
                var refer_tel = $('.consumer_phone').val();
                if (!yanzheng.strIsNullUndefine(refer_tel)){
                    if(refer_tel.length > 4){
                        $('.js_phone').val(refer_tel.substring(0, 4));
                    }
                }

            });

            $(".js_distribute_times").on("click", function () {
                yanzheng.tel_test('.consumer_phone');
                var refer_tel = $('.consumer_phone').val();
                var buy_times = $('.consumer_buy_times').val();
                var distReqData = {"busicd": "STORE_ALLOT_TO_COMSUMER",
                    "se_userid": 1178,
                    "comsumer_mobile": refer_tel,
                    "training_times": buy_times};
                ajax_rule.ajax_rule('/store/v1/api/store_info', 'GET', 'json', distReqData, '.zheceng', function (respData) {
                    //分配成功的逻辑
                });
            });
        });
    });
});