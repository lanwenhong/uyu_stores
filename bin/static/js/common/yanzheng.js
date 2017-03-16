define(function() {　

    function strIsNullUndefine(str) {
        if (str === null || str === undefined){
            return true;
        }
        return false;
    }
    //获取url的指定hash值
    function get_hash(hash_val) {
        var c_val;
        if (location.href.split('?').length < 2) {
            return false;
        }
        var url_l = location.href.split('?')[1].split('&');
        var url_l_l = url_l.length;
        for (var i = 0; i < url_l_l; i++) {
            var url_val = url_l[i].split('=');
            if (url_val[0] == hash_val) {
                c_val = url_val[1];
                return c_val;
            }
        }
    }
    //验证中文-----add_new
    function china_test(id, num1, num2) {
        var val = $(id).val();
        var val_exp = new RegExp("^[\u4e00-\u9fa5]{" + num1 + "," + num2 + "}$"); // /^[\u4e00-\u9fa5]{num1,num2}$/
        if (!val_exp.test(val)) {
            $(id).addClass('border_red');
        } else {
            $(id).removeClass('border_red');
        }
    }
    //验证手机号-----add_new
    function tel_test(id) {
        var val = $(id).val();
        var val_exp = /^1[0-9]{10}$/;
        if (!val_exp.test(val)) {
            $(id).addClass('border_red');
        } else {
            $(id).removeClass('border_red');
        }
    }
    //验证邮箱-----add_new
    function email_test(id) {
        var id_val = $(id).val();
        //var id_test = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/;
        var id_test = /^[a-zA-Z0-9_\-\'\.]+@[a-zA-Z0-9_]+(\.[a-z]+){1,2}$/;
        if (!id_test.test(id_val)) {
            $(id).addClass('error_tips');
        } else {
            $(id).removeClass('error_tips');
        }
    }
    //验证生日-----add_new
    function birth_test(id, num1, num2) {
        var val = $(id).val();
        var val_l = val.length;
        if (val_l <= num1 || val_l > num2) {
            $(id).addClass('border_red');
        } else {
            $(id).removeClass('border_red');
        }
    }
    //弹框高度定位----add_new
    function alert_top(id) {
        var alert_height = $(id).height();
        var mar_t = (alert_height / 2) - 20;
        $(id).css('marginTop', -mar_t + 'px');
    }
    //验证验证码6位数字-----add_new
    function code_test(id) {
        var val = $(id).val();
        var val_exp = /^[0-9]{6}$/;
        if (!val_exp.test(val)) {
            $(id).parents('dl').addClass('error_data');
        } else {
            $(id).parents('dl').removeClass('error_data');
        }
    }
    //验证法人姓名  验证企业姓名 验证详细地址、经营地址  收据显示名称  银行所在地 公司开户银行  开户名称
    function name_test(id, num1, num2) {
        var name_val = $(id).val() || $(id).text();
        if (name_val.length < num1 || name_val.length > num2 || !name_val.length) {
            $(id).parents('dl').addClass('error_data');
        } else {
            $(id).parents('dl').removeClass('error_data');
        }
    }

    //验证手机号-----add_new
    function tel_activity(id) {
        var val = $(id).val();
        var val_exp = /(^(0\d{2,3}(-){0,1}){1}\d{7,8})(-\d{3,5}){0,1}$|^1[0-9]{10}$/;
        //var val_exp=/^(0\\d{2,3}-\\d{7,8}(-\\d{3,5}){0,1})|(((13[0-9])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8})$/;
        if (!val_exp.test(val)) {
            $(id).parents('section').next('.remark').show().addClass('error_tips');
        } else {
            $(id).parents('section').next('.remark').hide().removeClass('error_tips');
        }
    }

    //验证填写价格不为空
    function numprice_test(id, num1, num2, price) {
        var name_val = $(id).val() || $(id).text();
        if (name_val - 0 > price) {
            $(id).addClass('error_tips');
        } else {
            if (name_val.length < num1 || name_val.length > num2 || !name_val.length) {
                $(id).addClass('error_tips');
            } else {
                $(id).removeClass('error_tips');
            }
        }
    }

    //验证手机号-----add_new
    function tel_test_all(id, error, seccuss) {
        var val = $(id).val();
        var val_exp = /(^(\d{3,4}-)?\d{7,8})$|^1[0-9]{10}$/;
        if (!val_exp.test(val)) {
            error(id);
        } else {
            seccuss(id);
        }
    }
    //验证验证码6位数字-----add_new
    function code_test_all(id, error, seccuss) {
        var val = $(id).val();
        var val_exp = /^[0-9]{6}$/;
        if (!val_exp.test(val)) {
            error(id);
        } else {
            seccuss(id);
        }
    }
    //验证中文-----add_new
    function china_test_all(id, num1, num2, error, seccuss) {
        var val = $(id).val();
        var val_exp = new RegExp("^[\u4e00-\u9fa5]{" + num1 + "," + num2 + "}$"); // /^[\u4e00-\u9fa5]{num1,num2}$/
        if (!val_exp.test(val)) {
            error(id);
        } else {
            seccuss(id);
        }
    }
    //验证是否有内容
    function detail_test_all(id, num1, num2, error, seccuss) {
        var name_val = $(id).val() || $(id).text();
        if (name_val.length < num1 || name_val.length > num2) {
            error(id);
        } else {
            seccuss(id);
        }
    }
    return {
        get_hash: get_hash,
        china_test: china_test,
        tel_test: tel_test,
        birth_test: birth_test,
        alert_top: alert_top,
        code_test: code_test,
        name_test: name_test,
        tel_activity: tel_activity,
        numprice_test: numprice_test,
        email_test: email_test,
        tel_test_all: tel_test_all,
        code_test_all: code_test_all,
        china_test_all: china_test_all,
        detail_test_all: detail_test_all,
        strIsNullUndefine:strIsNullUndefine,
    };　
});
