import request from '@/utils/request'

export const getContent = params => {
  return request({
    url: '/mp/v1_0/articles',
    method: 'GET',
    params
  })
}
