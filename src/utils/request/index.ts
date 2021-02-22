import http from 'axios'
import { getToken, getUserId } from '../auth'

http.defaults.baseURL = process.env.REACT_APP_API

// if (process.env.NODE_ENV === 'development') {
// require('../../mock/api')
// }

// 请求拦截器
http.interceptors.request.use(function (config) {
  const userId = getUserId()
  const token = getToken()

  if (userId && token) {
    if (!config.data) config.data = {}
    config.data.userId = parseInt(userId, 10)
    config.data.token = token
  }

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
