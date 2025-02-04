<script setup lang="ts">
import { computed, h, onMounted, ref, watch } from 'vue'
import { message } from 'ant-design-vue'
import { getSpaceVoByIdUsingGet } from '@/api/kongjianmokuai.ts'
import { formatSize } from '@/utils'
import { queryPictureVoByPageUsingPost, searchPictureByColorUsingPost } from '@/api/tupianmokuai.ts'
import PictureList from '@/components/PictureList.vue'
import PictureSearchForm from '@/components/PictureSearchForm.vue'
import { ColorPicker } from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'
import { BarChartOutlined, EditOutlined, TeamOutlined } from '@ant-design/icons-vue'
import PictureBatchEditModal from '@/components/PictureBatchEditModal.vue'
import { SPACE_PERMISSION_ENUM, SPACE_TYPE_MAP } from '../../constants/space.ts'

interface Props {
  id: string | number
}

const props = defineProps<Props>()
const space = ref<API.SpaceVo>({})
const dataList = ref<API.PictureVo[]>([])
const total = ref<number>(0)
const loading = ref<boolean>(true)

// 获取空间详情
const fetchSpaceDetail = async () => {
  try {
    const res = await getSpaceVoByIdUsingGet({
      id: props.id,
    })
    if (res.code === 0 && res.data) {
      space.value = res.data as API.SpaceVo
    } else {
      message.error('获取空间详情失败，' + res.message)
    }
  } catch (error: any) {
    message.error('获取空间详情失败：' + error.message)
  }
}

// 搜索条件
const searchParams = ref<API.PicturePageDto>({
  current: 1,
  pageSize: 10,
})

const doPageChange = (page: number, pageSize: number) => {
  searchParams.value.current = page
  searchParams.value.pageSize = pageSize
  loadData()
}

// 加载数据
const loadData = async () => {
  loading.value = true
  // 查询数据
  const res = await queryPictureVoByPageUsingPost({
    spaceId: props.id,
    ...searchParams.value,
  })
  if (res.code === 0 && res.data) {
    dataList.value = res.data.records
    total.value = res.data.total
  } else {
    message.error(res.message)
  }
  loading.value = false
}

// 搜索
const doSearch = (newSearchParams: API.PicturePageDto) => {
  searchParams.value = {
    ...searchParams.value,
    ...newSearchParams,
    current: 1,
    pageSize: 10,
  }
  loadData()
}

// 颜色变化时触发
const onColorChange = async (color: string) => {
  loading.value = true
  const res = await searchPictureByColorUsingPost({
    spaceId: props.id as any,
    picColor: color,
  })
  if (res.code === 0 && res.data) {
    dataList.value = res.data as API.PictureVo[]
    total.value = res.data?.length
  } else {
    message.error(res.message)
  }
  loading.value = false
}

//---- 批量编辑 ----
const isOpen = ref<boolean>(false)
const closeModal = () => {
  isOpen.value = false
}

// 批量编辑
const doBatchEdit = () => {
  isOpen.value = true
}

onMounted(() => fetchSpaceDetail())
onMounted(() => loadData())

watch(
  () => props.id,
  () => {
    fetchSpaceDetail()
    loadData()
  },
)

// 通用权限检查函数
const createPermissionChecker = (permission: string) => {
  return computed(() => {
    return (space.value.permissionList ?? []).includes(permission)
  })
}

// 定义权限检查
const canManageSpaceUser = createPermissionChecker(SPACE_PERMISSION_ENUM.SPACE_USER_MANAGE)
const canUploadPicture = createPermissionChecker(SPACE_PERMISSION_ENUM.PICTURE_UPLOAD)
const canEditPicture = createPermissionChecker(SPACE_PERMISSION_ENUM.PICTURE_EDIT)
const canDeletePicture = createPermissionChecker(SPACE_PERMISSION_ENUM.PICTURE_DELETE)
</script>

<template>
  <div id="spaceDetailView">
    <!-- 空间信息 -->
    <a-flex justify="space-between">
      <h2>{{ space.spaceName }}（{{ SPACE_TYPE_MAP[space.spaceType] }}）</h2>
      <a-space>
        <a-button
          v-if="canUploadPicture"
          type="primary"
          :href="`/picture/add?spaceId=${id}`"
          target="_blank"
        >
          + 创建图片
        </a-button>
        <a-button
          v-if="canManageSpaceUser"
          type="primary"
          ghost
          :icon="h(TeamOutlined)"
          :href="`/spaceUserManage/${id}`"
          target="_blank"
        >
          成员管理
        </a-button>
        <a-button
          v-if="canManageSpaceUser"
          type="primary"
          ghost
          :icon="h(BarChartOutlined)"
          :href="`/space/analyze?spaceId=${id}`"
          target="_blank"
        >
          空间分析
        </a-button>
        <a-button :icon="h(EditOutlined)" @click="doBatchEdit"> 批量编辑</a-button>
        <a-tooltip
          :title="`占用空间 ${formatSize(space.totalSize)} / ${formatSize(space.maxSize)}`"
        >
          <a-progress
            type="circle"
            :size="42"
            :percent="((space.totalSize * 100) / space.maxSize).toFixed(1)"
          />
        </a-tooltip>
      </a-space>
    </a-flex>
    <div style="margin-bottom: 16px" />
    <!-- 搜索表单 -->
    <PictureSearchForm :on-search="doSearch" />
    <!-- 跟其他搜索条件独立 -->
    <a-form-item label="按颜色搜索">
      <color-picker format="hex" @pureColorChange="onColorChange" />
    </a-form-item>
    <!-- 图片列表 -->
    <picture-list
      :data-list="dataList"
      :loading="loading"
      :show-op="true"
      :on-reload="loadData"
      :can-edit="canEditPicture"
      :can-delete="canDeletePicture"
    />
    <a-pagination
      style="text-align: right"
      v-model:current="searchParams.current"
      v-model:page-size="searchParams.pageSize"
      :total="total"
      @change="doPageChange"
    />
    <picture-batch-edit-modal
      :is-open="isOpen"
      :picture-list="dataList"
      :space-id="id"
      :close-modal="closeModal"
      :on-success="loadData"
    />
  </div>
</template>

<style scoped></style>
