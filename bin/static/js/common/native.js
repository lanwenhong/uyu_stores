define(["jsbridge"], function(jsbridge) {　
    var JSBridge = jsbridge.JSBridge;

    var getUserIdFromObjC = function(data, cb) {
        JSBridge.H5CallNative({
            name: 'getUserIdFromObjC',
            data: data || {},
            callback: function(res) {
                cb(res)
            }
        })
    };

    var openUrl = function(data, cb) {
        JSBridge.H5CallNative({
            name: 'openUrl',
            data: data || {},
            callback: function(res) {
                cb(res)
            }
        })
    };

    var alert = function(data, cb) {
        JSBridge.H5CallNative({
            name: 'alert',
            data: data || {},
            callback: function(res) {
                cb(res)
            }
        })
    };

    return {
        alert:alert,
        openUrl:openUrl,
        getUserIdFromObjC: getUserIdFromObjC
    };　
});
