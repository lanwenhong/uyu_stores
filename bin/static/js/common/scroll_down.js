define(["zepto"], function($) {　
    var scrolldown_data = {
        body_height: $('body').height(),//方便在body的高度需要加载某些内容后会发生改变，导致计算错误，封装后，可以在调用js中修改值
        window_height: window.innerHeight, 
    };
    var timer_scroll,scroll_top_val=0;

    function GoTop() {
        scroll_top_val= Math.floor(scrolldown_data.body_height - scrolldown_data.window_height).toFixed(0);
        //console.log(scroll_top_val);
        timer_scroll = setInterval(runToTop, 20);
    }

    function runToTop(scroll_top) {
        scroll_top=scroll_top_val;
        //var scroll_top= Math.floor(scrolldown_data.body_height - scrolldown_data.window_height).toFixed(0);
        var top_val = document.documentElement.scrollTop || document.body.scrollTop;
        if(scroll_top<=0){
            return;
        }
        var speed = Math.ceil(scroll_top / 10);
        var now_top = top_val + speed;
        //console.log(now_top);
        if (now_top >= scroll_top) {
            clearInterval(timer_scroll);
            document.documentElement.scrollTop = now_top > scroll_top ? now_top : scroll_top;
            document.body.scrollTop = now_top > scroll_top ? now_top : scroll_top;
        } else {
            document.documentElement.scrollTop = now_top;
            document.body.scrollTop = now_top;
        }
    }    

    return {
        scrolldown_data:scrolldown_data,
        GoTop: GoTop,
    };　
});
