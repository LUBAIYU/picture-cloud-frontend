<script lang="ts" setup>
import { ref } from 'vue'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type { UploadProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { uploadAvatarUsingPost } from '@/api/yonghumokuai.ts'

interface Props {
  user?: API.User
  onSuccess?: (newUserAvatar: string) => void
}

const props = defineProps<Props>()

const loading = ref<boolean>(false)

const beforeUpload = (file: UploadProps['fileList'][number]) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('不支持上传该格式的图片，推荐 jpg 或 png')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('不能上传超过 2M 的图片')
  }
  return isJpgOrPng && isLt2M
}

// 上传头像
const handleUpload = async ({ file }: any) => {
  loading.value = true
  try {
    const res = await uploadAvatarUsingPost({}, file)
    if (res.code === 0 && res.data) {
      message.success('上传成功')
      // 将上传成功的图片信息传递给父组件
      props?.onSuccess?.(res.data as string)
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error('上传失败')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div id="avatar-upload">
    <a-upload
      list-type="picture-card"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      :custom-request="handleUpload"
    >
      <img
        v-if="user?.userAvatar"
        :src="user?.userAvatar"
        style="width: 100%; height: 100%"
        alt="avatar"
      />
      <div v-else>
        <loading-outlined v-if="loading"></loading-outlined>
        <plus-outlined v-else></plus-outlined>
        <div class="ant-upload-text">点击上传图片</div>
      </div>
    </a-upload>
  </div>
</template>

<style scoped></style>
