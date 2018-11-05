import axios from 'axios'
import Qs from 'qs'

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
        window.location.href = '/#/user/login'
    }else if(responseStatus === 1){
        console.log(response)
    }else if(responseStatus === 0){
        return response.data
    }
    // console.log(response)
    // if (responseStatus === 0) {
    //     //响应信息只有状态码为1时 回调函数
    //     return response
    // } else {
    //     //请求错误时根据状态码弹出错误信息
    //     console.log(response.data)
    // }
}, function (error) {
    return Promise.reject(error)
})

// axios请求封装
export default function http(url, data, type) {
    return new Promise((resolve, reject) => {
        console.log('http requestUrl: ' + url)
        console.log('http requestData: ' + JSON.stringify(data))
        let Promise
        if (type === 'GET') {
            Promise = axios({
                method: 'get',
                url: url,
                data: data,
                // 是否携带cookie信息
                withCredentials: true,
            })
        } else {
            Promise = axios({
                method: 'post',
                url: url,
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
