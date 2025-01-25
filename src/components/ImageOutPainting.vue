<script setup lang="ts">
import { ref } from 'vue'
import {
  createOutPaintingTaskUsingPost,
  getOutPaintingTaskUsingGet,
  uploadPictureByUrlUsingPost,
} from '@/api/tupianmokuai.ts'
import { message } from 'ant-design-vue'

interface Props {
  picture?: API.PictureVo
  spaceId?: number
  onSuccess?: (newPicture: API.PictureVo) => void
}

const props = defineProps<Props>()

const loading = ref(false)
const isOpen = ref(false)
const resultImageUrl = ref<string>('')
const taskId = ref<string>('')

// 打开弹窗
const openModal = () => {
  isOpen.value = true
}

// 关闭弹窗
const closeModal = () => {
  isOpen.value = false
}

// 上传图片
const handleUpload = async () => {
  loading.value = true
  try {
    const params: API.PictureUploadDto = {
      fileUrl: resultImageUrl.value,
      spaceId: props.spaceId,
    }
    if (props.picture) {
      params.picId = props.picture.picId
    }
    const res = await uploadPictureByUrlUsingPost(params)
    if (res.code === 0 && res.data) {
      message.success('图片上传成功')
      // 将上传成功的图片信息传递给父组件
      props?.onSuccess?.(res.data)
      // 关闭弹窗
      closeModal()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error('图片上传失败')
  } finally {
    loading.value = false
  }
}

// 创建任务
const createTask = async () => {
  if (!props.picture?.picId) {
    return
  }
  const res = await createOutPaintingTaskUsingPost({
    pictureId: props.picture.picId,
    // 根据需要选择扩图参数
    parameters: {
      xScale: 2,
      yScale: 2,
    },
  })
  if (res.code === 0 && res.data) {
    message.success('创建任务成功，请耐心等待，不要退出界面')
    taskId.value = res.data.output.taskId
    // 开启轮询
    startPolling()
  } else {
    message.error('创建任务失败，' + res.message)
  }
}

// 轮询定时器
let pollingTimer: NodeJS.Timeout = null

// 轮询（每3s一次）
const startPolling = () => {
  if (!taskId.value) {
    return
  }
  pollingTimer = setInterval(async () => {
    try {
      const res = await getOutPaintingTaskUsingGet({
        taskId: taskId.value,
      })
      if (res.code === 0 && res.data) {
        const taskResult = res.data.output
        if (taskResult.taskStatus === 'SUCCEEDED') {
          message.success('扩图任务成功')
          resultImageUrl.value = taskResult.outputImageUrl
          clearPolling()
        } else if (taskResult.taskStatus === 'FAILED') {
          message.error('扩图任务失败')
          clearPolling()
        }
      }
    } catch (error: any) {
      console.error('轮询任务失败', error)
      message.error('轮询任务失败，' + error.message)
      clearPolling()
    }
  }, 3000)
}

// 清理轮询
const clearPolling = () => {
  if (pollingTimer) {
    clearInterval(pollingTimer)
    pollingTimer = null
    taskId.value = null
  }
}

defineExpose({
  openModal,
})
</script>

<template>
  <a-modal
    class="image-out-painting"
    v-model:open="isOpen"
    title="AI 扩图"
    :footer="false"
    @cancel="closeModal"
  >
    <a-row gutter="16">
      <a-col span="12">
        <h4>原始图片</h4>
        <a-image :src="picture?.picUrl" :alt="picture?.picName" style="max-width: 100%" />
      </a-col>
      <a-col span="12">
        <h4>扩图结果</h4>
        <a-image
          v-if="resultImageUrl"
          :src="resultImageUrl"
          :alt="picture?.picName"
          style="max-width: 100%"
        />
      </a-col>
    </a-row>
    <div style="margin-bottom: 16px" />
    <a-flex justify="center" gap="16">
      <a-button type="primary" ghost @click="createTask" :loading="!!taskId"> 生成图片</a-button>
      <a-button v-if="resultImageUrl" type="primary" @click="handleUpload" :loading="loading">
        应用结果
      </a-button>
    </a-flex>
  </a-modal>
</template>

<style>
.image-out-painting {
  text-align: center;
}
</style>
