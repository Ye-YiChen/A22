$(function () {
    $('input').on('focus', function () {
        $(this).parent('label').css({
            'backgroundColor': 'rgba(255, 255, 255, .6)',
        })
    })
    $('input').on('blur', function () {
        $(this).parent('label').css({
            'backgroundColor': 'rgba(255, 255, 255, .35)',
        })
    })
    // 点击按钮 提交信息
    $('.login-btn').on('click', function () {
        var admin_name = $('#adminname').val()
        var admin_pwd = $('#pwd').val();

        if (!admin_name.length) {
            tip_box('账号不能为空')
            return false
        }
        if (!admin_pwd) {
            tip_box('密码不能为空')
            return false;
        }
        $.ajax({
            type: "get",
            url: "url",
            data: {
                'adminName': admin_name,
                'pwd': admin_pwd
            },
            success: function (response) {
                if(response.status!=0){
                    tip_box('意外错误，请联系管理员')
                    return false
                }else{
                    
                }
            }
        });
        return false
    })
    // 提示动画 start
    // 关闭
    $('.cancel-box').on('click', function () {
        $('.tip-box').css('display', 'none')
        $('.cover').css('display', 'none')
    })
    function tip_box(str) {
        $('.tip-box').css('display', 'flex')
        $('.tip-box > p').text(str)
        $('.cover').css('display', 'block')
    }
    // 提示动画 end
})