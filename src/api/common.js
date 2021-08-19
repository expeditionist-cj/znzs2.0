import request from '@/utils/request'
// 查询所有电厂
export const getAllPlants = (query) => {
  return request({
    // url: '/sys_dept/tree',
    url: '/admin/dept/plants',
    method: 'get',
    // headers: { 'Content-Type': 'multipart/form-data' },
    query
  })
}
// 根据电厂查询机组信息
export function selectUnitCode(deptId) {
  return request({
    url: `/admin/device/getByDept/${deptId}`,
    method: 'get'
  })
}
