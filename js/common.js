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
})