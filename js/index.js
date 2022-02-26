$(function () {

    $('.store').on('click', function () {
        window.location.href = "market.html"
    })
    $('.myorder').on('click', function () {
        window.location.href = "order.html"
    })
    $('.user').on('click', function () {
        // console.log($(this).text());
        if ($(this).text() == '登录/注册') {
            window.location.href = 'login.html'
            return false
        }
        return false
    })
    if($('.user').text()=='登录/注册'){
        $('.logout').hide()
    }
    $('.logout').on('click',  function () {
        console.log(1);
         $.ajax({
            type: "get",
            url: SERVER_PATH + "/logout?token=" + window.localStorage.getItem("token"),
            xhrFields: { withCredentials: true },
            success: (response) => {
                if (response.status != 0) {
                    tip_box(response.data.message)
                    return false
                }
                window.location.href = './login.html'
            }
        });

    })
})