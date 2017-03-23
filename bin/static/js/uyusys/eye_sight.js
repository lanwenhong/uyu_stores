/**
 * Created by mac on 17/3/15.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule", "vue"],function($, ajax_rule, vue){
        $(document).ready(function() {
            var page = 1;

            var vukk = new vue({
                el: '#wap',
                data: {
                    eye_sights: new Array(),
                },
                created: function () {
                    this.frist_list_page();//获取店铺数据
                },
                methods: {
                    frist_list_page: function () {
                        var _this = this;
                        var listReq = {
                            se_userid: localStorage.getItem("userid"),
                            maxnum: "10",
                            page:''+page
                        };
                        ajax_rule.ajax_rule('/store/v1/api/eyesight_list', 'GET', 'json', listReq, '.zheceng', function (respData) {
                            var eyesightArr = respData['info'];
                            for (var i = 0; i < eyesightArr.length; i++){
                                _this.eye_sights.push(eyesightArr[i]);
                            }
                        });
                    },
                    next_list_page:function () {
                        var _this = this;
                        var listReq = {
                            se_userid: localStorage.getItem("userid"),
                            maxnum: "10",
                            page:''+page
                        };
                        ajax_rule.ajax_rule('/store/v1/api/eyesight_list', 'GET', 'json', listReq, '.zheceng', function (respData) {
                            var eyesightArr = respData['info'];
                            if (eyesightArr.length == 10){
                                page = page + 1;
                                for (var i = 0; i < eyesightArr.length; i++){
                                    _this.eye_sights.push(eyesightArr[i]);
                                }
                            }else if (eyesightArr.length > 0){
                                for (var i = 0; i < eyesightArr.length; i++){
                                    _this.eye_sights.push(eyesightArr[i]);
                                }
                            }
                        });
                    }
                }
            });

            native.pullUpRefresh(function (resp) {
                vukk.next_list_page();
            });
        });
    });
});