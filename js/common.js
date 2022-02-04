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
 
    // ajax动画 start
    $(document).on('ajaxStart',function(){
        $('.loader-box').css('display', 'block');
    })
    $(document).on('ajaxComplete',function(){
        $('.loader-box').css('display', 'none');
    })
    // ajax动画 end

    // 提示动画 start
    // 关闭
    $('.cancel-box').on('click',function(){
        $('.tip-box').css('display','none')
        $('.cover').css('display','none')
    })

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

})