import http from 'axios'

http.defaults.baseURL = process.env.REACT_APP_API

if (process.env.NODE_ENV === 'development') {
  require('../../mock/api')
}

// 请求拦截器
http.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default http
