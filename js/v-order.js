new Vue({
    el: '#root',
    data() {
        return {
            user_id: '',
            orders: [
                {
                    order_id: '',
                    order_price: '10000.00',
                    order_time: '2022-02-11T07:51:29.000+00:00',
                    item_name: '产品名字',
                    item_id: '',
                    item_sum: 5,
                },
            ]
        }
    },
    mounted() {
        $.ajax({
            type: "get",
            url: SERVER_PATH + '/order/list?token=' + window.localStorage.getItem("token"),
            xhrFields: { withCredentials: true },
            success: (response) => {
                if (response.status != 0) {
                    tip_box(response.data.message)
                    return false
                }
                else {
                    for (let i = 0; i < response.data.length; ++i) {
                        this.orders[i].order_id = response.data[i].id
                        this.orders[i].order_price = response.data[i].orderPrice * response.data[i].amount
                        this.orders[i].order_time = response.data[i].orderTime
                        this.orders[i].item_name = response.data[i].itemName
                        this.orders[i].item_id = response.data[i].itemId
                        this.orders[i].item_sum = response.data[i].amount
                        if (i != response.data.length - 1) {
                            this.orders.push({})
                        }
                    }
                }
            }
        });
    },
    methods: {
        turnTab() {console.log(1);
            this.$refs.tt.classList.remove('current')
            this.$refs.ut.classList.remove('current')
            this.$refs.pt.classList.remove('current')
            this.$refs.at.classList.remove('current')
            this.$refs.ct.classList.remove('current')
            event.target.classList.add('current')
        },
        goDetail(order_id) {
            window.location.href = 'detail.html?order_id=' + order_id
        }
    },
    filters: {
        // 格式化時間
        formatDate(value) {
            var time = new Date(value)
            return (time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds());
        }
    },
})