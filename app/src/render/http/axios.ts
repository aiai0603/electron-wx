import axios from "axios";
//创建axios实例
const Request = axios.create({
  baseURL:"http://localhost:3000",
  timeout: 10000, //请求超时时间
});
//请求拦截器
Request.interceptors.request.use(
  (config) => {
    //请求前的操作
    return config;
  },
  (error) => {
    //请求错误的操作
    return Promise.reject(error);
  }
);
//响应拦截器
Request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    //响应错误的操作，比如401
    return Promise.reject(error);
  }
);
export default Request;
