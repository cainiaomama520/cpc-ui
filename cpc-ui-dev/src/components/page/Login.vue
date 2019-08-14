<template>
    <div class="login-wrap">
        <div class="ms-title">Golden Traffic</div>
        <div class="ms-login">
            <el-form :model="login" :rules="rules" ref="login" label-width="0px" class="demo-ruleForm" @keyup.native.enter="handleSubmit">
                <el-form-item prop="email">
                    <el-input type="email" v-model="login.email" placeholder="Email"></el-input>
                </el-form-item>
                <el-form-item prop="passwd">
                    <el-input type="password" placeholder="password" v-model="login.passwd" ></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click.native.prevent="handleSubmit">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
    export default {
        data: function(){
            return {
                login: {
                    email: '',
                    passwd: ''
                },
                rules: {
                    email: [
                        { required: true, message: '请输入Email', trigger: 'blur' },
                        {type: "email", message:"请输入Email", trigger: 'blur' }
                    ],
                    passwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            // 映射函数
            ...mapActions([
                'submitLogin',
                'loginOut',
                'getLoginInfo'
            ]),
            async handleSubmit(ev) {
                let logind = {
                    username: this.login.email,
                    password: this.login.passwd,
                    rememberMe: true,
                }
                await this.submitLogin(logind);
            }
        },
        computed: {
            //映射变量
            ...mapState({
                errorMsg: ({sys}) => sys.errorMsg,
                isLogined: ({user}) => user.isLogined
            })
        },
        watch: {
            isLogined (v) {
                // this.loading = false;
                if (v) {
                    this.$router.push('/');
                }
            },
            errorMsg () {
                // this.loading = false;
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
