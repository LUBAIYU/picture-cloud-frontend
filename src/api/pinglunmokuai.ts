// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request'

/** 查询某张图片的评论总数 GET /api/comment/count/${param0} */
export async function getCommentCountUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCommentCountUsingGETParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseInt_>(`/api/comment/count/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 批量查询图片的评论数 GET /api/comment/count/batch */
export async function queryBatchCommentCountUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryBatchCommentCountUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseMapLongLong_>('/api/comment/count/batch', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 删除评论 DELETE /api/comment/delete/${param0} */
export async function deleteCommentUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCommentUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseBoolean_>(`/api/comment/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 查询评论列表 POST /api/comment/page/vo */
export async function queryCommentsUsingPost(
  body: API.CommentPageDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseIPageCommentsViewVo_>('/api/comment/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 发布评论 POST /api/comment/publish */
export async function publishCommentsUsingPost(
  body: API.CommentPublishDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>('/api/comment/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 人工评论审核 POST /api/comment/review */
export async function commentReviewUsingPost(
  body: API.CommentReviewDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/comment/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 评论点赞 POST /api/comment/thumb */
export async function thumbCommentUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.thumbCommentUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/comment/thumb', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 取消评论点赞 POST /api/comment/thumb/cancel */
export async function cancelThumbCommentUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cancelThumbCommentUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/comment/thumb/cancel', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
