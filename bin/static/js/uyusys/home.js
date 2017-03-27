/**
 * Created by mac on 17/3/11.
 */

require(['../require-config'], function() {
    require(["zepto", "ajax_rule", "native"],function($, ajax_rule, native){
        $(function() {
            $(document).ready(function() {

                //请求更新页面
                // function createVueWithUserId(store_user_id) {
                //     var vukk = new vue({
                //         el: '#wap',
                //         data: {
                //             store_name: "用户名",
                //             store_left_times: "0",
                //             month_distribute: "0",
                //             month_earned_money: "0",
                //             day_distribute: "0",
                //             day_earned_money: "0",
                //         },
                //         created: function () {
                //             this.fetch_store_info();//获取店铺数据
                //         },
                //         methods: {
                //             fetch_store_info: function () {
                //                 var getInfoData = {
                //                     se_userid: store_user_id,
                //                     userid: store_user_id
                //                 };
                //                 ajax_rule.ajax_rule('/store/v1/api/store_info', 'GET', 'json', getInfoData, '.zheceng', function (respData) {
                //                     this.store_name = respData["store_name"];
                //                     this.store_left_times = respData["remain_times"];
                //                     this.month_distribute = respData["m_train"];
                //                     this.month_earned_money = respData["m_amt"];
                //                     this.day_distribute = respData["d_train"];
                //                     this.day_earned_money = respData["d_amt"];
                //                 });
                //             },
                //         }
                //     });
                // }

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
                        })
                    } else {
                        alert("location.href");
                        location.href = openUrl;
                    }
                });

                $(".js_goto_distribute").on("click", function () {
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
                //获取userid
                native.getUserIdFromObjC({}, function (cb) {
                    var store_user_id = cb['userid'];
                    localStorage.setItem("userid", store_user_id);
                    updateViewData(store_user_id);
                });

                native.updateCurrentView(function (resp) {
                    updateViewData(localStorage.getItem("userid"));
                });

            });
        });

    });
});



