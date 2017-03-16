define(["jquery", "mobile", "mobiscroll"], function($, mobile, mobiscroll) {　
    var date = function() {
        // 初始化插件内容——————add_new
        var opt_data = {
            preset: 'date', //日期格式 date（日期）|datetime（日期加时间）
            theme: 'jqm', //皮肤样式
            display: 'modal', //显示方式
            mode: 'clickpick', //日期选择模式
            dateFormat: 'yy-mm-dd', // 日期格式
            setText: '确定', //确认按钮名称
            cancelText: '取消', //取消按钮名籍我
            dateOrder: 'yymmdd', //面板中日期排列格式
            dayText: '日',
            monthText: '月',
            yearText: '年', //面板中年月日文字
            yearText: '年',
            monthText: '月',
            dayText: '日', //面板中年月日文字
            endYear: 2050, //结束年份
            showNow: true,
            nowText: '今天',
            hourText: '小时',
            minuteText: '分'
        };
        // 使用定义插件——————add_new
        $("#f_companydate").mobiscroll(opt_data);
    }

    return {
    	date:date
    };　
});
