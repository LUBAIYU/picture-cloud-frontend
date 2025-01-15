<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { getSpaceVoByIdUsingGet } from '@/api/kongjianmokuai.ts'
import { formatSize } from '@/utils'
import { queryPictureVoByPageUsingPost } from '@/api/tupianmokuai.ts'
import PictureList from '@/components/PictureList.vue'

interface Props {
  id: string | number
}

const props = defineProps<Props>()
const space = ref<API.SpaceVo>({})
const dataList = ref<API.PictureVo[]>([])
const total = ref<number>(0)
const loading = ref<boolean>(true)

// 获取空间详情
const fetchSpaceDetail = async () => {
  try {
    const res = await getSpaceVoByIdUsingGet({
      id: props.id,
    })
    if (res.code === 0 && res.data) {
      space.value = res.data as API.SpaceVo
    } else {
      message.error('获取空间详情失败，' + res.message)
    }
  } catch (error: any) {
    message.error('获取空间详情失败：' + error.message)
  }
}

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
  // 查询数据
  const res = await queryPictureVoByPageUsingPost({
    spaceId: props.id,
    ...searchParams.value,
  })
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

onMounted(() => fetchSpaceDetail())
onMounted(() => loadData())
</script>

<template>
  <div id="spaceDetailView">
    <!-- 空间信息 -->
    <a-flex justify="space-between">
      <h2>{{ space.spaceName }}（私有空间）</h2>
      <a-space>
        <a-button type="primary" :href="`/picture/add?spaceId=${id}`" target="_blank">
          + 创建图片
        </a-button>
        <a-tooltip
          :title="`占用空间 ${formatSize(space.totalSize)} / ${formatSize(space.maxSize)}`"
        >
          <a-progress
            type="circle"
            :size="42"
            :percent="((space.totalSize * 100) / space.maxSize).toFixed(1)"
          />
        </a-tooltip>
      </a-space>
    </a-flex>
    <div style="margin-bottom: 16px" />
    <!-- 图片列表 -->
    <picture-list :data-list="dataList" :loading="loading" :show-op="true" :on-reload="loadData" />
    <a-pagination
      style="text-align: right"
      v-model:current="searchParams.current"
      v-model:page-size="searchParams.pageSize"
      :total="total"
      @change="doPageChange"
    />
  </div>
</template>

<style scoped></style>
