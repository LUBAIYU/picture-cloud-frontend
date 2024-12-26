import axios from 'axios'
import qs from 'qs'

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
  (response) => response.data,
  (error) => {
    return Promise.reject(error)
  },
)
