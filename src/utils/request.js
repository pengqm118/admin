import axios from 'axios'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
})

// 请求拦截器：统一更改请求格式
request.interceptors.request.use(config => {
  // 获取本地存储的用户信息
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, err => {
  console.log(err)
})

export default request
