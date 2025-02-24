<script setup lang="ts">
import { ref } from 'vue'
import { exchangeVipUsingPost } from '@/api/yonghumokuai.ts'
import { message } from 'ant-design-vue'

const formData = ref<API.VipExchangeDto>({})
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  const res = await exchangeVipUsingPost({
    ...formData.value,
  })
  if (res.code === 0 && res.data) {
    message.success('兑换成功')
  } else {
    message.error(res.message)
  }
  loading.value = false
}
</script>

<template>
  <div id="user-vip-exchange-view">
    <h2 style="margin-bottom: 16px">会员码兑换</h2>
    <!-- 兑换码表单 -->
    <a-form name="formData" layout="vertical" :model="formData" @finish="handleSubmit">
      <a-form-item label="兑换码" name="vipCode">
        <a-input v-model:value="formData.vipCode" placeholder="请输入会员兑换码" allow-clear />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%" :loading="loading">
          兑换
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
#user-vip-exchange-view {
  max-width: 720px;
  margin: 0 auto;
}
</style>
