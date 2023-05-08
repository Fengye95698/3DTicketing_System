import axios from "axios";
let baseUrl = "";
import store from "@/store";
const service = axios.create({
  baseURL: baseUrl, // api 的 base_url
  timeout: 15000, // 请求超时时间
  withCredentials: true,
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
  },
});

// 请求拦截器
service.interceptors.request.use(
  (request) => {
    // if (store.state.user.token) {
    //   request.headers["Authorization"] = store.state.user.token;
    // }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 导出通用请求axios
export default (opts) => {
  const result = service(opts);
  return result;
};
