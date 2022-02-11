// ajax动画 start
$(function(){
    $(document).on('ajaxStart',function(){
        $('.loader-box').css('display', 'block');
    })
    $(document).on('ajaxComplete',function(){
        $('.loader-box').css('display', 'none');
    })
})
// ajax动画 end