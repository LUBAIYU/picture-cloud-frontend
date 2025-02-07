<script setup lang="ts">
import { computed, onUnmounted, ref, watchEffect } from 'vue'
import { uploadPictureUsingPost } from '@/api/tupianmokuai.ts'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores/userStore.ts'
import PictureEditWebSocket from '@/utils/websocket.ts'
import { PICTURE_EDIT_ACTION_ENUM, PICTURE_EDIT_MESSAGE_TYPE_ENUM } from '@/constants/picture.ts'
import { SPACE_TYPE_ENUM } from '@/constants/space.ts'

interface Props {
  imageUrl?: string
  picture?: API.PictureVo
  spaceId?: number
  space: API.SpaceVo
  onSuccess?: (newPicture: API.PictureVo) => void
}

const props = defineProps<Props>()

// 是否为团队空间
const isTeamSpace = computed(() => {
  return props.space?.spaceType === SPACE_TYPE_ENUM.TEAM
})

// 编辑器组件的引用
const cropperRef = ref()
const loading = ref(false)
const isOpen = ref(false)

// 向左旋转
const rotateLeft = () => {
  cropperRef.value.rotateLeft()
  editAction(PICTURE_EDIT_ACTION_ENUM.ROTATE_LEFT)
}

// 向右旋转
const rotateRight = () => {
  cropperRef.value.rotateRight()
  editAction(PICTURE_EDIT_ACTION_ENUM.ROTATE_RIGHT)
}

// 缩放
const changeScale = (num: number) => {
  cropperRef.value.changeScale(num)
  if (num > 0) {
    editAction(PICTURE_EDIT_ACTION_ENUM.ZOOM_IN)
  } else {
    editAction(PICTURE_EDIT_ACTION_ENUM.ZOOM_OUT)
  }
}

// 确认裁剪
const handleConfirm = () => {
  cropperRef.value.getCropBlob((blob: Blob) => {
    // blob 为已裁切的文件
    const fileName = (props.picture?.picName || 'image') + '.png'
    const file = new File([blob], fileName, { type: blob.type })
    // 上传裁切后的图片
    handleUpload({ file })
  })
}

// 打开弹窗
const openModal = () => {
  isOpen.value = true
}

// 关闭弹窗
const closeModal = () => {
  isOpen.value = false
  if (websocket) {
    websocket.disconnect()
  }
  editingUser.value = undefined
}

