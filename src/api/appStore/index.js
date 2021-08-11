import request from '@/utils/request';

// 应用总览
export function modelStoreList(params) {
  return request({
    url: '/model/model-store/list',
    method: 'get',
    params
  })
}
