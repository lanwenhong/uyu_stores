define(function() {　
    //设置数据
    function set_storage() {
        $('.js_storage').each(function(i, item) {
            var key = $(this).attr('name');
            var key_val = $(this).val();
            localStorage.setItem(key, key_val);
        });
    }
    //获取数据
    function get_storage(callback) {
        $('.js_storage').each(function(i, item) {
            var key_if = $(this).attr('name');
            var key;
            if(key_if==null){
                key=$(this).attr('data-name');
            }else{
                key = $(this).attr('name');
            }
            var key_val = localStorage.getItem(key);
            if (!key_val) {
                return true;
            }
            if(key_if==null){
                $(this).text(key_val);
            }else{
                $(this).val(key_val);
            }            
        });
        if (callback) {
            callback();
        }
    }
    //清空数据
    function clear_storage() {
        localStorage.clear();
    }
    //清空指定数据值
    function clean_storage(data) { //data是个包含数据属性名称的数组
        $(data).each(function(i, item) {
            var key = data[i];
            localStorage.setItem(key, '');
        });
    }
    //获取指定数据值
    function getone_storage(val) {
        return localStorage.getItem(val);
    }
    //设置指定数据值
    function setone_storage(key, key_val) {
        localStorage.setItem(key, key_val);
    }

    //获取指定数据组
    function get_data_all(ajax_data) {
        var data_all = {};
        $(ajax_data).each(function(i, item) {
            var key = ajax_data[i];
            var key_val = localStorage.getItem(key);
            if (!key_val) {
                return true;
            }
            data_all[key] = key_val;
        });
        return data_all;
    }

    return {
        set_storage: set_storage,
        get_storage: get_storage,
        clear_storage: clear_storage,
        clean_storage: clean_storage,
        getone_storage: getone_storage,
        setone_storage: setone_storage,
        get_data_all: get_data_all,
    };　
});
