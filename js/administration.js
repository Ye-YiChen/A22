$(function(){
    // 点击选择 效果
    $('.option > ul li').on('click',function(){
        $('#temp').trigger('click')
        $(this).addClass('current');
        $(this).siblings('li').removeClass('current');
    })

    // 点击退出登录
    $('#quit').on('click',function(){
        $.ajax({
            type: "method",
            url: "url",
            data: "data",
            dataType: "dataType",
            success: function (response) {
                if(response.status!=0){
                    tip_box(response.data.message)
                }else{
                    window.location.href='alogin.html'
                }
            }
        });
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