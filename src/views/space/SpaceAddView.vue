<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { SPACE_LEVEL_OPTIONS } from '@/constants/space.ts'
import {
  createSpaceUsingPost,
  getSpaceVoByIdUsingGet,
  listSpaceLevelUsingGet,
  updateSpaceByIdUsingPut,
} from '@/api/kongjianmokuai.ts'
import { formatSize } from '../../utils'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const space = ref<API.SpaceVo>({})
const form = ref<API.SpaceCreateDto | API.SpaceUpdateDto>({})
const spaceLevelList = ref<API.SpaceLevelVo[]>([])

/**
 * 获取空间级别信息列表
 */
const getSpaceLevelList = async () => {
  const res = await listSpaceLevelUsingGet()
  if (res.code === 0 && res.data) {
    spaceLevelList.value = res.data as any
  } else {
    message.error(res.message)
  }
}

/**
 * 提交表单
 */
const handleSubmit = async () => {
  loading.value = true
  const spaceId = space.value.id
  let res
  if (spaceId) {
    // 更新操作
    res = await updateSpaceByIdUsingPut({
      id: spaceId,
      ...form.value,
    })
  } else {
    // 创建操作
    res = await createSpaceUsingPost({
      ...form.value,
    })
  }
  if (res.code === 0 && res.data) {
    message.success('操作成功')
    // 跳转到空间详情页
    await router.push(`/space/detail/${res.data}`)
  } else {
    message.error(res.message)
  }
  loading.value = false
}

// 获取旧数据
const getOldSpace = async () => {
  // 获取空间ID
  const id = route.query?.id
  if (id) {
    const res = await getSpaceVoByIdUsingGet({
      id: id,
    })
    if (res.code === 0 && res.data) {
      space.value = res.data as any
      form.value = {
        spaceName: space.value.spaceName,
        spaceLevel: space.value.spaceLevel,
      }
    } else {
      message.error(res.message)
    }
  }
}

onMounted(() => getOldSpace())
onMounted(() => getSpaceLevelList())
</script>

<template>
  <div id="spaceAddView">
    <h2 style="margin-bottom: 16px">
      {{ route.query?.id ? '修改空间' : '创建空间' }}
    </h2>
    <a-form layout="vertical" :model="form" @finish="handleSubmit">
      <a-form-item label="空间名称" name="picName">
        <a-input v-model:value="form.spaceName" placeholder="请输入空间名称" />
      </a-form-item>
      <a-form-item label="空间级别">
        <a-select
          v-model:value="form.spaceLevel"
          placeholder="请选择空间级别"
          :options="SPACE_LEVEL_OPTIONS"
          allow-clear
          style="min-width: 180px"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%" :loading="loading">
          提交
        </a-button>
      </a-form-item>
    </a-form>
    <!-- 空间级别信息介绍 -->
    <a-card title="空间级别介绍">
      <a-typography-paragraph>
        * 目前仅支持开通普通版，如需升级空间，请联系
        <a href="https://github.com/LUBAIYU" target="_blank">路白榆</a>
      </a-typography-paragraph>
      <a-typography-paragraph v-for="spaceLevel in spaceLevelList">
        {{ spaceLevel.text }}：大小 {{ formatSize(spaceLevel.maxSize) }}， 数量
        {{ spaceLevel.maxCount }}
      </a-typography-paragraph>
    </a-card>
  </div>
</template>

<style scoped>
#spaceAddView {
  max-width: 720px;
  margin: 0 auto;
}
</style>
