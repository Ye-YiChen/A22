


// 控制主体
new Vue({
    el: '#product',
    data() {
        return {
            id: 0,
            pageType: '',
            product: {
                "id": 1,
                "name": "易方达",
                "num": 3.33,
                "info": "近一年增长率",
                "intro": "6个月定期存款",
                "price": 100000.00,
                "sales": 666,
                "limited": 10,
                "stock": 994,
                "term": 180,
                "risk": "中风险",
                "startTime": "2022-02-09T16:00:00.000+00:00",
                "endTime": "2026-08-15T06:28:00.000+00:00",
                "numTime": "2022-03-01T11:17:16.000+00:00",
                "state": 1,
                "status": null
            }

        }
    },
    methods: {
        slide(el_name) {
            var ruleBox = this.$refs[el_name]
            $(ruleBox).stop().slideToggle(250)
            event.target.classList.toggle('rotateDown')
            event.target.classList.toggle('rotateUp')
        },

    },
    mounted() {
        this.id = getUrlParam('id'); // 获取产品id
        this.pageType = getUrlParam("type")
        $.ajax({
            type: "get",
            url: SERVER_PATH + "/item/detail/" + this.id, // 请求地址
            xhrFields: { withCredentials: true },
            data: {
                'id': this.id
            },
            success: (response) => {
                if (response.status != 0) {
                    tip_box(response.data.message)
                }
                else {
                    this.product = response.data
                }
            }
        });

    },
    filters: {

        dateFormat(value, addDay) {
            function size2(value) {
                if(value<10){
                    value="0"+value
                }
                return value
            }
            var time = new Date(value)
            return time.getFullYear(1) + "-" + size2((Number(time.getMonth()) + 1)) + "-" + size2(time.getDate()) + " " + size2(time.getHours()) + ":" + size2(time.getSeconds())
        }
    },
    watch: {
        pageType() {
            console.log(this.pageType);
            if (this.pageType == "loan") {
                console.log(1);
                document.querySelector('.pro-type').innerHTML = "贷款产品"
            }
            else if (this.pageType == "store") {
                document.querySelector('.pro-type').innerHTML = "存款产品"

            } else {
                // console.log(1);
                document.querySelector('.pro-type').innerHTML = this.type

            }
        }
    }
})
// 控制底部
new Vue({
    el: '#footer',
    data() {
        return {
            id: 0,
            state: 0, // 产品状态 0 => 预定中 1 => 购买中 2 => 售罄  
            hour_l: 0,
            minute_l: 0,
            second_l: 10,
            pro_left: 10000,// stock
            timer: null
        }
    },
    computed: {
        timer: ''
    },
    methods: {
        tip_box(str) {
            $('.tip-box').css('display', 'flex')
            $('.tip-box > p').text(str)
            $('.cover').css('display', 'block')
        },
        press() {
            if (this.state == 0) {
                return false
            }
            if (this.state == 1) {
                window.location.href = './purchase.html?id=' + this.id //购买地址跳转
                return false
            }
            if (this.state == 2) {
                return false
            }
            this.tip_box(response.data.message)
            return false
        },
        // 查询指定产品数量并更新商品状态
        queryProduct(id) {
            $.ajax({
                type: "get",
                url: SERVER_PATH + "/item/detail/" + this.id,  // 请求产品剩余数量
                data: {
                    'id': this.id
                },
                success: (response) => {
                    this.pro_left = response.data.stock
                    this.state = response.data.state
                }
            });
        },
        // 查询时指定产品时间并更新
        queryTime(id, method) {
            // method 0 查询开始时间 1 否则查询结束时间
            $.ajax({
                type: "get",
                url: SERVER_PATH + "/item/detail/" + this.id, // 请求产品临期时间
                data: {
                    'id': id
                },
                success: (response) => {
                    if (method == 0) {
                        // 开始时间
                        var Time = dayjs(response.data.startTime)
                    } else {
                        // 结束时间
                        var Time = dayjs(response.data.endTime)

                    }
                    var diffTime = Time.diff(dayjs())
                    this.second_l = parseInt(diffTime / 1000 % 60)
                    this.minute_l = parseInt(diffTime / 1000 / 60 % 60)
                    this.hour_l = parseInt(diffTime / 1000 / 60 / 60)
                }
            });
        }

    },
    mounted() {
        this.id = getUrlParam('id'); // 获取产品id
        this.queryProduct(this.id)
        this.queryTime(this.id, 0)
        this.timer = setInterval(() => {
            if (this.state == 1) {
                clearInterval(this.timer)
            }
            if (this.hour_l <= 0 && this.second_l <= 0 && this.minute_l <= 0) {
                if (this.state == 0) {
                    this.state = 1
                    clearInterval(this.timer)
                }
                clearInterval(this.timer)
                return false
            }
            this.second_l -= 1
            if (this.second_l < 0) {
                this.minute_l -= 1
                this.second_l = 59
            }
            if (this.minute_l < 0) {
                this.hour_l -= 1
                this.minute_l = 59
            }
            if (this.hour_l < 0) {
                this.hour_l = 23
            }
            // console.log(this.second_l);
        }, 1000)
    },
    filters: {
        // 至少显示两位 用0补充
        size2: function (value) {
            if (value < 0) {
                value = 0
            }
            if (value < 10) return "0" + value
            return value
        }
    },
    watch: {
        second_l(newValue, oldValue) {
            // 售罄以后不在检测
            if (this.state >= 2) return false

            if (newValue <= 0 && this.hour_l <= 0 && this.minute_l <= 0 && this.second_l <= 0) {
                this.queryTime(1)
                // 定时器 销售中
                this.timer = setInterval(() => {
                    // 请求剩余商品
                    this.queryProduct(this.id)
                    // 停止计时器 状态改变
                    if (this.hour_l <= 0 && this.second_l <= 0 && this.minute_l <= 0) {
                        clearInterval(this.timer)
                        // 从售卖中 跳转到 售罄
                        if (this.state == 1) {
                            this.state = 2
                        }
                        return false
                    }
                    this.second_l -= 1
                    if (this.second_l < 0) {
                        this.minute_l -= 1
                        this.second_l = 59
                    }
                    if (this.minute_l < 0) {
                        this.hour_l -= 1
                        this.minute_l = 59
                    }
                    if (this.hour_l < 0) {
                        this.hour_l = 23
                    }
                }, 1000)
            }
        },
        state(newValue, oldValue) {
            if (newValue == 0) {
                this.$refs.btn.innerText = "即将开始"
                this.$refs.countTitle.innerText = "本次秒杀开始还剩"
                return false
            }
            if (newValue == 1) {
                this.$refs.btn.innerText = "立即购买"
                this.$refs.countTitle.innerText = "本次秒杀结束还剩"
                return false
            }
            if (newValue == 2) {
                this.$refs.btn.innerText = "售罄"
                this.$refs.countTitle.innerText = "本次秒杀已经结束"
                this.hour_l = 0
                this.minute_l = 0
                this.second_l = 0
                // clearInterval(this.timer)
                return false
            }
        },
    }

})