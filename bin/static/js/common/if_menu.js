define(function() {　
    //是否显示菜单--右上角
    function if_menu() {
        if (typeof QFPAY !== "undefined") {
            if (location.href.indexOf('/prepaid/v1/page/b/index.html') == '-1') {
                QFPAY.call('setNavMenu', {
                    menus: [],
                    buttons: []
                }, function(cb) {
                    console.log(cb.ret)
                })
            } else {
                QFPAY.call('setNavMenu', {
                    menus: [{
                        type: 'uri',
                        uri: location.protocol + '//' + location.host + '/prepaid/v1/page/b/transactions/consume.html',
                        icon: location.protocol + '//' + location.host + '/prepaid/v1/static/new/img/ic_mingxi.png',
                        title: '储值消费',
                    }, {
                        type: 'uri',
                        uri: location.protocol + '//' + location.host + '/prepaid/v1/page/b/activity_history.html',
                        icon: location.protocol + '//' + location.host + '/prepaid/v1/static/new/img/ic_history.png',
                        title: '历史活动',
                    }, {
                        type: 'uri',
                        uri: location.protocol + '//' + location.host + '/prepaid/v1/page/b/user_guide.html',
                        icon: location.protocol + '//' + location.host + '/prepaid/v1/static/new/img/ic_jiaocheng.png',
                        title: '储值教程',
                    }],
                    buttons: [

                    ]
                }, function(cb) {
                    console.log(cb.ret)
                })
            }
        }

    }
    //跳转链接
    function goto_url(url_val) {
        if (typeof QFPAY !== "undefined") {
            QFPAY.call('openUri', {
                uri: url_val,
            }, function(cb) {
                console.log(cb.ret)
            })
        } else {
            location.href = url_val;
        }
    }
    return {
        if_menu: if_menu,
        goto_url: goto_url,
    };　
});
