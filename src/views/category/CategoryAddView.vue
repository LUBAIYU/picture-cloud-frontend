<script setup lang="ts">
import { ref } from 'vue'
import { addBatchCategoryUsingPost } from '@/api/fenleimokuai.ts'
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

const name = ref<string>('')

const submit = async () => {
  if (name.value === '') {
    return
  }
  const res = await addBatchCategoryUsingPost([name.value])
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
  <div id="category-add-view">
    <a-modal
      title="新建分类"
      v-model:open="props.isOpen"
      ok-text="提交"
      cancel-text="取消"
      @cancel="props.closeModal()"
      @ok="submit"
    >
      <a-form>
        <a-form-item label="分类名称">
          <a-input v-model:value="name" placeholder="请输入分类名称" allow-clear />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped></style>
