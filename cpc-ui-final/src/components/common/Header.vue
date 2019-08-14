<template>
<nav class="header-main">
    <div class="left-header-main">
        <div id="mex-ssp-text" :style="-1 == roles.indexOf('ROLE_OPTIMIZE') ? 'width: 200px;': 'width:300px;'">Golden Traffic</div>
        <el-menu theme="dark" :default-active="activeIndex" mode="horizontal" unique-opened id="head-el-menu" router active-text-color="#ffd04b" background-color="#545c64" text-color="#fff">
            <el-menu-item index="/home">首页</el-menu-item>
            <el-menu-item index="/campaignop" v-if="-1 == roles.indexOf('ROLE_OPTIMIZE')">活动管理</el-menu-item>
            <el-menu-item index="/media" v-if="-1 == roles.indexOf('ROLE_OPTIMIZE')">媒体管理</el-menu-item>
            <el-menu-item index="/advpro" v-if="-1 == roles.indexOf('ROLE_OPTIMIZE')">客户/产品管理</el-menu-item>
            <el-menu-item index="/reports">数据管理</el-menu-item>
            <el-menu-item index="/peoples" v-if="-1 == roles.indexOf('ROLE_OPTIMIZE')">人群管理</el-menu-item>
            <el-menu-item index="/assist" v-if="-1 == roles.indexOf('ROLE_OPTIMIZE')">辅助工具</el-menu-item>
        </el-menu>
    </div>
    <div class="right-header-main">
        <router-link :to="{ name: 'creatADCampaign', params: {} }" v-if="-1 == roles.indexOf('ROLE_OPTIMIZE')">
            <i class="el-icon-circle-plus-outline" style="font-size: 36px;color: white;"></i>
        </router-link>
        <el-dropdown trigger="click" @command="handleCommand"  class="right-menu-main-header">
            <img  src="../../../static/img/img.jpg">
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="userSet">设置</el-dropdown-item>
                <el-dropdown-item command="loginout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</nav>


</template>

<script>
import Cookie from '../../util/cookies';
import {
    mapActions,
    mapState
} from 'vuex';
export default {
    name: 'Pipeline',
    data() {
        return {
            user: {},
            activeIndex: '/',
            roles:[]
        }
    },
    components: {},
    computed: {
//      activeIndex() {
//          return this.$route.path.replace('/', '');
//      }
    },
    methods: {
        // 映射函数
        ...mapActions([
            'loginOut'
        ]),
        handleCommand(command) {
            if (command == 'loginout') {
                this.$router.push('/login');
            }
        },
    },

    async beforeMount (){
        let login = Cookie.getCookie('paopao') || null;
        console.log('fghjkl', login);
        if (!login){
            // this.loginOut();
            this.$router.push('/login');
        }else{
            let loginfo = JSON.parse(login);
            this.roles = loginfo.authorities;
        }
    },

    async mounted() {

    },
}
</script>
<style rel="stylesheet/scss" lang="scss">@import "../../../static/css/common";
.header-main {
    width: 100%;
    height: 60px;
    background: #545c64;
    display: flex;
    justify-content: space-between;
    align-items: center;
    #mex-ssp-text {
        display: inline-block;
        line-height: 60px;
        width: 200px;
        color: white;
        text-align: center;
        font-style: italic;
        font-weight: bolder;
        font-size: 20px;
    }
    #head-el-menu {
        display: inline-block;
        background-color: #545c64;
    }
    .left-header-main {
        display: flex;
        justify-content: flex-start;
    }
    .right-header-main{
        display: flex;
        justify-content: space-around;
        width:250px;
        align-items: center;
    }
    .right-menu-main-header {
        width: 130px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img {
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            height: 40px;
            margin-right: 10px;
        }
        color: white;
    }
}
</style>
