/**
 * 人群模块
 */
import * as types from '../mutations.type';
import Cookie from '../../util/cookies';
import Api from '../api';
import {
    objectFilter,
    pubMessage
} from "../../util/common";

const state = {
    peoplePackets: [],
    peoplePacket: {},
    medias: [],
    peopleDmps: [],
    dmpDropdown: []
};

const mutations = {
    [types.TYPE_PEOPLEPACKET_LIST](state, packets) {
        state.peoplePackets = packets;
    },
    [types.TYPE_PEOPLEPACKET](state, packet) {
        state.peoplePacket = packet;
    },
    [types.TYPE_MEDIA_LIST](state, medias) {
        state.medias = medias;
    },
    [types.TYPE_PEOPLEDMP_LIST](state, peopleDmps) {
        state.peopleDmps = peopleDmps;
    },
    [types.TYPE_PEOPLEDMP_DROPDOWN](state, dmpDropdown) {
        state.dmpDropdown = dmpDropdown;
    }
};

const actions = {
    //请求人群数据包列表
    async getPeoplePacketList({
        commit,
        dispatch
    }, option) {
        return Api.getList('crowd-packets', option).then((data) => {
            commit(types.TYPE_PEOPLEPACKET_LIST, data.body || []);
            return data.body || [];
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取人群数据包数据失败'
            });
        })
    },

    async createPacket({
        commit,
        dispatch
    }, option) {
        return Api.save('crowd-packets', option).then((data) => {
            commit(types.TYPE_PEOPLEPACKET, data.body || {});
            dispatch('setMessage', {
                type: 'success',
                message: '创建人群包成功'
            });
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '创建人群包失败' + error
            });
            return {};
            console.log('packets. create error.', error);
        })
    },
    async deletePacket({
        commit,
        dispatch
    }, option) {
        return Api.remove('crowd-packets', option).then((data) => {
            commit(types.TYPE_PEOPLEPACKET, data.body || {});
            dispatch('setMessage', {
                type: 'success',
                message: '删除人群包成功'
            });
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '删除人群包失败' + error
            });
            return {};
            console.log('packets. delete error.', error);
        })
    },
    async setPacketCache({
        commit,
        dispatch
    }, option) {
        commit(types.TYPE_PEOPLEPACKET, option);
    },
    //请求搜索框媒体列表
    async getMediaList_dmp({
        commit,
        dispatch
    }, option) {
        return Api.getList('common/dict-media', option).then((data) => {
            console.log('media. success.', data);
            commit(types.TYPE_MEDIA_LIST, data.body || {})
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取媒体数据失败'
            });
            return {};
            console.log('media. error.', error);
        })
    },
    //请求搜索框DMP定向名称列表
    async getDmpDropdown({
        commit,
        dispatch
    }, option) {
        return Api.getList('dmp-targetings-dropdown', option).then((data) => {
            console.log('dmpdropdown. success.', data);
            commit(types.TYPE_PEOPLEDMP_DROPDOWN, data.body || {})
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取DMP定向下拉数据失败'
            });
            return {};
            console.log('dmpdropdown. error.', error);
        })
    },
    //请求dmp定向包列表
    async getPeopleDmpList({
        commit,
        dispatch
    }, option) {
        return Api.getList('dmp-targetings', option).then((data) => {
            console.log('dmp. success.', data);
            commit(types.TYPE_PEOPLEDMP_LIST, data.body || {})
            return data.body || {};
        }, (error) => {
            dispatch('setMessage', {
                type: 'error',
                message: '获取dmp定向数据失败'
            });
            return {};
            console.log('dmp. error.', error);
        })
    },

    async fansLogin({
        commit,
        dispatch
    }, option) {
        return Api.getList('waxfanslogin', option).then((data) => {
            return data.body || {};
        }, (error) => {
            return {};
        })
    },

    async getFansInfo({
        commit,
        dispatch
    }, option) {
        return Api.getList('waxwaxfanssearch', option).then((data) => {
            return data.body || {};
        }, (error) => {
            return {};
        })
    }
}

const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
};
