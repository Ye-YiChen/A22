new Vue({
    el: '#acount-info',
    data() {
        return {
            pro_name: '月月放心买，第1季度第1期XXXXXXXXXXXX',
            acount_num: '622800007077',
            acount_money: 99.99
        }
    },
    filters: {
        // 账户 中间加 *号
        secret: function (value) {
            if (!value) return ''
            return value.substr(0, 4) + '****' + value.substr(8, 4)
        }
    }
})
new Vue({
    el: '#product-info',
    data() {
        return {
            pr_info: [
                {
                    info_name: '可购额度',
                    info_detail: '剩余10000份',
                    id:001,
                },
                {
                    info_name:'单笔金额',
                    info_detail:'10000元',
                    id:002
                }
            ]
        }
    },
})