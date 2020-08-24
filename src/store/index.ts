import Vue from "vue";
import Vuex from "vuex";
import homeModule from "./home/index";
import productModule from './product/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...homeModule.state,
    ...productModule.state
  },
  mutations: {
    ...homeModule.mutations,
    ...productModule.mutations
  },
  actions: {
    ...homeModule.actions,
    ...productModule.actions
  },
  modules: {}
});
