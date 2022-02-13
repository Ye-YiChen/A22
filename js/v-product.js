


// 控制主体
new Vue({
    el: '#product',
    data() {
        return {
            id: 0,
            pro_name: '三湘理财“每月放心买”第2期',
            pro_type: '人民币理财产品',
            pro_labels: [
                {
                    la_name: '开放式',
                    la_id: '001'
                },
                {
                    la_name: '公募',
                    la_id: '002'
                },
                {
                    la_name: '固定收益',
                    la_id: '003'
                },
            ],
            pro_parameter: [
                {
                    pa_num: '3.15%',
                    pa_info: '业绩比较基准',
                    pa_id: '001'
                },
                {
                    pa_num: '60',
                    pa_info: '最低持有期限(天)',
                    pa_id: '002'
                }
            ],
            remind: {
                info: '主要投资货币市场工具、债券、证券投资基金、资管计划等，以投资信用债80%-100%，权益资产0-20%，货币市场工具0-20%，杠杆率120%为例，业绩基准参考市场指数及投资策略等确定，不代表产品的未来表现和实际收益。（示例仅供参考）',
                target: 1, // 0 不需要解释 1 对 第一个框的解释 2 对 第二个框的解释 
            },
            short_info: {
                risk: '中低风险',
                per_money: 10000,
                sum: 10000,
            },
            rules: [
                {
                    ru_name: '首笔起点金额',
                    ru_intro: '1.00元',
                    ru_id: '001'
                },
                {
                    ru_name: '单笔起点金额',
                    ru_intro: '1.00元',
                    ru_id: '002'
                }
            ],
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
        /* if(!isLogin()){
            tip_box('请先登录')
            $('.cancel-box').on('click', function () {
                window.location.href='./login.html'
            })
            return false
        } */
        this.id = getUrlParam('id'); // 获取产品id
        $.ajax({
            type: "get",
            url: SERVER_PATH + "/item/detail/" + this.id, // 请求地址
            xhrFields: { withCredentials: true },
            data: {
                'id': this.id
            },
            success: (response) => {
                if (response.status != 0) {
                    tip_box('发生了意外错误，请联系管理员。')
                }
                else {
                    // 产品名称 字符串
                    this.pro_name = response.data.name
                    // 产品类型 字符串
                    this.pro_type = response.data.type
                    // 产品标签 对象数组[{},{},{}] 两到三个对象
                    this.pro_labels = response.data.lables
                    // 产品参数 对象数组 只能两个 
                    this.pro_parameter = response.data.parameter
                    // 提示信息 对象    0不提示 1 提示第一个产品参数 2 提示第二个产品参数
                    // this.remind = response.data.remind
                    // 产品概述 对象    
                    this.short_info = response.data.info
                    // 产品规则 对象数组
                    this.rules = response.data.rules
                }
            }
        });

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
            pro_left: 10000 // stock
        }
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
            this.tip_box('预料之外的错误，请联系管理员')
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
        var timer = setInterval(() => {
            if (this.hour_l == 0 && this.second_l == 0 && this.minute_l == 0) {
                if (this.state == 0) {
                    this.state = 1
                }
                clearInterval(timer)
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
        this.queryProduct(this.id)
        this.queryTime(this.id, 0)
    },
    filters: {
        // 至少显示两位 用0补充
        size2: function (value) {
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
                var timer = setInterval(() => {
                    // 请求剩余商品
                    this.queryProduct(this.id)
                    if (this.hour_l == 0 && this.second_l == 0 && this.minute_l == 0) {
                        clearInterval(timer)
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
                return false
            }
        }
    }

})