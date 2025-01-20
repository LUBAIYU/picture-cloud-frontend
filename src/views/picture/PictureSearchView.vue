<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { getPictureVoByIdUsingGet, searchPictureByPictureUsingPost } from '@/api/tupianmokuai.ts'
import { message } from 'ant-design-vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const picture = ref<API.PictureVo>({})
const pictureId = computed(() => {
  return route.query?.pictureId
})
const imageList = ref<API.ImageSearchResult[]>([])
const loading = ref<boolean>(false)

// 获取图片详情
const fetchPictureDetail = async () => {
  try {
    const res = await getPictureVoByIdUsingGet({
      picId: pictureId.value,
    })
    if (res.code === 0 && res.data) {
      picture.value = res.data as API.PictureVo
    } else {
      message.error('获取图片详情失败，' + res.message)
    }
  } catch (error: any) {
    message.error('获取图片详情失败：' + error.message)
  }
}

// 获取以图搜图结果
const fetchImageSearchResult = async () => {
  loading.value = true
  try {
    const res = await searchPictureByPictureUsingPost({
      pictureId: pictureId.value,
    })
    if (res.code === 0 && res.data) {
      imageList.value = (res.data as API.ImageSearchResult[]) ?? []
    } else {
      message.error('获取数据失败，' + res.message)
    }
  } catch (error: any) {
    message.error('获取数据失败：' + error.message)
  }
  loading.value = false
}

onMounted(() => fetchPictureDetail())
onMounted(() => fetchImageSearchResult())
</script>

<template>
  <div id="picture-search-view">
    <h2 style="margin-bottom: 16px">以图搜图</h2>
    <h3 style="margin-bottom: 16px">原图</h3>
    <a-card hoverable style="width: 240px">
      <template #cover>
        <a-image :src="picture.thumbnailUrl ?? picture.picUrl" style="height: 180px" />
      </template>
    </a-card>
    <h3 style="margin: 16px 0">识图结果</h3>
    <!-- 图片列表 -->
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
      :data-source="imageList"
      :loading="loading"
    >
      <template #renderItem="{ item: picture }">
        <a-list-item style="padding: 0">
          <!-- 单张图片 -->
          <a :href="picture.fromUrl" target="_blank">
            <a-card hoverable>
              <template #cover>
                <a-image placeholder :src="picture.thumbUrl" height="180px" />
              </template>
            </a-card>
          </a>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style scoped></style>
