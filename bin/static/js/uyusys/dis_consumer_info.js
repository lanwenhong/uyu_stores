/**
 * Created by mac on 17/3/15.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule", "yanzheng", "native"],function($, ajax_rule, yanzheng, native){
        $(document).ready(function() {

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
                    mobile:refer_tel
                }
                ajax_rule.ajax_rule('/store/v1/api/load_consumer', 'POST', 'json', req, '.zheceng', function (respData) {
                    $(".consumer_name").val(respData["username"]);
                    $(".consumer_phone").val(respData["mobile"]);
                });
            });

            //获取userid
            $('.consumer_phone').on('input', function() {
                var refer_tel = $('.consumer_phone').val();

                if (refer_tel !== null && refer_tel !== undefined){
                    if(refer_tel.length > 11){
                        $('.consumer_phone').val(refer_tel.substring(0, 11));

                        refer_tel = $('.consumer_phone').val();
                        yanzheng.testPhone('.consumer_phone');
                    }else if(refer_tel.length == 11){
                        //电话号码刚好11位
                        yanzheng.testPhone('.consumer_phone');
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
                    var store_user_id = localStorage.getItem("userid");;
                    var getInfoData = {
                        se_userid: store_user_id,
                        userid: store_user_id
                    };
                    ajax_rule.ajax_rule('/store/v1/api/store_info', 'GET', 'json', getInfoData, '.zheceng', function (respData) {
                        $("#store_left_times").text(respData["remain_times"]);
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
                    var store_user_id = localStorage.getItem("userid");
                    var distReqData = {"busicd": "STORE_ALLOT_TO_COMSUMER",
                        "se_userid": store_user_id,
                        "consumer_mobile": refer_tel,
                        "training_times": buy_times};
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
                        native.alert({msg:"为消费者分配训练次数成功!"}, function (cb) {
                        });
                    });

                }
            });
        });
    });
});