import request from '@/utils/request';

// 应用总览
export function listByCatalog(params) {
  return request({
    url: '/model/model-display/listByCatalog',
    method: 'get',
    params
  })
}
// 应用推荐
export function recommend() {
  return request({
    url: '/model/model-display/recommend',
    method: 'get'
  })
}
