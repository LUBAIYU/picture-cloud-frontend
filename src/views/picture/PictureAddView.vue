<script setup lang="ts">
import PictureUpload from '@/components/PictureUpload.vue'
import { computed, h, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPictureVoByIdUsingGet, updatePictureUsingPut } from '@/api/tupianmokuai.ts'
import { message } from 'ant-design-vue'
import UrlPictureUpload from '@/components/UrlPictureUpload.vue'
import { listCategoryUsingGet } from '@/api/fenleimokuai.ts'
import { listTagUsingGet } from '@/api/biaoqianmokuai.ts'
import { EditOutlined, FullscreenOutlined } from '@ant-design/icons-vue'
import ImageCropper from '@/components/ImageCropper.vue'
import ImageOutPainting from '@/components/ImageOutPainting.vue'

const route = useRoute()
const router = useRouter()

const picture = ref<API.PictureVo>()
const onSuccess = (newPicture: API.PictureVo) => {
  picture.value = newPicture
  form.value.picName = newPicture.picName
}

const form = ref<API.PictureUpdateDto>({})

const categoryOptions = ref([])
const tagOptions = ref([])
const uploadType = ref<'file' | 'url'>('file')
const loading = ref(false)

const spaceId = computed(() => {
  return route.query?.spaceId
})

/**
 * 提交表单
 */
const handleSubmit = async (values: any) => {
  loading.value = true
  const pictureId = picture.value?.picId
  if (!pictureId) {
    return
  }
  const res = await updatePictureUsingPut({
    picId: pictureId,
    spaceId: spaceId.value,
    ...values,
  })
  if (res.code === 0 && res.data) {
    const successMsg = route.query?.id ? '修改成功' : '创建成功'
    message.success(successMsg)
    // 跳转到图片详情页
    await router.push(`/picture/detail/${pictureId}`)
  } else {
    message.error(res.message)
  }
  loading.value = false
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
      // 处理分类回显
      const categoryOption = categoryOptions.value.find((item: any) => item.label === data.category)
      if (categoryOption) {
        form.value.categoryId = categoryOption.value
      }
      // 处理标签回显
      const tagIds: number[] = []
      data.tagList.forEach((item: any) => {
        const tagOption = tagOptions.value.find((tag: any) => tag.label === item)
        if (tagOption) {
          tagIds.push(tagOption.value)
        }
      })
      form.value.tagIdList = tagIds
    }
  }
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

// ----- 编辑图片 -------
const imageCropperRef = ref(null)

const doEditPicture = () => {
  if (imageCropperRef.value) {
    imageCropperRef.value.openModal()
  }
}

const onCropperSuccess = (newPicture: API.PictureVo) => {
  picture.value = newPicture
}

// ----- AI 扩图 --------
const imageOutPaintingRef = ref(null)

const doOutPaintingPicture = () => {
  if (imageOutPaintingRef.value) {
    imageOutPaintingRef.value.openModal()
  }
}

const onOutPaintingSuccess = (newPicture: API.PictureVo) => {
  picture.value = newPicture
}

onMounted(() => getCategoryList())
onMounted(() => getTagList())
onMounted(() => getOldPicture())
</script>

<template>
  <div id="pictureAddView">
    <h2 style="margin-bottom: 16px">
      {{ route.query?.id ? '修改图片' : '创建图片' }}
    </h2>
    <a-typography-paragraph v-if="spaceId" type="secondary">
      保存至空间：<a :href="`/space/detail/${spaceId}`" target="_blank">{{ spaceId }}</a>
    </a-typography-paragraph>
    <!-- 选择上传方式 -->
    <a-tabs v-model:active-key="uploadType">
      <a-tab-pane key="file" tab="文件上传">
        <!-- 图片上传组件 -->
        <PictureUpload :picture="picture" :spaceId="spaceId" :on-success="onSuccess" />
      </a-tab-pane>
      <a-tab-pane key="url" tab="URL上传" force-render>
        <!-- URL上传组件 -->
        <UrlPictureUpload :picture="picture" :spaceId="spaceId" :on-success="onSuccess" />
      </a-tab-pane>
    </a-tabs>
    <!-- 图片编辑 -->
    <div v-if="picture" class="edit-bar">
      <a-space>
        <a-button :icon="h(EditOutlined)" @click="doEditPicture">编辑图片</a-button>
        <a-button type="primary" :icon="h(FullscreenOutlined)" @click="doOutPaintingPicture">
          AI 扩图
        </a-button>
      </a-space>
      <image-cropper
        ref="imageCropperRef"
        :picture="picture"
        :image-url="picture?.picUrl"
        :space-id="spaceId"
        :on-success="onCropperSuccess"
      />
      <image-out-painting
        ref="imageOutPaintingRef"
        :picture="picture"
        :space-id="spaceId"
        :on-success="onOutPaintingSuccess"
      />
    </div>
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
      <a-form-item label="分类" name="categoryId">
        <a-select
          v-model:value="form.categoryId"
          :options="categoryOptions"
          placeholder="请输入分类"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="标签" name="tagIdList">
        <a-select
          v-model:value="form.tagIdList"
          :options="tagOptions"
          mode="tags"
          placeholder="请输入标签"
          allow-clear
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%" :loading="loading">
          提交
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

#pictureAddView .edit-bar {
  text-align: center;
  margin: 16px 0;
}
</style>
