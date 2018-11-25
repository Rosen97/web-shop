import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
    isLogin: 0,   //0-未登录  1-登录
    shippingId: 0,
    followList: [],    //关注列表
    footprintList: [], //足迹
    searchHistory: []
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
