<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { uploadPictureByBatchUsingPost } from '@/api/tupianmokuai.ts'
import { message } from 'ant-design-vue'

const router = useRouter()

const form = ref<API.PictureBatchDto>({})
const loading = ref<boolean>(false)

/**
 * 提交表单
 */
const handleSubmit = async () => {
  loading.value = true
  const res = await uploadPictureByBatchUsingPost(form.value)
  if (res.code === 0 && res.data) {
    message.success(`批量创建成功，共 ${res.data} 张`)
    // 跳转到首页
    await router.push('/')
  } else {
    message.error(res.message)
  }
  loading.value = false
}
</script>

<template>
  <div id="pictureAddView">
    <h2 style="margin-bottom: 16px">批量创建图片</h2>
    <a-form layout="vertical" :model="form" @finish="handleSubmit">
      <a-form-item label="关键词" name="searchText">
        <a-input v-model:value="form.searchText" placeholder="请输入关键词" />
      </a-form-item>
      <a-form-item label="抓取数量" name="count">
        <a-input-number
          v-model:value="form.count"
          placeholder="请输入数量"
          :min="1"
          :max="30"
          style="min-width: 180px"
        />
      </a-form-item>
      <a-form-item label="名称前缀" name="namePrefix">
        <a-input
          v-model:value="form.namePrefix"
          placeholder="请输入名称前缀，会自动补充序号"
          allow-clear
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%" :loading="loading">
          执行任务
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
#pictureAddView {
  max-width: 720px;
  margin: 0 auto;
}
</style>
