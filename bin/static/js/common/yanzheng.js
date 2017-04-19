define(["native"], function(native) {
    function strIsNullUndefine(str) {
        if (str == null || str == undefined){
            return true;
        }
        return false;
    }

    function testPhone(id) {
        var val = $(id).val();
        var val_exp =  /^1[0-9]{10}$/;
        if (!val_exp.test(val)) {
            native.uyuAlert({msg:"手机号不合法"}, function (cb) {
            });
            return false;
        }
        return true;
    }

    function email_test(id) {
        var id_val = $(id).val();
        var id_test = /^[a-zA-Z0-9_\-\'\.]+@[a-zA-Z0-9_]+(\.[a-z]+){1,2}$/;
        if (!id_test.test(id_val)) {
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
