define(function() {　
    //自定义时间
    var time_free = {
        start_year: -1,
        end_year: -1,
        start_num: -1,
        end_num: -1,
        month_long: -1, //默认显示1，2，3，否则01 02 03
        day_long: -1, //默认显示1，2，3，否则01 02 03
    };
    // 初始化时间
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDate = now.getDate();
    // 数据初始化
    function formatYear(nowYear) {
        var arr = [];
        for (var i = nowYear - 70; i <= nowYear + 70; i++) {
            arr.push({
                id: i + '',
                value: i + '年'
            });
        }
        return arr;
    }
    // 日期可控数据初始化
    function formatYear_birth(year_s, year_e) {
        //-1为默认值，则不自定义设计时间段
        var arr = [];
        for (var i = year_s; i <= year_e; i++) {
            arr.push({
                id: i + '',
                value: i + '年'
            });
        }
        return arr;
    }

    function formatMonth() {
        var arr = [];
        for (var i = 1; i <= 12; i++) {
            if (time_free.month_long != '-1') {
                if (i < 10) {
                    i = '0' + i;
                }
            }
            arr.push({
                id: i + '',
                value: i + '月'
            });
        }
        return arr;
    }

    function formatDate(count) {
        //console.log(count);
        var arr = [];
        for (var i = 1; i <= count; i++) {
            if (time_free.day_long != '-1') {
                if (i < 10) {
                    i = '0' + i;
                }
            }
            arr.push({
                id: i + '',
                value: i + '日'
            });
        }
        return arr;
    }
    var yearData = function(callback) {
        //-1为默认值，则不自定义设计时间段;如果为空，则调用默认的前后70年
        if (time_free.start_year == '-1' && time_free.end_year == '-1' && time_free.start_num == '-1' && time_free.end_num == '-1') {
            setTimeout(function() {
                callback(formatYear(nowYear))
            }, 0)
        } else {
            var year_s, year_e;
            if (time_free.start_year == '-1') {
                year_s = nowYear - time_free.start_num;
            } else {
                year_s = time_free.start_year;
            }
            if (time_free.end_year == '-1') {
                year_e = nowYear + time_free.end_num;
            } else {
                year_e = time_free.end_year;
            }
            setTimeout(function() {
                callback(formatYear_birth(year_s, year_e));
            }, 0)
        }

    }
    var monthData = function(year, callback) {
        setTimeout(function() {
            callback(formatMonth());
        }, 0);
    };
    var dateData = function(year, month, callback) {
        if (time_free.month_long != '-1') {
            if (month.substr(0, 1) == '0') {
                month = month.substr(1, 1);
            }
        }
        setTimeout(function() {
            if (/^3|5|7|8|10|12$/.test(month)) {
                //console.log(month);
                callback(formatDate(31));
            } else if (/^4|6|9|11$/.test(month)) {
                //console.log(month);
                callback(formatDate(30));
            } else if (/^1$/.test(month)) {
                //console.log(month);
                callback(formatDate(31));
            } else if (/^2$/.test(month)) {
                if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                    callback(formatDate(29));
                } else {
                    callback(formatDate(28));
                }
            } else {
                throw new Error('month is illegal');
            }
        }, 0);
        // ajax请求可以这样写
        /*
        $.ajax({
            type: 'get',
            url: '/example',
            success: function(data) {
                callback(data);
            }
        });
        */
    };

    return {
        time_free: time_free, //设置自定义年份
        yearData: yearData, //日期插件显示的对应时间
        monthData: monthData, //日期插件显示的对应时间
        dateData: dateData, //日期插件显示的对应时间
        nowYear: nowYear, //当前年份
        nowMonth: nowMonth, //当前月
        nowDate: nowDate, //当前天
    };　
});
