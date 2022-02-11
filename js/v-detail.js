new Vue({
    el:'#root',
    data() {
        return {
            item:{
                it_name:'月月安心买第九期',
                it_money:1000.00,
                it_return:10.00,
                it_id:''
            },
            time:{
                paid_time:'2020-06-03',
                start_time:'2020-06-04',
                end_time:'2020-09-04',
                destroy_time:'2030-09-04'
            },
            item_info:[
                {
                    info_name:'期望年化回报率',
                    info_detail:'7.9%',
                    id:'001',
                },
                {
                    info_name:'封闭期',
                    info_detail:'90天',
                    id:'002'

                },{
                    info_name:'总金额',
                    info_detail:'10000.00',
                    id:'003'
                },{
                    info_name:'总份数',
                    info_detail:'10份',
                    id:'004'

                },{
                    info_name:'订单编号',
                    info_detail:'XXXXXXX',
                    id:'005'

                }
            ]
        }
    },
    mounted() {
        // 未登录返回
        if(!isLogin()){
            // window.location.href='./login.html'
        }

        // 信息获取
        $.ajax({
            type: "get",
            url: SERVER_PATH+'',
            data: "data",
            success: function (response) {
                if(response.status!=0){
                    tip_box('发生了意外错误，请联系管理员。')
                    return false
                }else{

                }
            }
        })

        this.item.it_id=idgetUrlParam('id')

    },
    methods: {
        returnIndex(){
            window.location.href='./index.html'
        }
    },
})