define(["zepto"], function($) {　
    //滚动下拉-------start--------------------------------------------------------
    var scroll_data = {
        timer_rt: null, //清空定时器=参数
        scroll_if: false, //是否再次进行数据加载,默认false不加载
        nomor_show: false, //控制 没有更多数据了的 提示 是否显示，默认false不出现
        body_height: $('body').height(),
        load_img: '<div class="load"></div>', //加载动画图标
        nomore_word: '<div class="nomoredata" id="nomoredata"></div>',//加载到最后的提示
    };
    // console.log(scroll_data.scroll_if);
    var window_height = window.innerHeight;
    // console.log(window_height);
    // console.log(scroll_data.body_height); 
    //ajax规则
    function scroll_more(more_data) {
        $(window).on('scroll', function(e) {
            // console.log(scroll_if); 
            //var history_top = $(document).scrollTop();
            //console.log(history_top); 
            var history_top = document.documentElement.scrollTop || document.body.scrollTop;
            //console.log('document.documentElement.scrollTop--'+document.documentElement.scrollTop);
            console.log('document.body.scrollTop--'+history_top);
            console.log(scroll_data.body_height - window_height);
            if (history_top < scroll_data.body_height - window_height) {
                clearTimeout(scroll_data.timer_rt);
            } else {
                e.stopPropagation();
                if (scroll_data.scroll_if) {
                    $('.load').show();
                    scroll_data.scroll_if = false;
                    scroll_data.timer_rt = window.setTimeout(more_data, 2000);
                }
                if (scroll_data.nomor_show) {
                    nomoredata_show();
                    window.setTimeout(nomoredata_hide, 2000);
                    scroll_data.nomor_show = false;
                }
                // console.log('scroll:scroll_if==' + scroll_data.scroll_if);
                // console.log('scroll:nomor_show==' + scroll_data.nomor_show);
            }
        });
    }
    
    //加载图标和文字提示 添加在页面中，并可以修改加载提示文字-----必须单独引入到页面
    function add_load_img(id,text){
        //id为需要将加载图标和没有信息时的提示添加在的div，text用来重新设置加载到最后的文字提示，如果没有text则用默认的文字显示
        $(id).append(scroll_data.load_img);
        $(id).append(scroll_data.nomore_word);
        if(text){
            $('#nomoredata').text(text);
        }else{
            $('#nomoredata').text('没有更多数据了');
        }
    }
    
    //提示文字隐藏动画
    function nomoredata_hide() {
        $("#nomoredata").animate({ opacity: 0, }, 500, 'ease-out');
    }
    
    //提示文字显示动画 
    function nomoredata_show() {
        $("#nomoredata").animate({ opacity: 0.7, }, 500, 'ease-out');
    }


    return {
        scroll_more: scroll_more,
        nomoredata_hide: nomoredata_hide,
        nomoredata_show: nomoredata_show,
        scroll_data: scroll_data,
        add_load_img: add_load_img,
    };　
});
