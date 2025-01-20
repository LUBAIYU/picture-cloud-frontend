<script setup lang="ts">
import { ref } from 'vue'
import { getCategoryByIdUsingGet, updateCategoryByIdUsingPut } from '@/api/fenleimokuai.ts'
import { message } from 'ant-design-vue'

interface Props {
  isOpen?: boolean
  closeModal?: () => void
  refreshData?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  closeModal: () => {},
  refreshData: () => {},
})

const formData = ref<API.Category>({})

const doSubmit = async () => {
  const res = await updateCategoryByIdUsingPut(formData.value)
  if (res.code === 0) {
    message.success('修改成功')
    props.closeModal()
    props.refreshData()
  } else {
    message.error(res.message)
  }
}

const getCategoryInfo = async (id: number) => {
  if (!id) {
    return
  }
  const res = await getCategoryByIdUsingGet({ id })
  if (res.code === 0) {
    formData.value = res.data as API.Category
  } else {
    message.error(res.message)
  }
}

defineExpose({
  getCategoryInfo,
})
</script>

<template>
  <div id="category-add-view">
    <a-modal
      title="编辑分类"
      v-model:open="props.isOpen"
      ok-text="提交"
      cancel-text="取消"
      @cancel="props.closeModal()"
      @ok="doSubmit"
    >
      <a-form :model="formData">
        <a-form-item label="ID">
          <a-input v-model:value="formData.id" disabled />
        </a-form-item>
        <a-form-item label="分类名称">
          <a-input v-model:value="formData.name" />
        </a-form-item>
        <a-form-item label="创建时间">
          <a-input v-model:value="formData.createTime" disabled />
        </a-form-item>
        <a-form-item label="更新时间">
          <a-input v-model:value="formData.updateTime" disabled />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped></style>
