/**
 * Created by mac on 17/3/11.
 */

require(['../require-config'], function() {
    require(["zepto", "ajax_rule", "native"],function($, ajax_rule, native){
        $(function() {
            $(document).ready(function() {
                var rightConfig = {
                    type:"logout",
                    title:"退出登录"
                };
                native.addRightBtn(rightConfig, function (cb) {
                    console.log(cb.ret);
                });

                function updateViewData(store_user_id) {
                    var getInfoData = {
                        se_userid: store_user_id,
                        userid: store_user_id
                    };

                    ajax_rule.ajax_rule('/store/v1/api/store_info', 'GET', 'json', getInfoData, '.zheceng', function (respData) {
                        $("#store_name").text(respData["store_name"]);
                        $("#store_left_times").text(respData["remain_times"]);
                        $("#month_distribute").text(respData["m_train"]);
                        $("#month_earned_money").text(respData["m_amt"]);
                        $("#day_distribute").text(respData["d_train"]);
                        $("#day_earned_money").text(respData["d_amt"]);
                    });
                }


                //注册点击事件
                $(".js_goto_record").on("click", function () {

                    var openUrl = location.protocol + '//' + location.host + '/store/v1/page/dis_record.html'
                    if (window.WebViewJavascriptBridge !== "undefined") {
                        var openUrlData ={
                            url:openUrl,
                            pullDown:"1",
                            pullUp:"1"
                        };
                        native.openUrl(openUrlData, function (cb) {
                            console.log("call back");
                        });
                    } else {
                        alert("location.href");
                        location.href = openUrl;
                    }
                });


                $(".js_goto_distribute").on("click", function () {

                    native.regNativeCallJS("notiUpdateCurentView", function () {
                        updateViewData(localStorage.getItem("userid"));
                    });

                    var regNoti = {
                        notiName:"updateMineWebView",
                        notiRespFuncName:"notiUpdateCurentView"
                    };
                    native.regNotifiaction(regNoti, function () {
                        var openUrl = location.protocol + '//' + location.host + '/store/v1/page/dis_consumer_info.html'

                        if (window.WebViewJavascriptBridge !== "undefined") {
                            var openUrlData ={
                                url:openUrl,
                                pullDown:"0",
                                pullUp:"0"
                            };
                            native.openUrl(openUrlData, function (cb) {
                                console.log("call back");
                            })
                        } else {
                            alert("location.href");
                            location.href = openUrl;
                        }
                    });


                });

                $(".js_goto_bills").on("click", function () {
                    var openUrl = location.protocol + '//' + location.host + '/store/v1/page/bill.html'
                    if (window.WebViewJavascriptBridge !== "undefined") {
                        var openUrlData ={
                            url:openUrl,
                            pullDown:"1",
                            pullUp:"1"
                        };
                        native.openUrl(openUrlData, function (cb) {
                            console.log("call back");
                        })
                    } else {
                        location.href = openUrl;
                    }
                });


                //获取userid
                native.getUserIdFromObjC({}, function (cb) {
                    var store_user_id = cb['userid'];
                    var is_prepayment = cb['is_prepayment'];
                    localStorage.setItem("userid", store_user_id);
                    if(parseInt(is_prepayment) == 1){
                        //分成模式才有账单
                        $('.js_goto_bills').show();
                    }else {
                        $('.js_goto_bills').hide();
                    }
                    updateViewData(store_user_id);
                });

                native.updateCurrentView(function (resp) {
                    updateViewData(localStorage.getItem("userid"));
                });

            });
        });

    });
});



