import qs from "qs";
import Axios from "axios";
import Vue from "vue";

// API请求配置
const HTTP = Axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  timeout: 30000,
  withCredentials: false
});

// 全局请求发送信息拦截
HTTP.interceptors.request.use(
  config => {
    if (config.method === "post") {
      // if (!config.data.token) {
      // 	config.data.token = window.localStorage.getItem('token');
      // }
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    throw new Error(error);
  }
);

// 全局请求返回信息拦截
HTTP.interceptors.response.use(
  response => {
    const data = response.data;
    // 未登录or登录超时
    // if(data.status == 10) {
    // 	console.log('用户未登录或已超时，请先登录！');
    // 	window.toLogin && window.toLogin();
    // }
    return data;
  },
  error => {
    if (Vue.prototype.$loading) {
      Vue.prototype.$loading.close();
    }
    throw new Error(error);
  }
);

export default HTTP;
