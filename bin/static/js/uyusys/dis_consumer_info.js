/**
 * Created by mac on 17/3/15.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule", "native"],function($, ajax_rule, native){
        $(document).ready(function() {
            function yanzheng(id) {
                var val = $(id).val();
                var val_exp = /(^(\d{3,4}-)?\d{7,8})$|^1[0-9]{10}$/;
                if (!val_exp.test(val)) {
                    native.alert({msg:"手机号不合法"}, function (cb) {
                    });
                    return;
                } else {

                }
            }
            $('.consumer_name').on('input', function() {
                var name = $('.consumer_name').val();
                if (name !== null && name !== undefined) {
                    if (name.length > 11) {
                        $('.consumer_name').val(name.substring(0, 18));
                    }
                }
            });


            $('.js_search_phone').on('input', function() {
                var refer_tel = $('.js_search_phone').val();

                if (refer_tel !== null && refer_tel !== undefined){
                    if(refer_tel.length > 11){
                        $('.js_search_phone').val(refer_tel.substring(0, 11));

                        refer_tel = $('.js_search_phone').val();
                        yanzheng('.js_search_phone');
                    }else if(refer_tel.length == 11){
                        //电话号码刚好11位
                        yanzheng('.js_search_phone');
                    }else {
                        //取消验证
                    }
                }
            });

            $('.js_search').on('click', function() {
                native.getUserIdFromObjC({}, function (cb) {
                    var refer_tel = $('.js_search_phone').val();
                    var store_user_id = cb['userid'];
                    var req = {
                        se_userid:store_user_id,
                        mobile:refer_tel
                    }
                    ajax_rule.ajax_rule('/store/v1/api/load_consumer', 'POST', 'json', req, '.zheceng', function (respData) {
                        $(".consumer_name").val(respData["username"]);
                        $(".consumer_phone").val(respData["mobile"]);
                    });
                });
            });

            //获取userid
            $('.consumer_phone').on('input', function() {
                var refer_tel = $('.consumer_phone').val();

                if (refer_tel !== null && refer_tel !== undefined){
                    if(refer_tel.length > 11){
                        $('.consumer_phone').val(refer_tel.substring(0, 11));

                        refer_tel = $('.consumer_phone').val();
                        yanzheng('.consumer_phone');
                    }else if(refer_tel.length == 11){
                        //电话号码刚好11位
                        yanzheng('.consumer_phone');
                    }else {
                        //取消验证
                    }
                }

            });


            $('.consumer_buy_times').on('input', function() {
                var times = $('.consumer_buy_times').val();
                if (times !== null && times !== undefined){
                    if(times.length > 6){
                        $('.consumer_buy_times').val(times.substring(0, 6));
                    }
                }

            });

            function fetch_left_Times() {
                native.getUserIdFromObjC({}, function (cb) {
                    var store_user_id = cb['userid'];
                    var getInfoData = {
                        se_userid: store_user_id,
                        userid: store_user_id
                    };
                    ajax_rule.ajax_rule('/store/v1/api/store_info', 'GET', 'json', getInfoData, '.zheceng', function (respData) {
                        $("#store_left_times").text(respData["remain_times"]);
                    });
                });
            }

            fetch_left_Times();

            $(".js_distribute_times").on("click", function () {
                var refer_tel = $('.consumer_phone').val();
                var buy_times = $('.consumer_buy_times').val();

                var val_exp = /^[0-9]*$/;
                if (!val_exp.test(buy_times)) {
                    native.alert({msg:"你输入的次数不合法"}, function (cb) {
                    });
                    return;
                }
                if (refer_tel !== null && refer_tel !== undefined && buy_times !== null && buy_times !== undefined && parseInt(buy_times) > 0){

                    native.getUserIdFromObjC({}, function (cb) {
                        var store_user_id = cb['userid'];
                        var distReqData = {"busicd": "STORE_ALLOT_TO_COMSUMER",
                            "se_userid": store_user_id,
                            "consumer_mobile": refer_tel,
                            "training_times": buy_times};
                        ajax_rule.ajax_rule('/store/v1/api/store_to_consumer', 'POST', 'json', distReqData, '.zheceng', function (respData) {
                            //分配成功的逻辑
                            native.alert({msg:"为消费者分配训练次数成功!"}, function (cb) {
                            });
                            fetch_left_Times();
                        });
                    });
                }
            });
        });
    });
});