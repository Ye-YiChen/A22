$(function () {
    $('.show').on('click', function () {
        $(this).siblings().removeClass('choose');
        $(this).addClass('choose');
        $('#show-pro').slideDown();
        $('#add-pro').css({
            'display': 'none'
        })
    })
    $('.add').on('click', function () {
        $(this).siblings().removeClass('choose');
        $(this).addClass('choose');
        $('#show-pro').css({
            'display': 'none'
        })
        $('#add-pro').slideDown()
    })

    $('.common-set-btn').on('click', function () {
        $(this).siblings().removeClass('set-press');
        $(this).addClass('set-press');
        $('.special-set').css({
            'display': 'none'
        })
        $('.common-set').slideDown()
    })
    $('.special-set-btn').on('click', function () {
        $(this).siblings().removeClass('set-press');
        $(this).addClass('set-press');

        $('.special-set').slideDown();
        $('.common-set').css({
            'display': 'none'
        })
    })
    $('.add-pro-info').on('click', function () {
        var newEle = (`
            <li>
                <div class="set-name"><input type="text" placeholder="请输入设置名称"></div>
                <div class="set-detail"><input type="text" placeholder="请输入设置参数"></div>
            </li>
        `)
        $('.special-set').prepend(newEle)
    })
})