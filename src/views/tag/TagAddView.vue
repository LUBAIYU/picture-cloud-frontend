<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { addBatchTagsUsingPost } from '@/api/biaoqianmokuai.ts'

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

const name = ref<string>('')

const submit = async () => {
  if (name.value === '') {
    return
  }
  const res = await addBatchTagsUsingPost([name.value])
  if (res.code === 0) {
    message.success('新增成功')
    props.closeModal()
    props.refreshData()
    // 清空表单
    name.value = ''
  } else {
    message.error(res.message)
  }
}
</script>

<template>
  <div id="tag-add-view">
    <a-modal
      title="新建标签"
      v-model:open="props.isOpen"
      ok-text="提交"
      cancel-text="取消"
      @cancel="props.closeModal()"
      @ok="submit"
    >
      <a-form>
        <a-form-item label="标签名称">
          <a-input v-model:value="name" placeholder="请输入标签名称" allow-clear />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped></style>
