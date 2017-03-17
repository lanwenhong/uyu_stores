/**
 * Created by mac on 17/3/11.
 */

require(['../require-config'], function() {
    require(["zepto", "ajax_rule","vue"],function($, ajax_rule, vue){
        $(function() {
            $(document).ready(function() {

                // var loginData = {
                //     mobile:"13600000013",
                //     password:"000013",
                // }
                // ajax_rule.ajax_rule('/store/v1/api/login', 'POST', 'json', loginData, '.zheceng', login_success);



                function createVueWithUserId(store_user_id) {

                    var vukk = new vue({
                        el:'#wap',
                        data:{
                            store_name:"用户名",
                            store_left_times:"0",
                            month_distribute:"0",
                            month_earned_money:"0",
                            day_distribute:"0",
                            day_earned_money:"0",
                        },
                        created:function () {
                            this.fetch_store_info();//获取店铺数据
                        },
                        methods:{
                            fetch_store_info:function () {
                                var getInfoData = {
                                    se_userid:store_user_id,
                                    userid:store_user_id
                                };
                                ajax_rule.ajax_rule('/store/v1/api/store_info', 'GET', 'json', getInfoData, '.zheceng', function (respData) {
                                    this.store_name = respData["store_name"];
                                    this.store_left_times = respData["remain_times"];
                                    this.month_distribute = respData["m_train"];
                                    this.month_earned_money = respData["m_amt"];
                                    this.day_distribute = respData["d_train"];
                                    this.day_earned_money = respData["d_amt"];
                                });
                            },
                        }
                    });
                }



                /*这段代码是固定的，必须要放到js中*/
                function setupWebViewJavascriptBridge(callback) {
                    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
                    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
                    window.WVJBCallbacks = [callback];
                    var WVJBIframe = document.createElement('iframe');
                    WVJBIframe.style.display = 'none';
                    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
                    document.documentElement.appendChild(WVJBIframe);
                    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
                }

                function connectWebViewJavascriptBridge(callback) {
                    if (window.WebViewJavascriptBridge) {
                        callback(WebViewJavascriptBridge)
                    } else {
                        document.addEventListener(
                            'WebViewJavascriptBridgeReady'
                            , function() {
                                callback(WebViewJavascriptBridge)
                            },
                            false
                        );
                    }
                }
                /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/

                var isAndroid = function() {
                    var ua = navigator.userAgent
                    return (/Android/i).test(ua)
                };

                if (isAndroid()){
                    connectWebViewJavascriptBridge(function(bridge) {
                        bridge.init(function(message, responseCallback) {
                            console.log('JS got a message', message);
                            var data = {
                                'Javascript Responds': 'Wee!'
                            };
                            console.log('JS responding with', data);
                            responseCallback(data);
                        });

                        $(".js_goto_distribute_record").on("click", function () {
                            bridge.callHandler('getBlogNameFromObjC', {'blogURL': 'http://www.baidu.com'}, function(response) {

                                var userid = response["userid"];
                                createVueWithUserId(userid);
                            })
                        });
                    })
                }else {
                    setupWebViewJavascriptBridge(function(bridge) {

                        $(".js_goto_distribute_record").on("click", function () {
                            bridge.callHandler('getBlogNameFromObjC', {'blogURL': 'http://www.baidu.com'}, function(response) {
                                var userid = response["userid"];
                                createVueWithUserId(userid);
                            })
                        });

                    });
                }
            });
        });

        });
});



