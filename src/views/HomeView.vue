<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  listPictureTagCategoryUsingGet,
  queryPictureVoByPageWithCacheUsingPost,
} from '@/api/tupianmokuai.ts'
import { message } from 'ant-design-vue'
import PictureList from '@/components/PictureList.vue'

const dataList = ref<API.PictureVo[]>([])
const total = ref<number>(0)
const loading = ref<boolean>(true)

const categoryList = ref<string[]>([])
const selectedCategory = ref<string>('all')
const tagList = ref<string[]>([])
const selectedTagList = ref<boolean[]>([])

// 搜索条件
const searchParams = ref<API.PicturePageDto>({
  current: 1,
  pageSize: 12,
})

const doPageChange = (page: number, pageSize: number) => {
  searchParams.value.current = page
  searchParams.value.pageSize = pageSize
  loadData()
}

// 加载数据
const loadData = async () => {
  loading.value = true

  // 转换搜索参数
  const params = {
    ...searchParams.value,
    tagList: [] as string[],
  }
  if (selectedCategory.value !== 'all') {
    params.category = selectedCategory.value
  }
  selectedTagList.value.forEach((useTag, index) => {
    if (useTag) {
      params.tagList.push(tagList.value[index])
    }
  })

  // 查询数据
  const res = await queryPictureVoByPageWithCacheUsingPost(params)
  if (res.code === 0 && res.data) {
    dataList.value = res.data.records
    total.value = res.data.total
  } else {
    message.error(res.message)
  }
  loading.value = false
}

// 搜索
const doSearch = () => {
  // 重置搜索条件
  searchParams.value.current = 1
  loadData()
}

// 获取标签分类列表
const getCategoryTagList = async () => {
  const res = await listPictureTagCategoryUsingGet()
  if (res.code === 0 && res.data) {
    categoryList.value = res.data.categoryList
    tagList.value = res.data.tagList
  } else {
    message.error(res.message)
  }
}

onMounted(() => loadData())
onMounted(() => getCategoryTagList())
</script>

<template>
  <div id="homeView">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <a-input-search
        v-model:value="searchParams.searchText"
        placeholder="从海量图片中搜索"
        enter-button="搜索"
        size="large"
        @search="doSearch"
      />
    </div>
    <!-- 分类和标签 -->
    <a-tabs v-model:active-key="selectedCategory" @change="doSearch">
      <a-tab-pane key="all" tab="全部" />
      <a-tab-pane v-for="category in categoryList" :key="category" :tab="category" />
    </a-tabs>
    <div class="tag-bar">
      <span style="margin-right: 8px">标签:</span>
      <a-space :size="[0, 8]" wrap>
        <a-checkable-tag
          v-for="(tag, index) in tagList"
          :key="tag"
          v-model:checked="selectedTagList[index]"
          @change="doSearch"
        >
          {{ tag }}
        </a-checkable-tag>
      </a-space>
    </div>
    <!-- 图片列表 -->
    <picture-list :data-list="dataList" :loading="loading" />
    <a-pagination
      style="text-align: right"
      v-model:current="searchParams.current"
      v-model:page-size="searchParams.pageSize"
      :total="total"
      @change="doPageChange"
    />
  </div>
</template>

<style scoped>
#homeView .search-bar {
  max-width: 480px;
  margin: 0 auto 16px;
}

#homeView .tag-bar {
  margin-bottom: 16px;
}
</style>
