define(["zepto"], function($) {　
    var load = '<div id="loading"></div>'; //loading
    var zhe = '<div class="zheceng"></div><div class="zheceng1"></div><div class="zheceng2"></div>'; //透明遮层
    //弹框框架--单按钮
    var bounced = '<div class="alert_con" id="alert_alert"><div class="alert_con_t orange">提示<span class="pass_close js_alert_con_close">×</span></div><div class="alert_con_b"><div class="alert_con_br"></div><div class="clearfix"></div><span class="alert_con_close js_alert_con_close">确定</span></div></div>';
    //透明背景--数据加载中
    var load_small='<div id="load_small_bg"><div id="load_small"><i></i><br/><span>数据加载中</span></div></div>';
    //添加到body
    function add_bounced() {
        $('body').append(load);
        $('body').append(load_small);
        $('body').append(bounced);
        $('body').append(zhe);
    }
    //关闭弹框
    var close_tip = function() {
        $('.js_alert_con_close').on('click', function() {
            $('.alert_con').hide();
            $('.zheceng').hide();
            $('.zheceng1').hide();
            $('.zheceng2').hide();
        });
    }
    //弹框高度定位----add_new
    function alert_top(id) {
        var alert_height = $(id).height();
        var mar_t = (alert_height / 2) - 20;
        $(id).css('marginTop', -mar_t + 'px');
    }

    return {
        add_bounced: add_bounced,
        close_tip: close_tip,
        alert_top: alert_top,
    };　
});
