const SERVER_PATH = '47.113.180.139:90'

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
function tip_box(str) {
    $('.tip-box').addClass(['animate__animated', 'animate__bounceIn']).css('display', 'flex')
    $('.tip-box > p').text(str)
    $('.cover').css('display', 'block')
}
// 提示动画 end


// 请求查看用户是否登录
async function isLogin() {
    var bool = false
    await $.ajax({
        type: "get",
        url: SERVER_PATH + "/user/status?token=" + window.localStorage.getItem("token"),
        // 跨域
        xhrFields: { withCredentials: true },
        success: (result) => {
            if (result.status != 0) {
                tip_box(response.data.message)
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
    $('.back-ico').on('click', function () {
        window.location.href = './index.html'
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