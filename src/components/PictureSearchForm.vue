<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import dayjs from 'dayjs'
import { listCategoryUsingGet } from '@/api/fenleimokuai.ts'
import { message } from 'ant-design-vue'
import { listTagUsingGet } from '@/api/biaoqianmokuai.ts'

interface Props {
  onSearch?: (searchParams: API.PicturePageDto) => void
}

const props = defineProps<Props>()

// 搜索条件
const searchParams = reactive<API.PicturePageDto>({
  current: 1,
  pageSize: 10,
})

// 搜索
const doSearch = () => {
  props.onSearch?.(searchParams)
}

const dateRange = ref<[]>([])
const categoryOptions = ref([])
const tagOptions = ref([])

/**
 * 时间范围预设
 */
const rangePresets = ref([
  { label: '过去一周', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: '过去两周', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: '过去一个月', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: '过去三个月', value: [dayjs().add(-90, 'd'), dayjs()] },
])

/**
 * 日期范围更改时触发
 */
const onRangeChange = (dates: any[], dateStrings: string[]) => {
  if (dates?.length >= 2) {
    searchParams.startEditTime = dates[0].toDate()
    searchParams.endEditTime = dates[1].toDate()
  } else {
    searchParams.startEditTime = undefined
    searchParams.endEditTime = undefined
  }
}

// 重置
const doReset = () => {
  Object.keys(searchParams).forEach((key) => {
    searchParams[key] = undefined
  })
  dateRange.value = []
  // 搜索
  props.onSearch?.(searchParams)
}

// 获取分类列表
const getCategoryList = async () => {
  const res = await listCategoryUsingGet()
  if (res.code === 0 && res.data) {
    categoryOptions.value = res.data.map((item: any) => {
      return {
        label: item.name,
        value: item.name,
      }
    })
  } else {
    message.error(res.message)
  }
}

// 获取标签列表
const getTagList = async () => {
  const res = await listTagUsingGet()
  if (res.code === 0 && res.data) {
    tagOptions.value = res.data.map((item: any) => {
      return {
        label: item.name,
        value: item.name,
      }
    })
  } else {
    message.error(res.message)
  }
}

onMounted(() => getCategoryList())
onMounted(() => getTagList())
</script>

<template>
  <div id="picture-search-form">
    <a-form layout="inline" :model="searchParams" @finish="doSearch" style="margin-bottom: 20px">
      <a-form-item label="关键词">
        <a-input
          v-model:value="searchParams.searchText"
          placeholder="请输入名称或简介"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="分类" name="category">
        <a-select
          v-model:value="searchParams.category"
          style="width: 180px"
          :options="categoryOptions"
          placeholder="请输入分类"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="标签" name="tagIdList">
        <a-select
          v-model:value="searchParams.tagList"
          style="width: 180px"
          :options="tagOptions"
          mode="tags"
          placeholder="请输入标签"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="编辑时间" name="dateRange">
        <a-range-picker
          v-model:value="dateRange"
          style="width: 400px"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          :placeholder="['编辑开始时间', '编辑结束时间']"
          :presets="rangePresets"
          @change="onRangeChange"
        />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" html-type="submit" style="width: 96px">搜索</a-button>
          <a-button html-type="reset" @click="doReset">重置</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
#picture-search-form .ant-form-item {
  margin-top: 8px;
}
</style>
