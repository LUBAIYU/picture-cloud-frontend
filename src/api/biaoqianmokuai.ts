// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request'

/** 批量新增标签 POST /api/tag/batch/add */
export async function addBatchTagsUsingPost(body: string[], options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/tag/batch/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 批量删除标签 DELETE /api/tag/delete */
export async function delBatchTagUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delBatchTagUsingDELETEParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/tag/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 根据ID查询标签 GET /api/tag/get/${param0} */
export async function getTagByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTagByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseTag_>(`/api/tag/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 查询标签列表 GET /api/tag/list */
export async function listTagUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListTagListVo_>('/api/tag/list', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 修改标签名称 PUT /api/tag/update */
export async function updateTagByIdUsingPut(
  body: API.TagUpdateDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/tag/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
