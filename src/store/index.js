import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
    isLogin: 0,   //0-未登录  1-登录
    shippingId: 0
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
