$(function () {
    const SERVER_PATH = "http://48c2385l00.qicp.vip"
    var leftTime = 60
    // 获取验证码
    $('.send-verify').on('click', function () {
        var phoneNum = $('#phonenumber').val()
        // 按钮倒计时
        btn_count($(this))
        // 发送手机号数据
        get_otp(phoneNum)
        return false
    })

    // 点击提交
    $('.register').on('click', function () {
        var phone = $('#phonenumber').val()
        var IDName = $('#IDname').val()
        var IDNumber = $('#IDnumber').val()
        var password = $('#password').val()
        var otp = $('#verification').val()

        register(phone, IDName, IDNumber, password, otp)


    })

    function btn_count(btn) {
        // 禁用按钮
        btn.prop('disabled', 'true').text('剩余' + leftTime + '秒').css('backgroundColor', 'pink')
        var timer = setInterval(function () {
            if (leftTime == 0) {
                // 启用按钮
                console.log($(this));
                btn.removeAttr("disabled").text('发送验证码').css('backgroundColor', '#EF4C53')
                clearInterval(timer)
                leftTime = 60
                return false
            }
            btn.text('剩余' + leftTime + '秒')
            leftTime--;
        }, 1000)
    }

    function get_otp(phone) {
        if (phone.length != 11 || isNaN(phone) == true) {
            alert('手机号码有误')
            return false
        }
        $.ajax({
            type: "GET",
            url: SERVER_PATH + "/user/otp/" + phone,
            // data: {
            //     'phone': phone
            // },
            // 跨域
            xhrFields: { withCredentials: true },
            success: function (result) {
                if (result.status) {
                    console.log(result.data.message);
                    return false;
                }
            }
        })
    }

    function register(phone, IDName, IDNumber, password, otp) { 
        // 数据检验
        if (verification.length == 0) {
            alert('请先获取验证码')
            return false
        }
        if (phoneNum.length != 11 || isNaN(phoneNum) == true) {
            alert('手机号码有误')
            return false
        }
        if (isNaN(IDName) == false) {
            alert('姓名有误')
            return false
        }
        if (IDNumber.length != 18) {
            alert('身份证有误')
            return false
        }
        if (userName.length >= 20) {
            alert('用户名过长')
            return false
        }

        // 发送全部表单数据
        $.ajax({
            type: "POST",
            url: SERVER_PATH + "/user/register",
            data: {
                "phone": phone,
                'name': IDName,
                'ID': IDNumber,
                "otp": otp,
                "password": password,
            },
            xhrFields: { withCredentials: true },
            success: function (result) {
                if (result.status) {
                    console.log(result.data.message);
                    return false;
                }
                window.location.href = "./login.html";
            }
        })
        return false
    }
})