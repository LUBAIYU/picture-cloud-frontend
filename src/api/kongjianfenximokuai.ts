// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request'

/** 空间图片分类分析 POST /api/space/analyze/category */
export async function getCategoryAnalyzeUsingPost(
  body: API.SpaceCategoryAnalyzeDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListSpaceCategoryAnalyzeVo_>('/api/space/analyze/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 空间使用排行分析 POST /api/space/analyze/rank */
export async function getSpaceAnalyzeUsingPost(
  body: API.SpaceRankAnalyzeDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListSpace_>('/api/space/analyze/rank', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 空间图片大小分析 POST /api/space/analyze/size */
export async function getSizeAnalyzeUsingPost(
  body: API.SpaceSizeAnalyzeDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListSpaceSizeAnalyzeVo_>('/api/space/analyze/size', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 空间图片标签分析 POST /api/space/analyze/tag */
export async function getTagAnalyzeUsingPost(
  body: API.SpaceTagAnalyzeDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListSpaceTagAnalyzeVo_>('/api/space/analyze/tag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 空间资源使用分析 POST /api/space/analyze/usage */
export async function getSpaceUsageAnalyzeUsingPost(
  body: API.SpaceUsageAnalyzeDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseSpaceUsageAnalyzeVo_>('/api/space/analyze/usage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 用户上传行为分析 POST /api/space/analyze/user */
export async function getUserAnalyzeUsingPost(
  body: API.SpaceUserAnalyzeDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListSpaceUserAnalyzeVo_>('/api/space/analyze/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
