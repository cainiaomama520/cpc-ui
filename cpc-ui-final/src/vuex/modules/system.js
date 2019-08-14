/**
 * 系统状态
 */

import * as types from '../mutations.type';
let time = null;
const state = {
    errorMsg: {},
    loading: {
        show: false,
        date: null
    },
    homeChartDate: { // 主页日期
        start: '',
        end: ''
    }
};

const mutations = {
    // 设置登录认证
    [types.TYPE_MESSAGE](state, payload) {
        state.errorMsg = payload;
        state.errorMsg.date = new Date();
    },
    [types.TYPE_LOADING](state, loading) {
        state.loading = {
            show: loading,
            date: new Date()
        };
    }
};

const actions = {
    setMessage({commit}, payload) {
        commit(types.TYPE_MESSAGE, payload);
    },
    setLoading({commit}, payload) {
        clearTimeout(time);
        time = setTimeout(() => {
            commit(types.TYPE_LOADING, payload);
        }, 100);
    }
};

const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
};
