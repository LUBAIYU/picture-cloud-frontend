// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request'

/** 分页查询评论审核记录 POST /api/comment/reviews/page */
export async function queryCommentReviewsByPageUsingPost(
  body: API.CommentReviewsPageDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultCommentReviews_>('/api/comment/reviews/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
