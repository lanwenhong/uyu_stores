define(["native"], function(native) {
    function strIsNullUndefine(str) {
        if (str == null || str == undefined || str === ''){
            return true;
        }
        return false;
    }

    function testPhone(phone) {
        var val_exp =  /^1[0-9]{10}$/;
        if (!val_exp.test(phone)) {
            native.uyuAlert({msg:"手机号不合法"}, function (cb) {
            });
            return false;
        }
        return true;
    }

    function email_test(str) {
        var id_test = /^[a-zA-Z0-9_\-\'\.]+@[a-zA-Z0-9_]+(\.[a-z]+){1,2}$/;
        if (!id_test.test(str)) {
            native.uyuAlert({msg:"邮箱地址不合法"}, function (cb) {
            });
            return false;
        }
        return true;
    }
    return {
        strIsNullUndefine:strIsNullUndefine,
        testPhone:testPhone,
        email_test:email_test

    };　
});
