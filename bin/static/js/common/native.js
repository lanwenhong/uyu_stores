define(["jsbridge"], function(jsbridge) {　
    var JSBridge = jsbridge.JSBridge;
    /**
 * alert
 * param: title 弹出框的标题
 *        msg   需要显示的消息
 *        btnName （可选）右边按钮标题，左边默认为取消
     * 返回值: ret OK代表成功
 */
    var alert = function(data, cb) {
            JSBridge.H5CallNative({
                name: 'alert',
                data: data || {},
                callback: function(res) {
                    cb(res)
                }
            })
        }
        /**
         * toast 提示框
         * param: msg   需要显示的消息
         * 返回值 ret  OK代表成功
         */
    var toast = function(data, cb) {
            JSBridge.H5CallNative({
                name: 'toast',
                data: data || {},
                callback: function(res) {
                    cb(res)
                }
            })
        }
        /**
         * close 关闭当前窗口
         * 返回值: ret OK代表成功
         */
    var close = function(data, cb) {
            JSBridge.H5CallNative({
                name: 'close',
                data: data || {},
                callback: function(res) {
                    cb(res)
                }
            })
        }
        /**
         * closeAll 关闭当前打开的所有web窗口
         * 返回值: ret OK代表成功
         */
    var closeAll = function(data, cb) {
            JSBridge.H5CallNative({
                name: 'closeAll',
                data: data || {},
                callback: function(res) {
                    cb(res)
                }
            })
        }
        /**
         * openUri 打开某功能
         * param: uri   打开的地址 http:// 或者hjsh://
         * 返回值: ret OK代表成功
         */
    var openUri = function(data, cb) {
            JSBridge.H5CallNative({
                name: 'openUri',
                data: data || {},
                callback: function(res) {
                    cb(res)
                }
            })
        }
        /**
         * getDevicesInfo 获取设备各种信息
         * 返回值:  ret OK代表成功
                   os   iOS android ..
                   phonemodel   手机型号 iPhone 6
                   network  网络状况 WIFI 4G 3G 2G NO 安卓上无法判断可返回接入点cmwap
                   appname  hjsh
                   appver   1.3.6
                   udid 设备唯一编号
         */
    var getDeviceInfo = function(data, cb) {
            JSBridge.H5CallNative({
                name: 'getDeviceInfo',
                data: data || {},
                callback: function(res) {
                    cb(res)
                }
            })
        }
        /**
         * getLocation 获取当前经纬度
         * param: type(可选）经纬度标准WGS84，GCJ02，BD09
         * 返回值: ret OK代表成功
                  longitude 经度180~-180 字符串
                  latitude  纬度 90~-90 字符串
                  type  同上
         */
    var getLocation = function(data, cb) {
            JSBridge.H5CallNative({
                name: 'getLocation',
                data: data || {},
                callback: function(res) {
                    cb(res)
                }
            })
        }
        /**
         * setNavTitle 设置标题显示,以及标题栏颜色
         * param: title 需要显示的消息
                  color (可选)字体颜色6位标准RGB如#FFFFFF
                  bgcolor   (可选)背景颜色6位标准RGB如#FFFFFF
         * 返回值: ret OK代表成功
         */
    var setNavTitle = function(data, cb) {
            JSBridge.H5CallNative({
                name: 'setNavTitle',
                data: data || {},
                callback: function(res) {
                    cb(res)
                }
            })
        }
        /**
         * setNavBack 设置标题栏返回按钮功能
         * param: type 功能的类型 目前有default（原始状态），uri
                  uri   (如果type=uri)URL或者原生界面代码
         * 返回值: ret OK代表成功
         */
    var setNavBack = function(data, cb) {
            JSBridge.H5CallNative({
                name: 'setNavBack',
                data: data || {},
                callback: function(res) {
                    cb(res)
                }
            })
        }
        /**
         * setNavMenu 设置右上角菜单
         * param: menus 所有菜单的集合[]
                    type    类型uri
                    uri (type=uri)URL或者原生界面代码
                    icon    (可选）icon地址
                    title   菜单标题
                  buttons   所有导航栏按钮的集合[]
                    type    类型uri
                    uri (type=uri)URL或者原生界面代码
                    icon    (可选）icon地址
                    title   (可选）菜单标题
         * 返回值: ret OK代表成功
         */
    var setNavMenu = function(data, cb) {
            JSBridge.H5CallNative({
                name: 'setNavMenu',
                data: data || {},
                callback: function(res) {
                    cb(res)
                }
            })
        }
        /**
         * scanQrcode 扫描二维码获取内容
         * 返回值: ret OK代表成功
                  qrcode    二维码内容
         */
    var scanQrcode = function(data, cb) {
            JSBridge.H5CallNative({
                name: 'scanQrcode',
                data: data || {},
                callback: function(res) {
                    cb(res)
                }
            })
        }
        /**
         * share 打开分享界面，主要是网页分享
         * param: title 分享标题
                  desc 分享描述
                  url   网页地址
                  icon  (可选）分享描述，可用默认值
         */
    var share = function(data, cb) {
        JSBridge.H5CallNative({
            name: 'share',
            data: data || {},
            callback: function(res) {
                cb(res)
            }
        })
    }


    /**
     *功能： 关闭所有页面并调到指定页面
     * uri: 需要跳到的页面
     */
    var navToUri = function (data, cb) {
        JSBridge.H5CallNative({
            name: 'navToUri',
            data: data || {},
            callback: function(res) {
                cb(res)
            }
        })
    };
    /**
     * 功能:   notify注册/发送通知
     * param: param   type: register || post
     * 返回值: ret OK代表成功
     */
    var webNotify = function(data, cb) {
        JSBridge.H5CallNative({
            name: 'webNotify',
            data: data || {},
            callback: function(res) {
                cb(res)
            }
        })
    };


    //module.exports = JSBridge
    return {
        alert: alert,
        toast: toast,
        close: close,
        closeAll: closeAll,
        openUri: openUri,
        getDeviceInfo: getDeviceInfo,
        getLocation: getLocation,
        setNavTitle: setNavTitle,
        setNavBack: setNavBack,
        setNavMenu: setNavMenu,
        scanQrcode: scanQrcode,
        share: share,
        navToUri: navToUri,
        webNotify: webNotify
    };　
});
