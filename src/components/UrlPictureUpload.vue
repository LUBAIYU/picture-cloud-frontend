<script setup lang="ts">
import { ref } from 'vue'
import { uploadPictureByUrlUsingPost } from '@/api/tupianmokuai.ts'
import { message } from 'ant-design-vue'

interface Props {
  picture?: API.PictureVo
  onSuccess?: (newPicture: API.PictureVo) => void
}

const props = defineProps<Props>()

const fileUrl = ref<string>('')
const loading = ref<boolean>(false)

// 上传图片
const handleUpload = async () => {
  loading.value = true
  try {
    const params: API.PictureUploadDto = {
      fileUrl: fileUrl.value,
    }
    if (props.picture) {
      params.picId = props.picture.picId
    }
    const res = await uploadPictureByUrlUsingPost(params)
    if (res.code === 0 && res.data) {
      message.success('图片上传成功')
      // 将上传成功的图片信息传递给父组件
      props?.onSuccess?.(res.data)
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error('图片上传失败')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div id="urlPictureUpload">
    <a-input-group compact>
      <a-input v-model:value="fileUrl" style="width: calc(100% - 120px)" />
      <a-button type="primary" style="width: 120px" :loading="loading" @click="handleUpload">
        提交
      </a-button>
    </a-input-group>
    <div class="img-wrapper">
      <img v-if="picture?.picUrl" :src="picture?.picUrl" alt="avatar" />
    </div>
  </div>
</template>

<style scoped>
#urlPictureUpload {
  margin-bottom: 16px;
}

#urlPictureUpload img {
  max-width: 100%;
  max-height: 480px;
}

#urlPictureUpload .img-wrapper {
  text-align: center;
  margin-top: 16px;
}
</style>
