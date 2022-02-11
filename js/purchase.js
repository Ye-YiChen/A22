$(function () {
    // 检测是否登录
    if(!isLogin()){
        tip_box('请先登录')
        $('.cancel-box').on('click', function () {
            window.location.href='./login.html'
        })
        return false
    }
    var id = getUrlParam('id')
    console.log(id);
    // 点击购买按钮
    $('.purchase-btn').on('click', function () {
        var amount = $('.num-input').val();
        console.log(id);
        // 提示说明检测
        if ($('.mind').text() != $('.type').val()) {
            tip_box('请完整输入风险提示说明')
            return false

        }
        // 购买数量检测 
        else if (amount == '' || amount == '0') {
            tip_box('购买数量不能为0')
            return false
        }
        // 发送信息   
        else {
            $.ajax({
                type: "post",

                url: SERVER_PATH + '/order/create',
                data: {
                    'itemId': id,
                    'amount': amount
                },
                xhrFields: { withCredentials: true },
                success: function (response) {
                    if (response.status != 0) {
                        tip_box('发生了意外错误，请联系管理员。')
                        return false
                    }
                    tip_box('购买成功！')
                    $('.cancel-box').on('click', function () {
                        window.location.href='./detail.html?id='+id
                    })
                    return false
                }
            });
        }
    })

    // 点击复制按钮
    $('.tip').on('click', function () {
        $('.type').val($('.mind').text())
    })
})