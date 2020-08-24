import { Commit } from "vuex";
import { HomeState, UserInfoProps } from "./interface";
import {
  checkLogin,
  userLogin,
  LoginParamsProps,
  RegisterParamsProps,
  userRegister,
  logout
} from "../../api/index";

interface RequestDataProps {
  status: number;
  msg?: string;
  data?: any;
}

const state: HomeState = {
  loginStatus: false,
  userInfo: {
    answer: "",
    createTime: 0,
    email: "",
    id: 0,
    password: "",
    phone: "",
    question: "",
    role: 0,
    updateTime: 0,
    username: "",
  },
};

const mutations = {
  setStatus(state: HomeState, status: boolean) {
    state.loginStatus = status;
  },
  setUserInfo(state: HomeState, info: UserInfoProps) {
    state.userInfo = info;
  },
};

const getters = {
  loginStatus: (state: HomeState) => state.loginStatus,
  userInfo: (state: HomeState) => state.userInfo,
};

const actions = {
  // 判断用户登录状态
  async judgeLoginStatus({ commit }: { commit: Commit }) {
    const requestData: RequestDataProps = await checkLogin();
    commit("setStatus", requestData.status === 0);
    commit("setUserInfo", requestData.data);
  },

  // 去登陆
  async toLogin({ commit }: { commit: Commit }, info: LoginParamsProps) {
    const requestData: RequestDataProps = await userLogin(info);
    commit("setUserInfo", requestData.data);
    if (requestData.status === 0) {
      window.router.back();
    } else {
      alert(requestData.msg);
    }
  },

  // 注册
  async toRegister({ commit }: { commit: Commit }, info: RegisterParamsProps) {
    const requestData: RequestDataProps = await userRegister(info);
    if (requestData.status === 0) {
      window.router.back();
    } else {
      alert(requestData.msg);
    }
  },

  // 退出登录
  async toLogout({commit}: {commit: Commit}) {
    const requestData: RequestDataProps = await logout();
    if(requestData.status === 0) {
      commit('setStatus', false);
      window.router.push({name: 'Home'});
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
