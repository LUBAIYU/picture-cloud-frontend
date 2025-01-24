<script setup lang="ts">
import { ref } from 'vue'
import { uploadPictureUsingPost } from '@/api/tupianmokuai.ts'
import { message } from 'ant-design-vue'

interface Props {
  imageUrl?: string
  picture?: API.PictureVo
  spaceId?: number
  onSuccess?: (newPicture: API.PictureVo) => void
}

const props = defineProps<Props>()

// 编辑器组件的引用
const cropperRef = ref()
const loading = ref(false)
const isOpen = ref(false)

// 向左旋转
const rotateLeft = () => {
  cropperRef.value.rotateLeft()
}

// 向右旋转
const rotateRight = () => {
  cropperRef.value.rotateRight()
}

// 缩放
const changeScale = (num: number) => {
  cropperRef.value.changeScale(num)
}

// 确认裁剪
const handleConfirm = () => {
  cropperRef.value.getCropBlob((blob: Blob) => {
    // blob 为已裁切的文件
    const fileName = (props.picture?.picName || 'image') + '.png'
    const file = new File([blob], fileName, { type: blob.type })
    // 上传裁切后的图片
    handleUpload({ file })
  })
}

// 打开弹窗
const openModal = () => {
  isOpen.value = true
}

// 关闭弹窗
const closeModal = () => {
  isOpen.value = false
}

// 上传图片
const handleUpload = async ({ file }: any) => {
  loading.value = true
  try {
    const params: API.PictureUploadDto = props.picture ? { picId: props.picture.picId } : {}
    params.spaceId = props.spaceId
    const res = await uploadPictureUsingPost(params, {}, file)
    if (res.code === 0 && res.data) {
      message.success('图片上传成功')
      // 将上传成功的图片信息传递给父组件
      props?.onSuccess?.(res.data)
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

defineExpose({
  openModal,
})
</script>

<template>
  <a-modal
    class="image-cropper"
    v-model:open="isOpen"
    title="编辑图片"
    :footer="false"
    @cancel="closeModal"
  >
    <vue-cropper
      ref="cropperRef"
      :img="props.imageUrl"
      :autoCrop="true"
      :fixedBox="false"
      :centerBox="true"
      :canMoveBox="true"
      :info="true"
      outputType="png"
    />
    <div style="margin-bottom: 16px" />
    <!-- 图片操作 -->
    <div class="image-cropper-actions">
      <a-space>
        <a-button @click="rotateLeft">向左旋转</a-button>
        <a-button @click="rotateRight">向右旋转</a-button>
        <a-button @click="changeScale(1)">放大</a-button>
        <a-button @click="changeScale(-1)">缩小</a-button>
        <a-button type="primary" :loading="loading" @click="handleConfirm">确认</a-button>
      </a-space>
    </div>
  </a-modal>
</template>

<style>
.image-cropper {
  text-align: center;
}

.image-cropper .vue-cropper {
  height: 400px;
}
</style>
