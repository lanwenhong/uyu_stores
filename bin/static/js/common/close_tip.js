define(function() {　
    var close_tip = function() {
        //关闭弹框
        $('.js_alert_con_close').on('click', function() {
            $('.alert_con').hide();
            // $('.alert_con .alert_con_br').html();
            $('.zheceng').hide();
            $('.zheceng1').hide();
            $('.zheceng2').hide();
        });
    }

    return {
        close_tip: close_tip
    };　
});
