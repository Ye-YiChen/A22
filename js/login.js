$(function () {
    $('.login-btn').on('click', function () {
        if(($('#username').prop('value').length != 11) && $('#username').prop('value').length!=18){
            alert('请输入正确的用户名')
        }


        // 发送用户验证
        /* $.post("url", $('#login').serialize(),
            function (data, textStatus, jqXHR) {
                if(textStatus==200){
                    window.location.href=''
                }
            },
        ); */
    })
})