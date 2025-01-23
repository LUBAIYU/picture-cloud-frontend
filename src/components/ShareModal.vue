<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title?: string
  link?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '分享图片',
  link: 'https://github.com/LUBAIYU/picture-cloud-backend',
})

const isOpen = ref(false)

// 打开弹窗
const openModal = () => {
  isOpen.value = true
}

// 关闭弹窗
const closeModal = () => {
  isOpen.value = false
}

defineExpose({
  openModal,
})
</script>

<template>
  <div id="share-modal">
    <a-modal v-model:open="isOpen" :title="props.title" :footer="false" @cancel="closeModal">
      <h4>复制分享链接</h4>
      <a-typography-link copyable>
        {{ link }}
      </a-typography-link>
      <div style="margin-bottom: 16px" />
      <h4>手机扫码查看</h4>
      <a-qrcode :value="link" />
    </a-modal>
  </div>
</template>

<style scoped></style>
