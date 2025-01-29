<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { getTagAnalyzeUsingPost } from '@/api/kongjianfenximokuai.ts'
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

const dataList = ref<API.SpaceTagAnalyzeVo[]>([])
const loading = ref(false)

// 获取数据
const fetchData = async () => {
  loading.value = true
  const res = await getTagAnalyzeUsingPost({
    queryAll: props.queryAll,
    queryPublic: props.queryPublic,
    spaceId: props.spaceId,
  })
  if (res.code === 0 && res.data) {
    dataList.value = (res.data as API.SpaceTagAnalyzeVo[]) ?? []
  } else {
    message.error('获取数据失败，' + res.message)
  }
  loading.value = false
}

// 使用计算属性动态获取配置
const options = computed(() => {
  const tagData = dataList.value.map((item) => ({
    name: item.tag,
    value: item.count,
  }))

  return {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => `${params.name}: ${params.value} 次`,
    },
    series: [
      {
        type: 'wordCloud',
        gridSize: 10,
        sizeRange: [12, 50], // 字体大小范围
        rotationRange: [-90, 90],
        shape: 'circle',
        textStyle: {
          color: () =>
            `rgb(${Math.round(Math.random() * 255)}, ${Math.round(
              Math.random() * 255,
            )}, ${Math.round(Math.random() * 255)})`, // 随机颜色
        },
        data: tagData,
      },
    ],
  }
})

// 监听变量，改变时触发函数
watchEffect(() => fetchData())
</script>

<template>
  <div id="space-tag-analyze">
    <a-card title="图库标签词云">
      <v-chart :option="options" style="height: 320px; max-width: 100%" :loading="loading" />
    </a-card>
  </div>
</template>

<style scoped></style>
