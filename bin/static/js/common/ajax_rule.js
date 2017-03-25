define(["add_bounced"],function(add_bounced) {　
    //添加弹框
    add_bounced.add_bounced();
    //关闭弹框
    add_bounced.close_tip();
    //ajax规则
    var baseUrl = location.protocol + '//' + location.host;
    function ajax_rule(url, type, dataType, data, zhecengid, success_func, error_func) {
        var requestUrl = baseUrl + url;
        $.ajax({
            url: requestUrl,
            type: type,
            dataType: dataType,
            data: data,
            beforeSend: function(xhr) {
                $('#load_small_bg').show();
            },
            success: function(data) {
                if (data.respcd != '0000') {
                    $('#alert_alert').show();
                    $(zhecengid).show();
                    if (!data['respmsg']) {
                        $('#alert_alert .alert_con_br').html(data['resperr']);
                    } else {
                        $('#alert_alert .alert_con_br').html(data['respmsg']);
                    }
                    if (error_func) {
                        error_func();
                    }
                } else {
                    // console.log('success---ing');
                    var return_data = data.data;
                    if(success_func){
                        success_func(return_data);
                    }                    
                    // $(zhecengid).hide();
                    // $('.load').hide();
                }
            },
            error: function(data) {
                $('#alert_alert').show();
                $(zhecengid).show();
                //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
                $('#alert_alert .alert_con_br').html('网络超时!');
            },
            complete: function() {
                $('#load_small_bg').hide();
                // $('#load_small_bg').hide();
            }
        });
    }
    return {
        ajax_rule: ajax_rule,
    };　
});
