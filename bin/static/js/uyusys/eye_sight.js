/**
 * Created by mac on 17/3/15.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule"],function($, ajax_rule){
        $(document).ready(function() {

            // var lastX, lastXForMobile;
            // // 用于记录被按下的对象
            // var pressedObj;  // 当前左滑的对象
            // var lastLeftObj; // 上一个左滑的对象
            // // 用于记录按下的点
            // var start;
            // // 网页在移动端运行时的监听
            // alert("kkkkkk");
            // document.getElementsByClassName(".eye_sight")[0].addEventListener('touchstart', function(event){
            //     alert("dddd");
            //         lastXForMobile = e.changedTouches[0].pageX;
            //         pressedObj = this; // 记录被按下的对象
            //         // 记录开始按下时的点
            //         var touches = event.touches[0];
            //         start = {
            //             x: touches.pageX, // 横坐标
            //             y: touches.pageY  // 纵坐标
            //         };
            //     });
            // document.getElementsByClassName(".eye_sight")[0].addEventListener('touchmove',function(event){
            //         // 计算划动过程中x和y的变化量
            //     var touches = event.touches[0];
            //     delta = {
            //         x: touches.pageX - start.x,
            //         y: touches.pageY - start.y
            //     };
            //     // 横向位移大于纵向位移，阻止纵向滚动
            //     if (Math.abs(delta.x) > Math.abs(delta.y)) {
            //         event.preventDefault();
            //     }
            // });
            // document.getElementsByClassName(".eye_sight")[0].addEventListener('touchend', function(event){
            //     if (lastLeftObj && pressedObj != lastLeftObj) { // 点击除当前左滑对象之外的任意其他位置
            //         $(lastLeftObj).animate({marginLeft:"0"}, 500); // 右滑
            //         lastLeftObj = null; // 清空上一个左滑的对象
            //     }
            //     var diffX = e.changedTouches[0].pageX - lastXForMobile;
            //     if (diffX < -150) {
            //         $(pressedObj).animate({left:"-4rem"}, 500); // 左滑
            //         lastLeftObj && lastLeftObj != pressedObj &&
            //         $(lastLeftObj).animate({left:"0"}, 500); // 已经左滑状态的按钮右滑
            //         lastLeftObj = pressedObj; // 记录上一个左滑的对象
            //     } else if (diffX > 150) {
            //         if (pressedObj == lastLeftObj) {
            //             $(pressedObj).animate({left:"0"}, 500); // 右滑
            //             lastLeftObj = null; // 清空上一个左滑的对象
            //         }
            //     }
            // });

            
            var page = 1;

            $('.eye_sight_delete').on('click', function () {
                alert("dddddvvvv");
                var listReq = {
                    page: ''+page,
                    maxnum: '10'
                };
                ajax_rule.ajax_rule('/store/v1/api/eyesight_list', 'GET', 'json', listReq, '.zheceng', function (respData) {
                    page = page + 1;
                    alert(JSON.stringify(respData));
                });
            })


        });
    });
});