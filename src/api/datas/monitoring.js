import request from '@/utils/request'
// 分页查询
export function getDataByPage(data) {
  return request({
    url: '/data/monitor/real/page',
    method: 'post',
    data
  })
}
