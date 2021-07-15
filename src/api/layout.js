import request from '../utils/request'

export function getData(params) {
  return request({
    url: '/plantIndependent/selectDictionaryCn',
    method: 'get',
    params
  })
}
