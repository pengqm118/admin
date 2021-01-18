import request from '@/utils/request'

// 请求文章内容
export const getContent = params => {
  return request({
    url: '/mp/v1_0/articles',
    method: 'GET',
    params
  })
}

// 请求文章搜索分类种类
export const getContentChannels = () => {
  return request({
    url: 'mp/v1_0/channels',
    method: 'GET'
  })
}
