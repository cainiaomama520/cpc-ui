<template>
    <div class="">
        <el-container>
            <div class="form bg_white" style="width:100%;margin-top: 30px;">
                <el-form :model="form" label-width="100px" :rules="formRules" ref="form">
                        <el-form-item label="广告主：" prop="adv">
                            <el-select v-model="form.adv" clearable  filterable placeholder="请选择" v-bind:disabled="isEdit">
                                <el-option v-for="item in advArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="产品：" prop="pro">
                            <el-select v-model="form.pro" clearable  filterable placeholder="请选择" v-bind:disabled="isEdit">
                                <el-option v-for="item in proArry" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Excel模板" prop="">
                            <el-col :xs="24" :sm="16" :md="10" :lg="6">
                                <ImportFile v-model="form.infos" />
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit('form')">保存</el-button>
                            <router-link to="/assist/assistLink" type="button" class="el-button el-button--warning">取消</router-link>
                        </el-form-item>
                </el-form>
            </div>
        </el-container>
    </div>
</template>

<script>
    import {ImportFile} from '../../common';
    import {mapState, mapActions}from 'vuex';
    export default {
        components: {
            ImportFile
        },
        data(){
            return {
                //新增界面数据
                isEdit:false,
                form: {
                    adv: '',
                    pro: '',
                    infos:[]
                },
                advArry:[],
                proArry:[],
                formRules: {
                    adv: [
                        { required: true, message: '请选择广告主', trigger: 'change' }
                    ],
                    pro: [
                        { required: true, message: '请选择产品', trigger: 'change' }
                    ]
                }
            }
        },
        methods:{
            ...mapActions([,
                'getadverList',
                'assistProList',
                'createLink'
            ]),

            //请求搜索框广告主列表
            async getAdvData(options){
                let advlist = await this.getadverList(options);
                if (advlist && advlist.length>0){
                    this.advArry = advlist||[];
                }else{
                    this.advArry = [];
               }
            },

            //请求搜索框产品列表
            async getProData(options){
                let prolist = await this.assistProList(options);
                if (prolist && prolist.length>0){
                    this.proArry = prolist||[];
                }else{
                    this.proArry = [];
               }
            },

            async checkInput(name){
                return new Promise((resolve, reject) => {
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            console.log('resolve.');
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    });
                }).then((success) => {
                    return true;
                }, (failed)=>{
                    return false;
                });
            },
            async onSubmit(name){
                let isvalid = await new Promise((resolve, reject) => {
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            console.log('resolve.');
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    });
                });

                if (isvalid){
                    for (let [i, link] of (this.form.infos||[]).entries()) {
                        let sdata = {};
                        sdata.advertiserId  = this.form.adv;
                        sdata.productId  = this.form.pro;
                        sdata.clkTrackUrl  = link.ClkLink||'';
                        sdata.impTrackUrl  = link.ImpLink||'';
                        sdata.requestMethod = link.Sync||'';
                        sdata.name  = link.Tag ||'';

                        let result = await this.createLink(sdata);
                        if (result&&Object.keys(result).length > 0){
                            this.$message.info('链接模板：', link.Tag, ' 创建成功');
                        }else{
                            this.$message.warning('链接模板：', link.Tag, ' 创建失败');
                        }
                    }

                    this.$router.push({
                        path: '/assist/assistLink'
                    });
                }
            }
        },
        computed:{},
        created(){
            this.getAdvData();
            this.getProData();
        }

    }
</script>

<style>
.el-container {
    position: relative;
    margin: 10px 30px;
    background-color: white;
    border-radius: 4px;
    min-height: 80%;
  }
</style>
