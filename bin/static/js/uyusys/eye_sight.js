/**
 * Created by mac on 17/3/15.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule", "vue"],function($, ajax_rule, vue){
        $(document).ready(function() {

            $(".eye_sight").swipe({
                swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                    alert(direction);
                }
            });

            var page = 1;

            function createVueWithUserId(store_user_id) {
                var vukk = new vue({
                    el: '#wap',
                    data: {eye_sights:[],
                    },
                    created: function () {
                        this.fetch_store_info();//获取店铺数据
                    },
                    methods: {
                        fetch_store_info: function () {
                            var getInfoData = {
                                se_userid: store_user_id,
                                userid: store_user_id
                            };
                            ajax_rule.ajax_rule('/store/v1/api/store_info', 'GET', 'json', getInfoData, '.zheceng', function (respData) {
                                var eyesightArr = respData['info'];
                                for (var i = 0; i < eyesightArr.length; i++){
                                    this.eye_sights.push(eyesightArr[i]);
                                }
                            });
                        },
                    }
                });
            }


        });
    });
});