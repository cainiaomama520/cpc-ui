import Vue from 'vue';
import Vuex from 'vuex';

import sys from './modules/system';
import user from './modules/user';
import advpro from './modules/advpro';
import creatCp from './modules/creatCampaign';
import media from './modules/media';
import reports from './modules/reports';
import peoples from './modules/peoples';
import assist from './modules/assist';
import home from './modules/home';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        sys,
        user,
        advpro,
        creatCp,
        media,
        reports,
        peoples,
        assist,
        home
    },

    strict: debug
});
