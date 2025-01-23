<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  ShareAltOutlined,
} from '@ant-design/icons-vue'
import { deletePictureByIdUsingDelete } from '@/api/tupianmokuai.ts'
import { message } from 'ant-design-vue'
import ShareModal from '@/components/ShareModal.vue'
import { ref } from 'vue'

const router = useRouter()

interface Props {
  dataList?: API.PictureVo[]
  loading?: boolean
  showOp?: boolean
  onReload?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  dataList: () => [],
  loading: false,
  showOp: false,
})

// 跳转到图片详情页
const doPictureClick = (picture: API.PictureVo) => {
  router.push({
    path: `/picture/detail/${picture.picId}`,
  })
}

// 编辑
const doEdit = (picture: API.PictureVo, e: any) => {
  // 阻止事件冒泡
  e.stopPropagation()
  router.push({
    path: '/picture/add',
    query: {
      id: picture?.picId,
      spaceId: picture?.spaceId,
    },
  })
}

// 删除
const doDelete = async (picture: API.PictureVo, e: any) => {
  // 阻止事件冒泡
  e.stopPropagation()
  const id = picture.picId
  if (!id) {
    return
  }
  const res = await deletePictureByIdUsingDelete({
    picId: id,
  })
  if (res.code === 0) {
    message.success('删除成功')
    props.onReload?.()
  } else {
    message.error(res.message)
  }
}

// 搜索
const doSearch = (picture: API.PictureVo, e: any) => {
  // 阻止事件冒泡
  e.stopPropagation()
  // 跳转到新页面
  router.push({
    path: '/picture/search',
    query: {
      pictureId: picture?.picId,
    },
  })
}

// 分享操作
const shareModalRef = ref(null)
const shareLink = ref<string>()

// 分享函数
const doShare = (picture: API.PictureVo, e: any) => {
  // 阻止事件冒泡
  e.stopPropagation()
  shareLink.value = `${window.location.protocol}//${window.location.host}/picture/detail/${picture.picId}`
  if (shareModalRef.value) {
    shareModalRef.value.openModal()
  }
}
</script>

<template>
  <div class="picture-list">
    <!-- 图片列表 -->
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
      :data-source="dataList"
      :loading="loading"
    >
      <template #renderItem="{ item: picture }">
        <a-list-item style="padding: 0">
          <!-- 单张图片 -->
          <a-card hoverable @click="doPictureClick(picture)">
            <template #cover>
              <a-image placeholder :src="picture.thumbnailUrl ?? picture.picUrl" height="180px" />
            </template>
            <a-card-meta :title="picture.picName">
              <template #description>
                <a-flex>
                  <a-tag color="green">{{ picture.category ?? '默认' }}</a-tag>
                  <a-tag v-for="tag in picture.tagList" :key="tag">
                    {{ tag }}
                  </a-tag>
                </a-flex>
              </template>
            </a-card-meta>
            <template v-if="showOp" #actions>
              <share-alt-outlined key="share" @click="(e: any) => doShare(picture, e)" />
              <search-outlined key="search" @click="(e: any) => doSearch(picture, e)" />
              <edit-outlined key="edit" @click="(e: any) => doEdit(picture, e)" />
              <delete-outlined key="delete" @click="(e: any) => doDelete(picture, e)" />
            </template>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
    <share-modal ref="shareModalRef" :link="shareLink" />
  </div>
</template>

<style scoped></style>
