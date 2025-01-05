// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request'

/** 批量新增分类 POST /api/category/batch/add */
export async function addBatchCategoryUsingPost(body: string[], options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/category/batch/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 批量删除分类 DELETE /api/category/delete */
export async function delBatchCategoryUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delBatchCategoryUsingDELETEParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/category/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 根据ID查询分类 GET /api/category/get/${param0} */
export async function getCategoryByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCategoryByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseCategory_>(`/api/category/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 查询分类列表 GET /api/category/list */
export async function listCategoryUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListCategoryListVo_>('/api/category/list', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 修改分类名称 PUT /api/category/update */
export async function updateCategoryByIdUsingPut(
  body: API.CategoryUpdateDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/category/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
