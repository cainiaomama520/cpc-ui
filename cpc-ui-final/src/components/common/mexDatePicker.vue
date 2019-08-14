<template>
        <el-date-picker
            :clearable="false"
            class="block"
            v-model="dateScale"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="datePickerOptions">
        </el-date-picker>
</template>


<script>
    export default{
        data(){
            return{
                dateStart : undefined,
                dateEnd : undefined,

                dateScale:undefined,
                datePickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            let e = new Date();
                            let s = new Date();
                            picker.$emit('pick', [s, e]);
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            let e = new Date();
                            let s = new Date();
                            e.setDate(e.getDate()-1);
                            s.setDate(s.getDate()-1);
                            picker.$emit('pick', [s, e]);
                        }
                    }, {
                        text: '本周',
                        onClick(picker) {
                            let e = new Date();
                            let s = new Date();
                            s.setDate(e.getDate() - e.getDay());
                            picker.$emit('pick', [s, e]);
                        },
                    },{
                        text: '上周',
                        onClick(picker) {
                            let e = new Date();
                            let s = new Date();
                            e.setDate(e.getDate() - e.getDay());
                            s.setDate(e.getDate() - 6);
                            picker.$emit('pick', [s, e]);
                        },
                    },{
                        text: '本月',
                        onClick(picker) {
                            let e = new Date();
                            let s = new Date();
                            s.setDate(1);
                            picker.$emit('pick', [s, e]);
                        },
                    },{
                        text: '上月',
                        onClick(picker) {
                            let e = new Date();
                            e.setDate(0);
                            let s = new Date(e);
                            s.setDate(1);
                            picker.$emit('pick', [s, e]);
                        },
                    },{
                        text: '本年',
                        onClick(picker) {
                            let e = new Date();
                            let s = new Date();
                            s.setDate(1);
                            s.setMonth(0);
                            picker.$emit('pick', [s, e]);
                        },
                    },]
                },
            }
        },
        props:{
            start : Date,
            end : Date,
        },
        created(){
            this.dateScale = [this.start || new Date(),this.end || new Date()];
            this.dateStart = this.dateScale[0];
            this.dateEnd = this.dateScale[1];
        },
        method:{

        },
        watch:{
            dateScale:{
                handler:function (n,o) {
                    if(this.dateStart && this.dateEnd && n[0] && n[1] && this.dateStart.getTime()==n[0].getTime() && this.dateEnd.getTime()==n[1].getTime())return;
                    else {this.dateStart = n[0];this.dateEnd=n[1];}
                    this.$emit("input",n);
                }
            }
        }
    }
</script>

<style>

</style>

