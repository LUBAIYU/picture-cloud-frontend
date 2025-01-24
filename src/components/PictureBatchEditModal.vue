<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { listTagUsingGet } from '@/api/biaoqianmokuai.ts'
import { listCategoryUsingGet } from '@/api/fenleimokuai.ts'
import { editPictureByBatchUsingPut } from '@/api/tupianmokuai.ts'

interface Props {
  isOpen?: boolean
  pictureList?: API.PictureVo[]
  spaceId?: number
  closeModal?: () => void
  onSuccess?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  pictureList: () => [],
  closeModal: () => {},
  onSuccess: () => {},
})

const loading = ref(false)
const formData = ref<API.PictureEditByBatchDto>({})
const categoryOptions = ref([])
const tagOptions = ref([])

/**
 * 提交表单
 */
const handleSubmit = async () => {
  loading.value = true
  if (!props.pictureList) {
    loading.value = false
    return
  }
  const res = await editPictureByBatchUsingPut({
    pictureIdList: props.pictureList.map((picture) => picture.picId) as any,
    spaceId: props.spaceId,
    ...formData.value,
  })
  if (res.code === 0 && res.data) {
    message.success('操作成功')
    props.closeModal?.()
    props.onSuccess?.()
  } else {
    message.error('操作失败，' + res.message)
  }
  loading.value = false
}

// 获取分类列表
const getCategoryList = async () => {
  const res = await listCategoryUsingGet()
  if (res.code === 0 && res.data) {
    categoryOptions.value = res.data.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      }
    })
  } else {
    message.error(res.message)
  }
}

// 获取标签列表
const getTagList = async () => {
  const res = await listTagUsingGet()
  if (res.code === 0 && res.data) {
    tagOptions.value = res.data.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      }
    })
  } else {
    message.error(res.message)
  }
}

onMounted(() => getCategoryList())
onMounted(() => getTagList())
</script>

<template>
  <div id="picture-batch-edit-modal">
    <a-modal v-model:open="props.isOpen" title="批量编辑图片" :footer="false" @cancel="closeModal">
      <a-typography-paragraph type="secondary">* 只对当前页面的图片生效</a-typography-paragraph>
      <a-form layout="vertical" :model="formData" @finish="handleSubmit">
        <a-form-item label="分类" name="categoryId">
          <a-select
            v-model:value="formData.categoryId"
            :options="categoryOptions"
            placeholder="请输入分类"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="标签" name="tagIdList">
          <a-select
            v-model:value="formData.tagIdList"
            :options="tagOptions"
            mode="tags"
            placeholder="请输入标签"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="命名规则" name="nameRule">
          <a-input
            v-model:value="formData.nameRule"
            placeholder="请输入命名规则，输入 {序号} 可动态生成"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" style="width: 100%" :loading="loading">
            提交
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped></style>
