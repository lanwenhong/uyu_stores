/**
 * Created by mac on 17/3/23.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule", "native"],function($, ajax_rule, native){
        $(function() {
            $(document).ready(function () {
                var loginReq = {
                    mobile: '17889807865',
                    password: '807865'
                };

                ajax_rule.ajax_rule('/store/v1/api/store_info', 'POST', 'json', loginReq, '.zheceng', function (respData) {
                    alert("登录成功");
                });
            });
        });
    });
});