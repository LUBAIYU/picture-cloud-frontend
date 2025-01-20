<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { getTagByIdUsingGet, updateTagByIdUsingPut } from '@/api/biaoqianmokuai.ts'

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

const formData = ref<API.Tag>({})

const doSubmit = async () => {
  const res = await updateTagByIdUsingPut(formData.value)
  if (res.code === 0) {
    message.success('修改成功')
    props.closeModal()
    props.refreshData()
  } else {
    message.error(res.message)
  }
}

const getTagInfo = async (id: number) => {
  if (!id) {
    return
  }
  const res = await getTagByIdUsingGet({ id })
  if (res.code === 0) {
    formData.value = res.data as API.Tag
  } else {
    message.error(res.message)
  }
}

defineExpose({
  getTagInfo,
})
</script>

<template>
  <div id="tag-add-view">
    <a-modal
      title="编辑标签"
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
        <a-form-item label="标签名称">
          <a-input v-model:value="formData.name" />
        </a-form-item>
        <a-form-item label="使用次数">
          <a-input v-model:value="formData.useCount" disabled />
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
