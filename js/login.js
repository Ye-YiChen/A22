$(function () {
    const SERVER_PATH = "http://48c2385l00.qicp.vip"

    $('.login-btn').on('click', function () {
        var phoneNum = $('#username').val()
        var password = $('#password').val()
        login(phoneNum, password)
    })

    function login(phone, password) {
        // 验证
        if ((phone.length != 11 && phone.length != 18) || isNaN(phone) == true) {
            alert('手机号码有误')
            return false
        }
        if (!password) {
            alert("密码不能为空！");
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
})
