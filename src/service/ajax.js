import axios from 'axios'
import Qs from 'qs'
var root = process.env.API_HOST

//请求拦截器
axios.interceptors.request.use(function (config) {
    return config
}, function (error) {
    // 请求出错做什么
    return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
    let responseStatus = response.data.status
    if(responseStatus === 10){
        window.location.href = '/#/login'
    }else if(responseStatus === 1){
        if(response.request.responseURL.indexOf('get_user_info.do') != -1){  //检查用户名 返回response
            return response
        }else{
            alert(response.data.msg)
            return
        }
    }else if(responseStatus === 0){
        return response
    }
}, function (error) {
    return Promise.reject(error)
})

// axios请求封装
export default function http(url = '', data = {}, type = 'POST') {
    return new Promise((resolve, reject) => {
        console.log('http requestUrl: ' + url)
        console.log('http requestData: ' + JSON.stringify(data))
        let Promise
        if (type === 'GET') {
            Promise = axios({
                method: 'get',
                url: url,
                baseUrl: root,
                data: data,
                // 是否携带cookie信息
                withCredentials: true,
            })
        } else {
            Promise = axios({
                method: 'post',
                url: url,
                baseUrl: root,
                data: Qs.stringify(data),
                // 是否携带cookie信息
                withCredentials: false,
            })
        }
        Promise.then(response => {
            if(response) {
                resolve(response.data)
            }
        })
            .catch(error => {
                reject(error)
            })
    })
}
