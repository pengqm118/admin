import request from '@/utils/request'

// 用户登录模块
export const login = data => { // 如果是export default 导入的时候import，否则导入import + '{}'
  return request({
    method: 'POST',
    url: 'mp/v1_0/authorizations',
    data
  })
}

// 获取用户身份
export const getUserProfile = () => {
  // 在user.js中使用请求拦截器解决authorization格式统一问题问题
  // 获取本地存储的用户信息
  // const user = JSON.parse(window.localStorage.getItem('user'))
  // console.log(user)
  return request({
    method: 'GET',
    url: 'mp/v1_0/user/profile'
    // headers: {
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}
