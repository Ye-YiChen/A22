$(function(){
    const SERVER_PATH = "http://48c2385l00.qicp.vip"
    $.ajax({
        type: "get",
        url: SERVER_PATH+"/user/status",
         // 跨域
         xhrFields: { withCredentials: true },
        success: function (result) {
            $(this).text(result.data.username)
        }
    });
    $('.store').on('click',function(){
        window.location.href="market.html"
    })
    $('.myorder').on('click',function(){
        window.location.href="order.html"
    })
    $('.user').on('click',function(){
        // console.log($(this).text());
        if($(this).text()=='登录/注册'){
            window.location.href='login.html'
            return false
        }
        return false
    })
})