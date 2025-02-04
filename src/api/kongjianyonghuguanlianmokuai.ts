// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request'

/** 添加成员到空间 POST /api/spaceUser/add */
export async function addSpaceUserUsingPost(
  body: API.SpaceUserAddDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>('/api/spaceUser/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 从空间移除成员 DELETE /api/spaceUser/delete/${param0} */
export async function deleteSpaceUserByIdUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteSpaceUserByIdUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseBoolean_>(`/api/spaceUser/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 编辑成员信息 PUT /api/spaceUser/edit */
export async function editSpaceUserUsingPut(
  body: API.SpaceUserEditDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/spaceUser/edit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 查询某个成员在某个空间的信息 POST /api/spaceUser/get */
export async function getSpaceUserUsingPost(
  body: API.SpaceUserQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseSpaceUser_>('/api/spaceUser/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 查询空间成员列表 POST /api/spaceUser/list */
export async function listSpaceUserUsingPost(
  body: API.SpaceUserQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListSpaceUserVo_>('/api/spaceUser/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 查询我加入的团队空间列表 GET /api/spaceUser/list/my */
export async function listMyTeamSpaceUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListSpaceUserVo_>('/api/spaceUser/list/my', {
    method: 'GET',
    ...(options || {}),
  })
}
