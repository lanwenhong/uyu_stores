/**
 * Created by mac on 17/3/11.
 */


var testData = {
    message:'vue测试',
    age:50,
};
require(['../require-config'], function() {
    require(["zepto", "ajax_rule","vue"],function($, ajax_rule, vue){
        $(function() {
            $(document).ready(function() {
                var getInfoData = {
                    se_userid:'1178',
                    userid:'1178'
                };
                function login_success() {
                    alert("kkkkkkk");
                }

                function get_info_success(respData) {
                    alert("lllllllll")
                    ajax_rule.ajax_rule('/store/v1/api/store_info', 'GET', 'json', getInfoData, '.zheceng', get_info_success);

                }
                var loginData = {
                    mobile:"13600000013",
                    password:"000013",
                }
                ajax_rule.ajax_rule('/store/v1/api/login', 'POST', 'json', loginData, '.zheceng', login_success);


                var vukk = new vue({
                    el:'#store_name',
                    data:testData,
                });
            });
        });

        });
});



