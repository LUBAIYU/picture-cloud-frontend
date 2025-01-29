<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { getSizeAnalyzeUsingPost } from '@/api/kongjianfenximokuai.ts'
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

const dataList = ref<API.SpaceSizeAnalyzeVo[]>([])
const loading = ref(false)

// 获取数据
const fetchData = async () => {
  loading.value = true
  const res = await getSizeAnalyzeUsingPost({
    queryAll: props.queryAll,
    queryPublic: props.queryPublic,
    spaceId: props.spaceId,
  })
  if (res.code === 0 && res.data) {
    dataList.value = (res.data as API.SpaceSizeAnalyzeVo[]) ?? []
  } else {
    message.error('获取数据失败，' + res.message)
  }
  loading.value = false
}

// 使用计算属性动态获取配置
const options = computed(() => {
  const pieData = dataList.value.map((item) => ({
    name: item.sizeRange,
    value: item.count,
  }))

  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      top: 'bottom',
    },
    series: [
      {
        name: '图片大小',
        type: 'pie',
        radius: '50%',
        data: pieData,
      },
    ],
  }
})

// 监听变量，改变时触发函数
watchEffect(() => fetchData())
</script>

<template>
  <div id="space-size-analyze">
    <a-card title="空间图片大小分析">
      <v-chart :option="options" style="height: 320px; max-width: 100%" :loading="loading" />
    </a-card>
  </div>
</template>

<style scoped></style>
