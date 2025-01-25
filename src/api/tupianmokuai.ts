// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request'

/** 批量抓取并上传图片 POST /api/picture/batch/upload */
export async function uploadPictureByBatchUsingPost(
  body: API.PictureBatchDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseInt_>('/api/picture/batch/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 分页查询图片（封装类），多级缓存 POST /api/picture/cache/vo/page */
export async function queryPictureVoByPageWithCacheUsingPost(
  body: API.PicturePageDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultPictureVo_>('/api/picture/cache/vo/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 根据ID删除图片 DELETE /api/picture/delete/${param0} */
export async function deletePictureByIdUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deletePictureByIdUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { picId: param0, ...queryParams } = params
  return request<API.BaseResponseBoolean_>(`/api/picture/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 批量更新图片信息 PUT /api/picture/edit/byBatch */
export async function editPictureByBatchUsingPut(
  body: API.PictureEditByBatchDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/picture/edit/byBatch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 根据ID获取图片（仅管理员） GET /api/picture/get */
export async function getPictureByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPictureByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePicture_>('/api/picture/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 创建AI扩图任务 POST /api/picture/out_painting/create_task */
export async function createOutPaintingTaskUsingPost(
  body: API.PictureCreateOutPaintingTaskDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseCreateOutPaintingTaskResponse_>(
    '/api/picture/out_painting/create_task',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    }
  )
}

/** 查询AI扩图任务 GET /api/picture/out_painting/get_task */
export async function getOutPaintingTaskUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOutPaintingTaskUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseGetOutPaintingTaskResponse_>(
    '/api/picture/out_painting/get_task',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    }
  )
}

/** 分页查询图片（仅管理员） POST /api/picture/page */
export async function queryPictureByPageUsingPost(
  body: API.PicturePageDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultPictureVo_>('/api/picture/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 图片审核 POST /api/picture/review */
export async function doPictureReviewUsingPost(
  body: API.PictureReviewDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/picture/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 根据颜色搜索图片 POST /api/picture/search/byColor */
export async function searchPictureByColorUsingPost(
  body: API.PictureSearchByColorDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListPictureVo_>('/api/picture/search/byColor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 以图搜图 POST /api/picture/search/byPicture */
export async function searchPictureByPictureUsingPost(
  body: API.PictureSearchByPictureDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListImageSearchResult_>('/api/picture/search/byPicture', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取图片标签分类列表 GET /api/picture/tag_category */
export async function listPictureTagCategoryUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponsePictureTagCategoryVo_>('/api/picture/tag_category', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 更新图片信息 PUT /api/picture/update */
export async function updatePictureUsingPut(
  body: API.PictureUpdateDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/picture/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 上传图片 POST /api/picture/upload */
export async function uploadPictureUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadPictureUsingPOSTParams,
  body: {},
  file?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData()

  if (file) {
    formData.append('file', file)
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele]

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''))
        } else {
          formData.append(ele, JSON.stringify(item))
        }
      } else {
        formData.append(ele, item)
      }
    }
  })

  return request<API.BaseResponsePictureVo_>('/api/picture/upload', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  })
}

/** 通过 URL 上传图片 POST /api/picture/url/upload */
export async function uploadPictureByUrlUsingPost(
  body: API.PictureUploadDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePictureVo_>('/api/picture/url/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 根据ID获取图片（封装类） GET /api/picture/vo/get */
export async function getPictureVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPictureVoByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePictureVo_>('/api/picture/vo/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 分页查询图片（封装类） POST /api/picture/vo/page */
export async function queryPictureVoByPageUsingPost(
  body: API.PicturePageDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultPictureVo_>('/api/picture/vo/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
