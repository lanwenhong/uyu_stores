define(["jsbridge"], function(jsbridge) {
    var JSBridge = jsbridge.JSBridge;

    var getUserIdFromObjC = function(data, cb) {
        JSBridge.H5CallNative({
            name: 'getUserIdFromObjC',
            data: data || {},
            callback: function(res) {
                cb(res)
            }
        });
    };

    var openUrl = function(data, cb) {
        JSBridge.H5CallNative({
            name: 'openUrl',
            data: data || {},
            callback: function(res) {
                cb(res)
            }
        });
    };

    var uyuLog = function(data, cb) {
        JSBridge.H5CallNative({
            name: 'uyuLog',
            data: data || {},
            callback: function(res) {
                cb(res)
            }
        });
    };
    var getDeviceInfo = function(data, cb) {
        JSBridge.H5CallNative({
            name: 'getDeviceInfo',
            data: data || {},
            callback: function(res) {
                cb(res)
            }
        });
    };


    var openUrl = function(data, cb) {
        JSBridge.H5CallNative({
            name: 'openUrl',
            data: data || {},
            callback: function(res) {
                cb(res)
            }
        });
    };

    var addRightBtn = function(data, cb) {
        JSBridge.H5CallNative({
            name: 'addRightBtn',
            data: data || {},
            callback: function(res) {
                cb(res)
            }
        });
    };

    var updateCurrentView = function (cb) {
        JSBridge.NativeCallH5({
            name:"updateCurrentView",
            callback:function (res) {
                cb(res);
            }
        });
    };
    var pullUpRefresh = function (cb) {
        JSBridge.NativeCallH5({
            name:"pullUpRefresh",
            callback:function (res) {
                cb(res);
            }
        });
    };

    var regNativeCallJS = function (callJsName, cb) {
        JSBridge.NativeCallH5({
            name:callJsName,
            callback:function (res) {
                cb(res);
            }
        });
    };

    var regNotifiaction = function(data, cb) {
        JSBridge.H5CallNative({
            name: 'regNotifiaction',
            data: data || {},
            callback: function(res) {
                cb(res)
            }
        });
    };

    var postNotifiaction = function(data, cb) {
        JSBridge.H5CallNative({
            name: 'postNotifiaction',
            data: data || {},
            callback: function(res) {
                cb(res)
            }
        });
    };

    return {
        getDeviceInfo:getDeviceInfo,
        uyuLog:uyuLog,
        alert:alert,
        addRightBtn:addRightBtn,
        openUrl:openUrl,
        getUserIdFromObjC:getUserIdFromObjC,
        updateCurrentView:updateCurrentView,
        pullUpRefresh:pullUpRefresh,
        regNativeCallJS:regNativeCallJS,
        regNotifiaction:regNotifiaction,
        postNotifiaction:postNotifiaction
    };
});
