/**
 * Created by mac on 17/3/15.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule", "vue"],function($, ajax_rule, vue){
        $(document).ready(function() {
            var page = 1;

            function createVueWithUserId(store_user_id) {
alert(''+store_user_id);
                var vukk = new vue({
                    el: '#wap',
                    data: {
<<<<<<< HEAD
			eye_sights: new Array(),
=======
                        eye_sights: new Array(),
>>>>>>> 65178c84860fac15f14802049be491a9513c2965
                    },
                    created: function () {
                        this.fetch_store_info();//获取店铺数据
                    },
                    methods: {
                        fetch_store_info: function () {
                            var _this = this;
<<<<<<< HEAD
			    var listReq = {
=======
                            var listReq = {
>>>>>>> 65178c84860fac15f14802049be491a9513c2965
                                se_userid: store_user_id,
                                maxnum: "10",
                                page:''+page
                            };
                            ajax_rule.ajax_rule('/store/v1/api/device_list', 'GET', 'json', listReq, '.zheceng', function (respData) {
                                var eyesightArr = respData['info'];
				console.log(JSON.stringify(eyesightArr[0]));
                                for (var i = 0; i < eyesightArr.length; i++){
<<<<<<< HEAD
				    _this.eye_sights.push(eyesightArr[i]);
=======
                                    _this.eye_sights.push(eyesightArr[i]);
>>>>>>> 65178c84860fac15f14802049be491a9513c2965
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
