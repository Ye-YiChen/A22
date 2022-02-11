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
})