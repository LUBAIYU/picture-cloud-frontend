import axios from 'axios'
import qs from 'qs'
import { message } from 'ant-design-vue'

// 创建 axios 实例
export const request = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 60000,
  withCredentials: true,
})

request.defaults.paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'repeat' })

// 全局请求拦截器
request.interceptors.request.use(
  (config) => {
    // 从本地获取Token
    const token = localStorage.getItem('Authorization')
    if (token) {
      config.headers['Authorization'] = `${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 全局响应拦截器
request.interceptors.response.use(
  (response) => {
    const { data } = response
    // 未登录
    if (data.code === 40100) {
      // 不是获取用户信息的请求，并且用户目前已经不在用户登录页面，则跳转到登录页面
      if (!window.location.pathname.includes('/user/login')) {
        message.warning('请先登录').then()
        window.location.href = `/user/login?redirect=${window.location.href}`
      }
    }
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)
