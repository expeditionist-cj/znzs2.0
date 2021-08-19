import request from '@/utils/request'
// 查询
export function getDataByPage() {
  return request({
    url: '/data/home/list/datasource',
    method: 'get'
  })
}
