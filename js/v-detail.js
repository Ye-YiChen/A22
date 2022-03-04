new Vue({
    el: '#root',
    data() {
        return {
            id: '',
            item: {
                "id": "20220226000000000005",
                "userId": 19081860,
                "itemId": 1,
                "itemName": null,
                "orderPrice": 100000.00,
                "num": 3.33,
                "amount": 3,
                "orderTime": "2022-02-26T11:59:49.000+00:00",
                "numTime": "2022-03-01T11:17:16.000+00:00",
                "term": 180,
                "risk": "中风险"
            }
        }
    },
    computed: {
    },
    mounted() {
        // 未登录返回
        // if(!isLogin()){
        //     // window.location.href='./login.html'
        // }

        this.id = getUrlParam('order_id')

        // 信息获取
        $.ajax({
            type: "get",
            url: SERVER_PATH + '/order/detail/' + this.id,
            success: function (response) {
                if (response.status != 0) {
                    tip_box(response.data.message)
                    return false
                } else {
                    this.item = response.data
                }
            }
        })
    },
    methods: {
        returnIndex() {
            window.location.href = './index.html'
        }
    },
    filters: {
        dateFormat(value, addDay) {
            function size2(value) {
                if (value < 10) {
                    value = "0" + value
                }
                return value
            }
            var time = new Date(value)
            if (addDay) {

                time = time.setDate(time.getDate() + addDay)
                time = new Date(time)
            }
            return time.getFullYear(1) + "-" + size2((Number(time.getMonth()) + 1)) + "-" + size2(time.getDate()) + " " + size2(time.getHours()) + ":" + size2(time.getSeconds())
        }
    }
})