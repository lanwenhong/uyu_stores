/**
 * Created by mac on 17/3/15.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule","vue"],function($, ajax_rule, vue){
        $(document).ready(function() {

            var page = 1;
            function createVueWithUserId(store_user_id) {
                var vukk = new vue({
                    el: '#wap',
                    data: {
                        devices: new Array(),
                    },
                    created: function () {
                        this.fetch_store_info();//获取店铺数据
                    },
                    methods: {
                        fetch_store_info: function () {
                            var _this = this;
                            var listReq = {
                                se_userid: store_user_id,
                                maxnum: "10",
                                page:''+page
                            };
                            ajax_rule.ajax_rule('/store/v1/api/device_list', 'GET', 'json', listReq, '.zheceng', function (respData) {
                                var devArr = respData['info'];
                                for (var i = 0; i < devArr.length; i++){
                                    _this.devices.push(devArr[i]);
                                }
                            });
                        },
                    }
                });
            }
            createVueWithUserId(localStorage.getItem("userid"));

        });
    });
});