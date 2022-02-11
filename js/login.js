$(function () {
    $('.login-btn').on('click', function () {
        var phoneNum = $('#username').val()
        var password = $('#password').val()
        login(phoneNum, password)
        return false
    })

    $('.register-btn').on('click', function () {
        window.location.href = 'register.html'
    })

    $('#username').on('blur', function () {
        if (!$(this).val()) {
            $('.icon-cuowu').eq(0).css('display', 'flex').text('账号不能为空')
            $('.icon-zhengque').eq(0).css('display', 'none')

        } else if ($(this).val().length != 11 && $(this).val().length != 18) {
            $('.icon-cuowu').eq(0).css('display', 'flex').text('账号格式错误')
            $('.icon-zhengque').eq(0).css('display', 'none')
        }
        else {
            $('.icon-cuowu').eq(0).css('display', 'none')
            $('.icon-zhengque').eq(0).css('display', 'none')
        }
    })

    $('#password').on('blur', function () {
        if (!$(this).val()) {
            $('.icon-cuowu').eq(1).css('display', 'flex').text('密码不能为空')
            $('.icon-zhengque').eq(1).css('display', 'none')
        }
        else {
            $('.icon-cuowu').eq(1).css('display', 'none')
            $('.icon-zhengque').eq(1).css('display', 'none')
        }
    })
    function login(phone, password) {
        // 验证
        if ((phone.length != 11 && phone.length != 18) || isNaN(phone) == true) {
            tip_box('请输入正确的账号')
            return false
        }
        if (!password) {
            tip_box('密码不能为空')
            return false;
        }
        $.ajax({
            type: "POST",
            url: SERVER_PATH + "/user/login",
            data: {
                "phone": phone,
                "password": password
            },
            xhrFields: { withCredentials: true },
            success: function (result) {
                if (result.status) {
                    alert(result.data.message);
                    return false;
                }
                window.location.href = "./index.html";
            }
        });
    }
    function tip_box(str) {
        $('.tip-box').css('display', 'flex')
        $('.tip-box > p').text(str)
        $('.cover').css('display', 'block')
    }
})
