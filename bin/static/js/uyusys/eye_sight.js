/**
 * Created by mac on 17/3/15.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule", "vue", "native"],function($, ajax_rule, vue, native){
        $(document).ready(function() {

            var rightConfig = {
                type:"jsfunc",
                title:"添加",
                funcName:"addEyeSight"
            };
            native.addRightBtn(rightConfig, function (cb) {
                console.log(cb.ret);
            });

            native.regNativeCallJS("addEyeSight", function (cb) {
                alert("添加石光师");
            });


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
                            if (eyesightArr.length > 0){
                                page = page + 1;
                                $('.section_nothing').hide();
                            }else if (eyesightArr.length == 0){
                                $('.section_nothing').show();
                            }
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
                            if (eyesightArr.length > 0){
                                page = page + 1;
                            }else if (eyesightArr.length == 0){

                            }
                            for (var i = 0; i < eyesightArr.length; i++){
                                _this.eye_sights.push(eyesightArr[i]);
                            }
                        });
                    }
                }
            });
            //注册下拉刷新方法
            native.updateCurrentView(function () {
                page = 1;
                var len = vukk.eye_sights.length;
                vukk.eye_sights.splice(0, len);
                vukk.next_list_page();
            });
            //注册上拉加载的方法
            native.pullUpRefresh(function (resp) {
                vukk.next_list_page();
            });
        });
    });
});