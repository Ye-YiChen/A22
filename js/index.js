$(function(){
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
    $('.logout-btn').on('click',function(){
        $.ajax({
            type: "get",
            url: SERVER_PATH + '',
            success: function (response) {
                if(response.status!=0){
                    tip_box(response.data.message)
                }else{
                    window.location.href='./login.html'
                }
            }
        });
    })
})