import Vue from 'vue';
import VueRouter from 'vue-router';
import api from './util/saiApi.js'
import App from './App';
// 将API方法绑定到全局
Vue.prototype.$api = api
import router from './router';
import ElementUI from 'element-ui';
import store from './vuex/store';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css'; // 浅绿色主题
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts


Vue.use(ElementUI);
Vue.use(VueRouter);
import wbobj from './util/wbobj.js'
Vue.use(wbobj);
import publicActions from './util/publicActions.js'
Vue.use(publicActions);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
