import axios from "axios"
import { Message } from "element-ui"
/**创建拦截器，赋给变量 service */

const BASEURL = process.env.NODE_ENV === 'production' ? '' : process.env.VUE_APP_API

const service = axios.create({
  baseURL: BASEURL,
  timeout: 10000 //请求超时时间
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  config.headers["tokey"]="tokey";
  config.headers["userId"]="userId";
  config.headers["SUID"]="SUID";

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {

  if (response.data.resCode !== 0) {
    Message.error("邮箱不能为空");
    return Promise.reject(error);
  } else {
    // 对响应数据做点什么
    return response;
    //return Promise.resolve(response);
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default service;