/**
 * Created by mac on 17/3/15.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule", "jquerySwipe"],function($, ajax_rule, jquerySwipe){
        $(document).ready(function() {

            $(".eye_sight").swipe({
                swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                    alert(direction);
                }
            });

            var page = 1;

            $('.eye_sight_delete').on('click', function () {
                alert("dddddvvvv");
                var listReq = {
                    page: ''+page,
                    maxnum: '10'
                };
                ajax_rule.ajax_rule('/store/v1/api/eyesight_list', 'GET', 'json', listReq, '.zheceng', function (respData) {
                    page = page + 1;
                    alert(JSON.stringify(respData));
                });
            })


        });
    });
});