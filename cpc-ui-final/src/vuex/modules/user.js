/**
 * 用户模块
 */
import * as types from '../mutations.type';
import Cookie from '../../util/cookies';
import Api from '../api';
import {
    objectFilter,
    pubMessage
} from "../../util/common";

const state = {
    isLogined: false,
    editCacheUser: {},
    editCacheAdmin: {},
};

const mutations = {
    // 设置登录认证
    [types.TYPE_LOGIN](state, payload) {
        if (payload.isLogined) {
            Cookie.setCookie('token', payload.token, 7);
            state.isLogined = true;
        } else {
            state.isLogined = false;
        }
    },
    // 退出登录
    [types.TYPE_LOGOUT](state) {
        Cookie.clearCookie();
        sessionStorage.clear();
        state.user = {};
        state.isLogined = false;
    },
    [types.TYPE_LOGIN_INFO](state, payload) {
        Cookie.setCookie('paopao', JSON.stringify(payload), 7);
    },
    [types.TYPE_USER_MANAGEMENT](state, data) {
        state.editCacheUser = data;
    },
    [types.TYPE_ADMIN_MANAGEMENT](state, data) {
        state.editCacheAdmin = data;
    }
};

const actions = {
    async submitLogin({
        dispatch,
        commit
    }, options) {
        Api.login(options).then(({
            data
        }) => {
            console.log('login result.', data);
            if (data.id_token) {
                commit(types.TYPE_LOGIN, {
                    isLogined: true,
                    token: data.id_token
                });
                Api.get('account', null).then((data) => {
                    commit(types.TYPE_LOGIN_INFO, data.body);
                }, (error) => {
                    dispatch('setMessage', {
                        type: 'error',
                        message: '获取登录用户详情数据失败'
                    });
                    return {};
                })
            } else {
                dispatch('setMessage', {
                    type: 'error',
                    message: '用户名或者密码错误'
                });
            }
            return data;
        }, ({
            data
        }) => {
            dispatch('setMessage', {
                type: 'error',
                message: data
            });
            commit(types.TYPE_LOGIN, {
                isLogined: false
            });

            return {};
        });
    },

    async getLoginInfo({
        commit,
        dispatch
    }, option) {
        return Api.get('account', option).then((data) => {
            commit(types.TYPE_LOGIN_INFO, data.body);
            return data.body;
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取登录用户详情数据失败'
            });
            return {};
        })
    },

    loginOut({
        commit
    }) {
        commit(types.TYPE_LOGOUT);
    }
}


const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
};
