const SERVER_PATH = 'http://127.0.0.1:8080'


//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
function tip_box(str) {

    // 生成标签 效率低
    /* var tip_box = $('<div class="tip-box"></div>')
    $('body').append(tip_box);
    var tip_title=$('<div class="tip-title">温馨提示</div>')
    var p = $('<p>请输入正确的账号</p>')
    var cancel_box=$('<div class="cancel-box">知道了</div>')
    $('.tip_box').append(tip_title).append(p).append(cancel_box)
    console.log(tip_box); */
    $('.tip-box').css('display', 'flex')
    $('.tip-box > p').text(str)
    $('.cover').css('display', 'block')
}
// 提示动画 end


// 请求查看用户是否登录
async function isLogin() {
    var bool = false
    await $.ajax({
        type: "get",
        url: SERVER_PATH + "/user/status",
        // 跨域
        xhrFields: { withCredentials: true },
        success: (result) => {
            if (result.status != 0) {
                tip_box('发生了意外错误，请联系管理员。')
            } else if (result.data == null) {
                console.log(result.data)
                bool = true
            } else {
                console.log(result.data.name + "123")
                bool = true
                console.log(bool)
            }
        }
    });
    console.log(bool)
    return bool
}


$(function () {
    // 返回顶部按钮 start
    $(window).scroll(function () {
        if (window.scrollY > 500) {
            $('.back-btn').show();

        } else {
            $('.back-btn').hide();
        }
    })
    $('.back-btn').on('click', function () {
        $('body,html').animate({ scrollTop: 0 }, 500);
        return false;
    })
    // 返回顶部按钮 end


    // 提示动画 start
    // 关闭
    $('.cancel-box').on('click', function () {
        $('.tip-box').css('display', 'none')
        $('.cover').css('display', 'none')
    })



})