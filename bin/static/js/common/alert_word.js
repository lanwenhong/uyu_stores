define(["zepto"], function($) {　
    var alet_data = {
        nomore_word: '<div class="toast_data" id="toast_data"></div>', //加载到最后的提示
        nomore_word_short: '<div class="toast_data_short" id="toast_data_short"></div>', //加载到最后的提示
        left_px: 0, //段提示框距离左侧的距离
    };

    //加载图标和文字提示 添加在页面中，并可以修改加载提示文字-----必须单独引入到页面
    function toast_data(id, text) {
        //id为需要将加载图标和没有信息时的提示添加在的div，text用来重新设置加载到最后的文字提示，如果没有text则用默认的文字显示
        $(id).append(alet_data.nomore_word);
        if (text) {
            $('#toast_data').text(text);
        } else {
            $('#toast_data').text('没有更多数据了');
        }
    }
    //提示文字隐藏动画
    function nomoredata_hide() {
        $("#toast_data").animate({ opacity: 0, }, 500, 'ease-out', function() {
            $("#toast_data").css('z-index', -12);
        });
    }

    //提示文字显示动画 
    function nomoredata_show() {
        $("#toast_data").css('z-index', 12).animate({ opacity: 0.85, }, 500, 'ease-out');
    }

    //文字显示3s后隐藏
    function alert_word_show() {
        nomoredata_show();
        window.setTimeout(nomoredata_hide, 3000);
    }

    //加载图标和文字提示 添加在页面中，并可以修改加载提示文字-----必须单独引入到页面
    function toast_data_short(id, text) {
        //id为需要将加载图标和没有信息时的提示添加在的div，text用来重新设置加载到最后的文字提示，如果没有text则用默认的文字显示
        $(id).append(alet_data.nomore_word_short);
        if (text) {
            $('#toast_data_short').text(text);
        } else {
            $('#toast_data_short').text('没有更多数据了');
        }
        alet_data.left_px = count_leftpx();
    }
    //提示文字隐藏动画
    function nomoredata_hide_short() {
        $("#toast_data_short").css('left', alet_data.left_px + 'px').animate({ opacity: 0, }, 500, 'ease-out', function() {
            $("#toast_data_short").css('z-index', -12);
        });
    }

    //提示文字显示动画 
    function nomoredata_show_short() {
        $("#toast_data_short").css({ 'z-index': 12, left: alet_data.left_px + 'px' }).animate({ opacity: 0.85, }, 500, 'ease-out');
    }

    //文字显示3s后隐藏
    function alert_word_show_short() {
        nomoredata_show_short();
        window.setTimeout(nomoredata_hide_short, 3000);
    }
    //计算距离左侧距离
    function count_leftpx() {
        var toast_w = $('#toast_data_short').width();
        var body_w = $('body').width();
        var leftpx = (body_w - toast_w) / 2;
        return Math.floor(leftpx);
    }



    return {
        alet_data: alet_data,
        toast_data: toast_data,
        nomoredata_hide: nomoredata_hide,
        nomoredata_show: nomoredata_show,
        alert_word_show: alert_word_show,
        toast_data_short: toast_data_short,
        nomoredata_hide_short: nomoredata_hide_short,
        nomoredata_show_short: nomoredata_show_short,
        alert_word_show_short: alert_word_show_short,
        count_leftpx: count_leftpx,
    };　
});
