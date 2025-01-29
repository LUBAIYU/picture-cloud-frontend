<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { getUserAnalyzeUsingPost } from '@/api/kongjianfenximokuai.ts'
import { message } from 'ant-design-vue'
import VChart from 'vue-echarts'
import 'echarts'
import 'echarts-wordcloud'

interface Props {
  queryAll?: boolean
  queryPublic?: boolean
  spaceId?: number
}

const props = withDefaults(defineProps<Props>(), {
  queryAll: false,
  queryPublic: false,
})

const dataList = ref<API.SpaceUserAnalyzeVo[]>([])
const loading = ref(false)
const userId = ref<string>('')
const timeDimension = ref<'day' | 'week' | 'month'>('day')

const timeDimensionOptions = [
  {
    label: '日',
    value: 'day',
  },
  {
    label: '周',
    value: 'week',
  },
  {
    label: '月',
    value: 'month',
  },
]

// 获取数据
const fetchData = async () => {
  loading.value = true
  const res = await getUserAnalyzeUsingPost({
    queryAll: props.queryAll,
    queryPublic: props.queryPublic,
    spaceId: props.spaceId,
    userId: userId.value,
    timeDimension: timeDimension.value,
  })
  if (res.code === 0 && res.data) {
    dataList.value = (res.data as API.SpaceUserAnalyzeVo[]) ?? []
  } else {
    message.error('获取数据失败，' + res.message)
  }
  loading.value = false
}

// 使用计算属性动态获取配置
const options = computed(() => {
  const periods = dataList.value.map((item) => item.period) // 时间区间
  const counts = dataList.value.map((item) => item.count) // 上传数量

  return {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: periods, name: '时间区间' },
    yAxis: { type: 'value', name: '上传数量' },
    series: [
      {
        name: '上传数量',
        type: 'line',
        data: counts,
        smooth: true, // 平滑折线
        emphasis: {
          focus: 'series',
        },
      },
    ],
  }
})

// 搜索
const doSearch = (value: string) => {
  userId.value = value
}

// 监听变量，改变时触发函数
watchEffect(() => fetchData())
</script>

<template>
  <div id="space-user-analyze">
    <a-card title="用户上传分析">
      <v-chart :option="options" style="height: 320px; max-width: 100%" :loading="loading" />
      <template #extra>
        <a-space>
          <a-segmented v-model:value="timeDimension" :options="timeDimensionOptions" />
          <a-input-search
            place-holder="请输入用户ID"
            enter-button="搜索用户"
            @search="doSearch"
            allow-clear
          />
        </a-space>
      </template>
    </a-card>
  </div>
</template>

<style scoped></style>
