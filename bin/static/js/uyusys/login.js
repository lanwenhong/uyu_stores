/**
 * Created by mac on 17/3/23.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule"],function($, ajax_rule){
        $(function() {
            $(document).ready(function () {
                var loginReq = {
                    mobile: '17889807865',
                    password: '807865'
                };

                ajax_rule.ajax_rule('/store/v1/api/login', 'POST', 'json', loginReq, '.zheceng', function (respData) {
                    alert("登录成功");
                });
            });
        });
    });
});