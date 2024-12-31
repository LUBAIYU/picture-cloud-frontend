<script setup lang="ts">
import PictureUpload from '@/components/PictureUpload.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  editPictureUsingPut,
  getPictureVoByIdUsingGet,
  listPictureTagCategoryUsingGet,
} from '@/api/tupianmokuai.ts'
import { message } from 'ant-design-vue'
import UrlPictureUpload from '@/components/UrlPictureUpload.vue'

const route = useRoute()
const router = useRouter()

const picture = ref<API.PictureVo>()
const onSuccess = (newPicture: API.PictureVo) => {
  picture.value = newPicture
  form.value.picName = newPicture.picName
}

const form = ref<API.PictureEditDto>({})

const categoryOptions = ref<string[]>([])
const tagOptions = ref<string[]>([])
const uploadType = ref<'file' | 'url'>('file')

/**
 * 提交表单
 */
const handleSubmit = async (values: any) => {
  const pictureId = picture.value?.picId
  if (!pictureId) {
    return
  }
  const res = await editPictureUsingPut({
    picId: pictureId,
    ...values,
  })
  if (res.code === 0 && res.data) {
    message.success('创建成功')
    // 跳转到图片详情页
    await router.push(`/picture/detail/${pictureId}`)
  } else {
    message.error(res.message)
  }
}

// 获取标签和分类选项
const getTagCategoryOptions = async () => {
  const res = await listPictureTagCategoryUsingGet()
  if (res.code === 0 && res.data) {
    categoryOptions.value = (res.data.categoryList ?? []).map((data: string) => {
      return {
        label: data,
        value: data,
      }
    })
    tagOptions.value = (res.data.tagList ?? []).map((data: string) => {
      return {
        label: data,
        value: data,
      }
    })
  } else {
    message.error(res.message)
  }
}

// 获取旧数据
const getOldPicture = async () => {
  // 获取图片ID
  const id = route.query?.id
  if (id) {
    const res = await getPictureVoByIdUsingGet({
      picId: id,
    })
    if (res.code === 0 && res.data) {
      const data = res.data
      picture.value = data
      form.value.picName = data.picName
      form.value.introduction = data.introduction
      form.value.category = data.category
      form.value.tagList = data.tagList
    }
  }
}

onMounted(() => getTagCategoryOptions())
onMounted(() => getOldPicture())
</script>

<template>
  <div id="pictureAddView">
    <h2 style="margin-bottom: 16px">
      {{ route.query?.id ? '修改图片' : '创建图片' }}
    </h2>
    <!-- 选择上传方式 -->
    <a-tabs v-model:active-key="uploadType">
      <a-tab-pane key="file" tab="文件上传">
        <!-- 图片上传组件 -->
        <PictureUpload :picture="picture" :on-success="onSuccess" />
      </a-tab-pane>
      <a-tab-pane key="url" tab="URL上传" force-render>
        <!-- URL上传组件 -->
        <UrlPictureUpload :picture="picture" :on-success="onSuccess" />
      </a-tab-pane>
    </a-tabs>
    <a-form v-if="picture" layout="vertical" :model="form" @finish="handleSubmit">
      <a-form-item label="名称" name="picName">
        <a-input v-model:value="form.picName" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item label="简介" name="introduction">
        <a-textarea
          v-model:value="form.introduction"
          placeholder="请输入简介"
          :rows="2"
          autoSize
          allowClear
        />
      </a-form-item>
      <a-form-item label="分类" name="category">
        <a-auto-complete
          v-model:value="form.category"
          :options="categoryOptions"
          placeholder="请输入分类"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="标签" name="tagList">
        <a-select
          v-model:value="form.tagList"
          :options="tagOptions"
          mode="tags"
          placeholder="请输入标签"
          allow-clear
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">创建</a-button>
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
