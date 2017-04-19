$(document).ready(function(){
   console.log('debug .....');
   var post_data = {};
   //post_data.mobile = '13475481254';
   //post_data.new_password = 'e10adc3949ba59abbe56e057f20f883e';
   //post_data.old_password = '123456';

   post_data.mobile = '13802438733';
   post_data.new_password = '36a4b33e6e62a1370e3a17f1ec31a6d6';
   post_data.old_password = '123456';
   $.ajax({
       url: '/store/v1/api/login',
       type: 'POST',
       dataType: 'json',
       data: post_data,
       success: function(data) {
           var respcd = data.respcd;
           if(respcd != '0000'){
               var resperr = data.resperr;
               var respmsg = data.resmsg;
               var msg = resperr ? resperr : resmsg;
               console.log(msg);
           } else {
               var userid = data.data.userid;
               console.log(userid);
               console.log(data.data);
               window.localStorage.setItem('userid', userid);
           }
       },
       error: function(data) {
           console.log('except ...');
       },
   });

   // get__data();
   // post__data();
});


function get__data(){
    var get_data = {}
    get_data.se_userid = '1254';
    get_data.phone_num = '13475481257'
    // get_data.page = 1;
    // get_data.maxnum = 10;

    // var url = '/store/v1/api/eyesight_list';
    // var url = '/store/v1/api/device_list';
    // var url = '/store/v1/api/store_allocate_list';
    // var url = '/store/v1/api/settle_list';
    var url = '/store/v1/api/eyesight';

   $.ajax({
       url: url,
       type: 'GET',
       dataType: 'json',
       data: get_data,
       success: function(data) {
           var respcd = data.respcd;
           if(respcd != '0000'){
               var resperr = data.resperr;
               var respmsg = data.resmsg;
               var msg = resperr ? resperr : resmsg;
               console.log(msg);
           } else {
               console.log(data);
               var info = data.data;
               console.log(info);
           }
       },
       error: function(data) {
           console.log('get data except ...');
       },
   });
}


function post__data(){
    var post_data = {};
    post_data.se_userid = '1254';
    post_data.userid = '1219';

    var url = '/store/v1/api/eyesight';
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: post_data,
        success: function(data) {
            var respcd = data.respcd;
            if(respcd != '0000'){
                var resperr = data.resperr;
                var respmsg = data.resmsg;
                var msg = resperr ? resperr : resmsg;
                console.log(msg);
            } else {
                console.log(data);
            }
        },
        error: function(data) {
            console.log('post data except ...');
        },
    });
}
