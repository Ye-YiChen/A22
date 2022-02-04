$(function () {
    const SERVER_PATH = "http://48c2385l00.qicp.vip"
    var leftTime = 60
    // 获取验证码
    $('.send-verify').on('click', function () {
        var phone = $('#phonenumber').val()

        if (phone.length != 11 || isNaN(phone) == true) {
            tip_box('手机号码有误')
            return false
        } else {
            // 按钮倒计时
            btn_count($(this))
            // 发送手机号数据
            get_otp(phone)
            // 发送成功提示
            tip_box('验证码发送成功')
        }
        return false
    })

    // 点击提交
    $('.register').on('click', function () {
        var phone = $('#phonenumber').val()
        var IDName = $('#IDname').val()
        var IDNumber = $('#IDnumber').val()
        var password = $('#password').val()
        var otp = $('#verification').val()
        var check = $('#register-agree').prop('checked')
        register(phone, IDName, IDNumber, password, otp,check)
        return false
    })

    // 已有账号直接跳转
    $('.login-box').on('click',function(){
        window.location.href='login.html'
    })

    // 信息提示
    $('#phonenumber').on('blur',function(){
        if (!$(this).val()) {
            $('.icon-cuowu').eq(0).css('display', 'flex').text('手机号不能为空')
            $('.icon-zhengque').eq(0).css('display', 'none')

        } else if ($(this).val().length != 11) {
            $('.icon-cuowu').eq(0).css('display', 'flex').text('手机号格式错误')
            $('.icon-zhengque').eq(0).css('display', 'none')
        }
        else {
            $('.icon-cuowu').eq(0).css('display', 'none')
            $('.icon-zhengque').eq(0).css('display', 'flex')
        }
    })
    $('#IDname').on('blur',function(){
        if (!$(this).val()) {
            $('.icon-cuowu').eq(1).css('display', 'flex').text('姓名不能为空')
            $('.icon-zhengque').eq(1).css('display', 'none')

        } else if (isNaN($(this).val()) == false) {
            $('.icon-cuowu').eq(1).css('display', 'flex').text('姓名格式错误')
            $('.icon-zhengque').eq(1).css('display', 'none')
        }
        else {
            $('.icon-cuowu').eq(1).css('display', 'none')
            $('.icon-zhengque').eq(1).css('display', 'flex')
        }
    })
    $('#IDnumber').on('blur',function(){
        if (!$(this).val()) {
            $('.icon-cuowu').eq(2).css('display', 'flex').text('身份证号不能为空')
            $('.icon-zhengque').eq(2).css('display', 'none')

        } else if ($(this).val().length != 11 && $(this).val().length != 18) {
            $('.icon-cuowu').eq(2).css('display', 'flex').text('身份证格式错误')
            $('.icon-zhengque').eq(2).css('display', 'none')
        }
        else {
            $('.icon-cuowu').eq(2).css('display', 'none')
            $('.icon-zhengque').eq(2).css('display', 'flex')
        }
    })
    $('#password').on('blur',function(){
        if (!$(this).val()) {
            $('.icon-cuowu').eq(3).css('display', 'flex').text('密码不能为空')
            $('.icon-zhengque').eq(3).css('display', 'none')

        }
        else {
            $('.icon-cuowu').eq(3).css('display', 'none')
            $('.icon-zhengque').eq(3).css('display', 'flex')
        }
    })
    $('#verification').on('blur',function(){
        if (!$(this).val()) {
            $('.icon-cuowu').eq(4).css('display', 'flex').text('验证码不能为空')
            $('.icon-zhengque').eq(4).css('display', 'none')

        }
        else {
            $('.icon-cuowu').eq(4).css('display', 'none')
            $('.icon-zhengque').eq(4).css('display', 'flex')
        }
    })



    function btn_count(btn) {
        // 禁用按钮
        btn.prop('disabled', 'true').text('剩余' + leftTime + '秒').css('backgroundColor', 'pink')
        var timer = setInterval(function () {
            if (leftTime == 0) {
                // 启用按钮
                btn.removeAttr("disabled").text('发送验证码').css('backgroundColor', '#EF4C53')
                clearInterval(timer)
                leftTime = 60
                return false
            }
            btn.text('剩余' + leftTime + '秒')
            leftTime--;
        }, 1000)
        return false
    }

    function get_otp(phone) {
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

    function register(phone, IDName, IDNumber, password, otp,check) {
        // 数据检验
        console.log();
        if (!otp.length) {
            tip_box('请先获取验证码')
            return false
        }
        if (phone.length != 11 || isNaN(phone) == true) {
            tip_box('请输入正确的手机号码')
            return false
        }
        if (isNaN(IDName) == false) {
            tip_box('请输入正确的姓名')
            return false
        }
        if (IDNumber.length != 18) {
            tip_box('请输入正确的身份证号')
            return false
        }
        if(!check){
            tip_box('请先已阅读并同意相关服务条款和隐私政策')
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
                    tip_box('注册成功')
                    return false;
                }
                window.location.href = "./login.html";
            }
        })
        return false
    }
    function tip_box(str) {
        $('.tip-box').css('display','flex')
        $('.tip-box > p').text(str)
        $('.cover').css('display','block')
    }
})