new Vue({
    el: "#index",
    data() {
        return {
            SERVER_PATH: "http://48c2385l00.qicp.vip",
            name: '登录/注册',
            re_turn: 0,
            recommand: [
                {
                    re_name: '“安心62天”无忧存利债券',
                    re_num: '2.7%',
                    re_info: '业绩比较基准',
                    re_id: 001,
                },
                {
                    re_name: '国泰价值',
                    re_num: '2.7%',
                    re_info: '业绩比较基准',
                    re_id: 002,
                },
                {
                    re_name: '“安心62天”无忧存利债券',
                    re_num: '2.7%',
                    re_info: '业绩比较基准',
                    re_id: 003
                },
                {
                    re_name: 'XXXXXXXX',
                    re_num: '2.7%',
                    re_info: '业绩比较基准',
                    re_id: 004
                },
            ],
            announcement: [
                {
                    an_info: '可 以 超 级 长 的 新 闻 1 ！ ！',
                    an_id: '001'
                },
                {
                    an_info: '可 以 超 级 长 的 新 闻 2 ！ ！',
                    an_id: '002'
                },
                {
                    an_info: '可 以 超 级 长 的 新 闻 3 ！ ！',
                    an_id: '003'
                },
                {
                    an_info: '可 以 超 级 长 的 新 闻 4 ！ ！',
                    an_id: '004'
                },
                {
                    an_info: '可 以 超 级 长 的 新 闻 5 ！ ！',
                    an_id: '005'
                },

            ],
            loans: [
                {
                    lo_rank: '1',
                    lo_num: '5.5%',
                    lo_info: '近一年的增长率',
                    lo_name: '平台研究精选贷款',
                    lo_intro: '闪电放贷，解决危机',
                    lo_id: '001',
                },
                {
                    lo_rank: '2',
                    lo_num: '5.8%',
                    lo_info: '近一年的增长率',
                    lo_name: '平台研究精选贷款',
                    lo_intro: '闪电放贷，解决危机',
                    lo_id: '002',
                },
                {
                    lo_rank: '3',
                    lo_num: '5.5%',
                    lo_info: '近一年的增长率',
                    lo_name: '平台研究精选贷款',
                    lo_intro: '闪电放贷，解决危机',
                    lo_id: '003',
                }
            ],
            store: [
                {
                    st_rank: '1',
                    st_num: '5.5%',
                    st_info: '近一年的增长率',
                    st_name: '平台研究精选存款',
                    st_intro: '聚焦长期，可观回报',
                    st_id: '001',
                },
                {
                    st_rank: '2',
                    st_num: '6.0%',
                    st_info: '近一年的增长率',
                    st_name: '平台研究精选存款',
                    st_intro: '聚焦长期，可观回报',
                    st_id: '002',
                },
                {
                    st_rank: '3',
                    st_num: '6.1%',
                    st_info: '近一年的增长率',
                    st_name: '平台研究精选存款',
                    st_intro: '聚焦长期，可观回报',
                    st_id: '003',
                },
                {
                    st_rank: '4',
                    st_num: '5.5%',
                    st_info: '近一年的增长率',
                    st_name: '平台研究精选存款',
                    st_intro: '聚焦长期，可观回报',
                    st_id: '001',
                },
            ],
            remind: {
                unpaid: 4,
                paid: 2,
                appointed: 5,
            }
        }
    },
    computed: {
        re_show() {
            return this.recommand.slice(this.re_turn * 3, this.re_turn * 3 + 3)
        },
        lo_show() {
            return this.loans.slice(0, 3)

        },
        st_show() {
            return this.store.slice(0, 3)

        }
    },
    methods: {
        changeRecommand() {
            this.re_turn++
            if (this.re_turn * 3 > this.recommand.length) {
                this.re_turn = 0
                return
            }
        },
        moreLoans() {
            // 更多贷款
        },
        moreStore() {
            // 更多存款
        },
        goStoreProduct(id) {
            if (isLogin()) {
                window.location.href = './product.html?id=' + id
            } else {
                tip_box('请先登录！')
            }
        }
    },
    mounted() {
        // 用户名请求
        $.ajax({
            type: "get",
            url: this.SERVER_PATH + "/user/status",
            // 跨域
            xhrFields: { withCredentials: true },
            success: function (result) {
                if (result.status != 0) {
                    tip
                    _box('发生了意外错误，请联系管理员。')
                } else {
                    $('.user').text(result.data.name)
                }
            }
        });
        // 存款请求
        $.ajax({
            type: "get",
            url: this.SERVER_PATH + "/item/list",
            // 跨域
            xhrFields: { withCredentials: true },
            success: (result) => {
                if (result.status != 0) {
                    tip_box('发生了意外错误，请联系管理员。')
                }
                else {
                    for (let i = 0; i < result.data.length; ++i) {
                        this.store[i].st_rank = result.data[i].rank
                        // 排名为空 就按顺序赋值
                        if (!this.store[i].st_rank) {
                            this.store[i].st_rank = i + 1
                        }
                        this.store[i].st_num = result.data[i].num
                        this.store[i].st_name = result.data[i].name
                        this.store[i].st_info = result.data[i].info
                        this.store[i].st_intro = result.data[i].intro
                        this.store[i].st_id = result.data[i].id

                    }
                }
            },
        });

        // 贷款请求
        $.ajax({
            type: "get",
            url: this.SERVER_PATH + "/item/list", // 贷款地址
            // 跨域
            xhrFields: { withCredentials: true },
            success: (result) => {
                if (result.status != 0) {
                    tip_box('发生了意外错误，请联系管理员。')
                }
                else {
                    for (let i = 0; i < result.data.length; ++i) {
                        this.loans[i].lo_rank = result.data[i].rank
                        // 排名为空 就按顺序赋值
                        if (!this.loans[i].st_rank) {
                            this.loans[i].st_rank = i + 1
                        }
                        this.loans[i].lo_num = result.data[i].num
                        this.loans[i].lo_name = result.data[i].name
                        this.loans[i].lo_info = result.data[i].info
                        this.loans[i].lo_intro = result.data[i].intro
                        this.loans[i].lo_id = result.data[i].id
                    }
                }
            },
        });

        // 新闻请求
        $.ajax({
            type: "get",
            url: this.SERVER_PATH + "/item/list", // 新闻地址
            // 跨域
            xhrFields: { withCredentials: true },
            success: (result) => {
                if (result.status != 0) {
                    tip_box('发生了意外错误，请联系管理员。')
                }
                else {
                    for (let i = 0; i < result.data.length; ++i) {
                        this.announcement[i].an_info = result.data[i].info
                        this.announcement[i].an_id = result.data[i].id
                    }
                }
            },
        });
    },
})