// 上传图片
const handleUpload = async ({ file }: any) => {
  loading.value = true
  try {
    const params: API.PictureUploadDto = props.picture ? { picId: props.picture.picId } : {}
    params.spaceId = props.spaceId
    const res = await uploadPictureUsingPost(params, {}, file)
    if (res.code === 0 && res.data) {
      message.success('图片上传成功')
      // 将上传成功的图片信息传递给父组件
      props?.onSuccess?.(res.data)
      closeModal()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error('图片上传失败')
  } finally {
    loading.value = false
  }
}

// -------- 实时编辑 ---------
const userStore = useUserStore()
const loginUser = userStore.loginUser

// 正在编辑的用户
const editingUser = ref<API.UserVo>()

// 没有用户正在编辑，可加入编辑
const canEnterEdit = computed(() => {
  return !editingUser.value
})

// 正在编辑的用户是本人，可退出编辑
const canExitEdit = computed(() => {
  return editingUser.value?.userId === loginUser?.userId
})

// 可以编辑
const canEdit = computed(() => {
  // 不是团队空间，可以编辑
  if (!isTeamSpace.value) {
    return true
  }
  return editingUser.value?.userId === loginUser?.userId
})

// 进入编辑
const enterEdit = () => {
  if (websocket) {
    websocket.sendMessage({
      type: PICTURE_EDIT_MESSAGE_TYPE_ENUM.ENTER_EDIT,
    })
  }
}

// 退出编辑
const exitEdit = () => {
  if (websocket) {
    websocket.sendMessage({
      type: PICTURE_EDIT_MESSAGE_TYPE_ENUM.EXIT_EDIT,
    })
  }
}

// 编辑图片操作
const editAction = (action: string) => {
  if (websocket) {
    websocket.sendMessage({
      type: PICTURE_EDIT_MESSAGE_TYPE_ENUM.EDIT_ACTION,
      editAction: action,
    })
  }
}

// ----- WebSocket -----
let websocket: PictureEditWebSocket | null

// 初始化 WebSocket 连接，绑定事件
const initWebSocket = () => {
  const pictureId = props.picture?.picId
  if (!pictureId || !isOpen.value) {
    return
  }
  // 防止之前的连接未释放
  if (websocket) {
    websocket.disconnect()
  }
  // 创建 websocket 实例
  websocket = new PictureEditWebSocket(pictureId)
  // 建立连接
  websocket.connect()

  // 监听通知消息
  websocket.on(PICTURE_EDIT_MESSAGE_TYPE_ENUM.INFO, (msg) => {
    console.log('收到通知消息：', msg)
    message.info(msg.message)
  })

  // 监听错误消息
  websocket.on(PICTURE_EDIT_MESSAGE_TYPE_ENUM.ERROR, (msg) => {
    console.log('收到错误消息：', msg)
    message.error(msg.message)
  })

  // 监听进入编辑状态消息
  websocket.on(PICTURE_EDIT_MESSAGE_TYPE_ENUM.ENTER_EDIT, (msg) => {
    console.log('收到进入编辑状态消息：', msg)
    message.info(msg.message)
    editingUser.value = msg.user
  })

  // 监听编辑操作消息
  websocket.on(PICTURE_EDIT_MESSAGE_TYPE_ENUM.EDIT_ACTION, (msg) => {
    console.log('收到编辑操作消息：', msg)
    message.info(msg.message)
    const editAction = msg.editAction
    switch (editAction) {
      case PICTURE_EDIT_ACTION_ENUM.ROTATE_LEFT:
        cropperRef.value.rotateLeft()
        break
      case PICTURE_EDIT_ACTION_ENUM.ROTATE_RIGHT:
        cropperRef.value.rotateRight()
        break
      case PICTURE_EDIT_ACTION_ENUM.ZOOM_IN:
        cropperRef.value.changeScale(1)
        break
      case PICTURE_EDIT_ACTION_ENUM.ZOOM_OUT:
        cropperRef.value.changeScale(-1)
        break
    }
  })

  // 监听退出编辑状态消息
  websocket.on(PICTURE_EDIT_MESSAGE_TYPE_ENUM.EXIT_EDIT, (msg) => {
    console.log('收到退出编辑状态消息：', msg)
    message.info(msg.message)
    editingUser.value = undefined
  })
}

watchEffect(() => {
  // 团队空间才初始化
  if (isTeamSpace.value) {
    initWebSocket()
  }
})

onUnmounted(() => {
  if (websocket) {
    websocket.disconnect()
  }
  editingUser.value = undefined
})

defineExpose({
  openModal,
})
</script>

<template>
  <a-modal
    class="image-cropper"
    v-model:open="isOpen"
    title="编辑图片"
    :footer="false"
    @cancel="closeModal"
  >
    <vue-cropper
      ref="cropperRef"
      :img="props.imageUrl"
      :autoCrop="true"
      :fixedBox="false"
      :centerBox="true"
      :canMoveBox="true"
      :info="true"
      outputType="png"
    />
    <div style="margin-bottom: 16px" />
    <!-- 协同编辑  -->
    <div class="image-edit-actions" v-if="isTeamSpace">
      <a-space>
        <a-button v-if="editingUser" disabled>{{ editingUser.userName }}正在编辑</a-button>
        <a-button v-if="canEnterEdit" type="primary" ghost @click="enterEdit">进入编辑</a-button>
        <a-button v-if="canExitEdit" danger ghost @click="exitEdit">退出编辑</a-button>
      </a-space>
    </div>
    <div style="margin-bottom: 16px" />
    <!-- 图片操作 -->
    <div class="image-cropper-actions">
      <a-space>
        <a-button @click="rotateLeft" :disabled="!canEdit">向左旋转</a-button>
        <a-button @click="rotateRight" :disabled="!canEdit">向右旋转</a-button>
        <a-button @click="changeScale(1)" :disabled="!canEdit">放大</a-button>
        <a-button @click="changeScale(-1)" :disabled="!canEdit">缩小</a-button>
        <a-button type="primary" :loading="loading" :disabled="!canEdit" @click="handleConfirm">
          确认
        </a-button>
      </a-space>
    </div>
  </a-modal>
</template>

<style>
.image-cropper {
  text-align: center;
}

.image-cropper .vue-cropper {
  height: 400px;
}
</style>
