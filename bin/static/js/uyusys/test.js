$(document).ready(function(){
   console.log('debug .....');
   var post_data = {};
   post_data.mobile = '17889807865';
   post_data.password = '807865';
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
               window.localStorage.setItem('userid', userid);
           }
       },
       error: function(data) {
           console.log('except ...');
       },
   });

   get__data();
});


function get__data(){
    var get_data = {}
    get_data.se_userid = '1203';
    get_data.page = 1;
    get_data.maxnum = 10;

    // var url = '/store/v1/api/eyesight_list';
    var url = '/store/v1/api/device_list';
    // var url = '/store/v1/api/store_allocate_list';

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
