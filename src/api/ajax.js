import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'

//拦截请求体
axios.interceptors.request.use(function (config) {
    const {method,data} = config;
    if(method.toLowerCase()==='post' && typeof data === 'object'){
        config.data = qs.stringify(data);
    }
    return config;
  });

//响应拦截器
axios.interceptors.response.use(function (response) {
    
    return response.data;
  }, function (error) {
    message.error('请求出错了'+error.message)
    return new Promise(()=>{});
  });
export default axios;