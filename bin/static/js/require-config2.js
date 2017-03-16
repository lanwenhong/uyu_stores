/**
 * Created by mac on 17/3/13.
 */
require.config({
    baseUrl:'../dist/js',
    shim:{
        'vue':{
            exports:'vue'
        }
    },
    paths:{
        'vue':'./libs/vue',
    },
});