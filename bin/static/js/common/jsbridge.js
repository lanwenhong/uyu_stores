define(function() {
    var actionQueue = [];
    var objcCallQueue = [];
    var JSBridge = {
        H5CallNative: function(param) {
            // 环境还未准备好,bridge 还未注入,H5跟 Native还不能交互,放进队列中
            actionQueue.push(param);
        },
        NativeCallH5:function (param) {
            objcCallQueue.push(param);
        }

    }

    var isAndroid = function() {
        var ua = navigator.userAgent
        return (/Android/i).test(ua)
    }
    var isIos = function () {
        var ua = navigator.userAgent
        return (/Mac OS X/i).test(ua)
    }

    // IOS
    function setupWebViewJavascriptBridge(callback) {
        // console.log('-> setupWebViewJavascriptBridge run...')
        if (window.WebViewJavascriptBridge) {
            // console.log('-> setupWebViewJavascriptBridge is 注入...')
            return callback(window.WebViewJavascriptBridge)
        }
        if (window.WVJBCallbacks) {
            // console.log('-> WVJBCallbacks push callback...')
            return window.WVJBCallbacks.push(callback)
        }
        window.WVJBCallbacks = [callback]
        var WVJBIframe = document.createElement('iframe')
        WVJBIframe.style.display = 'none'
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
        document.documentElement.appendChild(WVJBIframe)
        setTimeout(function() {
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
    }

    // Android
    function connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(window.WebViewJavascriptBridge)
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function() {
                callback(window.WebViewJavascriptBridge)
            }, false)
        }
    }

    if (isAndroid()) {
        connectWebViewJavascriptBridge(callback)
    } else {
        setupWebViewJavascriptBridge(callback)
    }

    function callback(bridge) {

        if (isAndroid()) {
            bridge.init(function(message, responseCallback) {
                // console.log('JS got a message', message)
                var data = { 'Javascript Responds': 'Wee!' }
                // console.log('JS responding with', data)
                responseCallback(data)
            })
        }

        /**
         * H5 调 Native事件 H5CallNative
         * @param  {[object]} param [description]
         * param.data：传给 Native参数
         * param.callback：Native回调(异步？)
         * @return {[type]}       [description]
         */
        JSBridge.H5CallNative = function(param) {
            bridge.callHandler(param.name, param.data, function(response) {
                param.callback && param.callback(response)
            })
        }

        JSBridge.NativeCallH5 = function (param) {
            bridge.registerHandler(param.name, function (data, responseCallback) {
                param.callback && param.callback(data);
                responseCallback({ret:"OK"});
            });
        }


        // 执行环境未准备好之前的事件队列
        runActionQueue();
        runNativeCallQueue();
    }

    // 执行环境未准备好之前的事件队列
    function runActionQueue() {
        for (var index in actionQueue) {
            JSBridge.H5CallNative(actionQueue[index])
        }
    }

    function runNativeCallQueue() {
        for (var index in objcCallQueue) {
            JSBridge.NativeCallH5(objcCallQueue[index])
        }
    }

    return {
        JSBridge: JSBridge,
    };
});
