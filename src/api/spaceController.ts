// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request'

/** 创建空间 POST /api/space/create */
export async function createSpaceUsingPost(
  body: API.SpaceCreateDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>('/api/space/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 删除空间信息 DELETE /api/space/delete/${param0} */
export async function deleteSpaceByIdUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteSpaceByIdUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseBoolean_>(`/api/space/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 编辑空间信息 PUT /api/space/edit */
export async function editSpaceByIdUsingPut(
  body: API.SpaceEditDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/space/edit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 根据ID获取空间（仅管理员） GET /api/space/get */
export async function getSpaceByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSpaceByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseSpace_>('/api/space/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 分页查询空间（仅管理员） POST /api/space/page */
export async function querySpaceByPageUsingPost(
  body: API.SpacePageDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultSpace_>('/api/space/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 更新空间信息（仅管理员） PUT /api/space/update */
export async function updateSpaceByIdUsingPut(
  body: API.SpaceUpdateDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/space/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 根据ID获取空间（封装类） GET /api/space/vo/get */
export async function getSpaceVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSpaceVoByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseSpaceVo_>('/api/space/vo/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 分页查询空间（封装类） POST /api/space/vo/page */
export async function querySpaceVoByPageUsingPost(
  body: API.SpacePageDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultSpaceVo_>('/api/space/vo/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
