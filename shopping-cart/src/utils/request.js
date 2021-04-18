/**
 * request 网络请求工具
 */
import axios from "axios";
// 添加请求拦截器
axios.interceptors.request.use(async (response) => {


  return response;
},function (error) {
  //网络出错处理

  console.warn(error)

});


// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    console.log(response.status);
    return  response.data
  },
  (error) => {
    throw error;
  }
);

export default axios;
