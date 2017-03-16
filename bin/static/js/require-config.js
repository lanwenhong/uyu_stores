require.config({
    baseUrl: "../dist/js",
    paths: {
        "jquery": ["libs/jquery-2.1.4.min", "libs/jquery-1.7.2.min", "http://libs.baidu.com/jquery/2.0.3/jquery"],
        "zepto": "libs/zepto.min",
        "mobile": "libs/date/jquery.mobile-1.4.5.min",
        "mobiscroll": "libs/date/mobiscroll", //通过shim绑定关联模块jquery
        "iscroll": "libs/iscroll",
        "iosselect": "libs/iosselect/iosSelect",//ios select样式
        "vue": "libs/vue",//vue
        "vue_resource": "libs/vue-resource",//vue
        "yanzheng": "common/yanzheng", //将通用方法放在同一个模块中
        "ajaxps": "common/ajaxps", //在模块中调用其他模块的方法
        "date": "common/date", //在模块中调用其他模块的方法--日期插件
        "close_tip": "common/close_tip", //在模块中调用其他模块的方法--关闭弹框
        "date_change": "common/date_change",//时间格式化 从2016-09-22 11:22:33到2016.9.18
        "jsonp": "libs/jquery.jsonp",
        "ajax_rule": "common/ajax_rule",//ajax框架
        "scroll_more": "common/scroll_more",//滑动查看更多
        "scroll_down": "common/scroll_down",//缓慢滚动到底部
        "add_bounced": "common/add_bounced",//弹框，包括load动画和遮层
        "localstorage":"common/localstorage",//存储localstorage
        "date_get": "common/date_get",//获取年月日--创建活动日期
        "date_day": "common/date_day",//获取年月日--生日
        "if_menu": "common/if_menu",//判断 处置活动首页显示右上角导航
        "jsbridge": "common/jsbridge",//环境还未准备好,bridge 还未注入,H5跟 Native还不能交互,放进队列中
        "native": "common/native",//解析app方法
        "alert_word": "common/alert_word",//提示文字
        "JSTools":"common/js_tools",//js工具

    },
    shim: {　　　　　　
        'mobiscroll': {　　　　　　　　
            deps: ['jquery'],
            　　　　　　　　
            exports: 'mobiscroll'　　　　　　
        },
        　　　　　
        'jsonp': {　　　　　　　　
            deps: ['jquery'],
            　　　　　　　　
            exports: 'jsonp'　　　　　　
        },

        'zepto': {　　　　　　　　　　　　　　　　
            exports: '$'　　　　　　
        },

        'vue':{
            exports:'vue'
        },

        // 'vue_resource': {　　　　　　　　
        //     deps: ['vue'],
        //     　　　　　　　　
        //     exports: 'vue_resource'　　　　　　
        // },
    }

});