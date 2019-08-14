<template>
    <div id="app">
        <!-- <top-progress ref="topProgress"></top-progress> -->
        <transition mode="out-in" name="fade-left">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import Cookie from './util/cookies';
import {mapActions, mapState} from 'vuex';
import topProgress from 'vue-top-progress';

export default {
    components: {
        topProgress
    },

    data(){
        return {
            user: {}
        };
    },

    methods: {

        ...mapActions([
            'loginOut',
            'getLoginInfo'
        ])
    },

    computed: {
        ...mapState({
            errorMsg: ({sys}) => sys.errorMsg,
            loading: ({sys}) => sys.loading,
            isLogined: ({user}) => user.isLogined
        })
    },

    watch: {
        errorMsg: {
            handler: function (val, oldVal) {
                let message = val.message || {};
                this.$message({
                    showClose: true,
                    message: message || '服务器错误',
                    type: val.type
                });
                if (['ECONNREFUSED', 401].indexOf(message.code) !== -1) {
                    this.loginOut();
                    this.$router.push('/login');
                }
            },
            deep: true
        },
        loading: {
            handler: function(n) {
                if (n.show) {
                    this.$refs.topProgress.start();
                } else {
                    this.$refs.topProgress.done();
                }
            },
            deep: true
        }
    },

    beforeMount () {
        let secret = Cookie.getCookie('token') || null;
        let login = Cookie.getCookie('paopao') || null;
        if (!secret) {}

        if (secret && !login){
            this.getLoginInfo();
        }
    },
    created() {
      var obj1=JSON.parse(localStorage.getItem("currentCCObj"));
      if (obj1 != null) {
        this.$store.commit('setValues',obj1);
      }
    }
}
</script>

<style lang="scss">
    @import "../static/css/main.scss";
    @import "../static/css/theme-green/fonts/font_7gmjgta5cvnjc3di/iconfont.css";
    @import "../static/css/color-dark.css";     /*深色主题*/
    /*@import "../static/css/theme-green/color-green.css";   !*浅绿色主题*!*/
    #app{
        min-width: 1300px;
    }
</style>
