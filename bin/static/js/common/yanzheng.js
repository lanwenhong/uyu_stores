define(["native"], function(native) {
    function strIsNullUndefine(str) {
        if (str === null || str === undefined){
            return true;
        }
        return false;
    }

    function testPhone(id) {
        var val = $(id).val();
        var val_exp = /(^(\d{3,4}-)?\d{7,8})$|^1[0-9]{10}$/;
        if (!val_exp.test(val)) {
            native.alert({msg:"手机号不合法"}, function (cb) {
            });
            return;
        }
    }
    return {
        strIsNullUndefine:strIsNullUndefine,
        testPhone:testPhone

    };　
});
