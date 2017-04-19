define(function() {　
    // 初始化时间
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDate = now.getDate();
    // 数据初始化
    function formatYear(nowYear) {
        var arr = [];
        for (var i = 1970; i <= nowYear + 20; i++) {
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
            // if (i < 10) {
            //     i = '0' + i;
            // }
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
            // if (i < 10) {
            //     i = '0' + i;
            // }
            arr.push({
                id: i + '',
                value: i + '日'
            });
        }
        return arr;
    }
    var yearData = function(callback) {
        setTimeout(function() {
            callback(formatYear(nowYear))
        }, 0)
    }
    var monthData = function(year, callback) {
        setTimeout(function() {
            callback(formatMonth());
        }, 0);
    };
    var dateData = function(year, month, callback) {
        // if (month.substr(0, 1) == '0') {
        //     month = month.substr(1, 1);
        // }
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
        yearData: yearData,
        monthData: monthData,
        dateData: dateData,
        nowYear: nowYear,
        nowMonth: nowMonth,
        nowDate: nowDate,
    };　
});
