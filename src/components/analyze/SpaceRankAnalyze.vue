<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { message } from 'ant-design-vue'
import VChart from 'vue-echarts'
import 'echarts'
import 'echarts-wordcloud'
import { getSpaceAnalyzeUsingPost } from '@/api/kongjianfenximokuai.ts'

interface Props {
  queryAll?: boolean
  queryPublic?: boolean
  spaceId?: number
}

const props = withDefaults(defineProps<Props>(), {
  queryAll: false,
  queryPublic: false,
})

const dataList = ref<API.Space[]>([])
const loading = ref(false)

// 获取数据
const fetchData = async () => {
  loading.value = true
  const res = await getSpaceAnalyzeUsingPost({
    queryAll: props.queryAll,
    queryPublic: props.queryPublic,
    spaceId: props.spaceId,
    topN: 10, // 默认10条
  })
  if (res.code === 0 && res.data) {
    dataList.value = (res.data as API.Space[]) ?? []
  } else {
    message.error('获取数据失败，' + res.message)
  }
  loading.value = false
}

// 使用计算属性动态获取配置
const options = computed(() => {
  const spaceNames = dataList.value.map((item) => item.spaceName)
  const usageData = dataList.value.map((item) => (item.totalSize / (1024 * 1024)).toFixed(2)) // 转为 MB

  return {
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: spaceNames,
    },
    yAxis: {
      type: 'value',
      name: '空间使用量 (MB)',
    },
    series: [
      {
        name: '空间使用量 (MB)',
        type: 'bar',
        data: usageData,
        itemStyle: {
          color: '#5470C6', // 自定义柱状图颜色
        },
      },
    ],
  }
})

// 监听变量，改变时触发函数
watchEffect(() => fetchData())
</script>

<template>
  <div id="space-rank-analyze">
    <a-card title="空间使用排行">
      <v-chart :option="options" style="height: 320px; max-width: 100%" :loading="loading" />
    </a-card>
  </div>
</template>

<style scoped></style>
