import axios from 'axios'

// 创建 axios 实例
const request = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 60000,
  withCredentials: true,
})

// 全局请求拦截器
request.interceptors.request.use(
  (config) => config,
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
