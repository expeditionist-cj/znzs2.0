import request from '@/utils/request'
// 分页查询
export function getDataByPage(data) {
  return request({
    url: '/data/point/sdt/page',
    method: 'post',
    data
  })
}
// 修改
export function updateData(data) {
  return request({
    url: '/data/point/sdt',
    method: 'put',
    data
  })
}
// 删除
export function delData(id) {
  return request({
    url: `/data/point/sdt/${id}`,
    method: 'delete'
  })
}
// 上传
export function uploadSdt(data) {
  return request({
    url: '/data/point/sdt/import',
    method: 'post',
    data
  })
}
// 导出
export function exportSdt(data) {
  return request({
    url: '/data/point/sdt/export',
    method: 'post',
    data
  })
}
