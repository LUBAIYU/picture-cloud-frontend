<script setup lang="ts">
import { ref } from 'vue'
import { getUserByIdUsingGet, updateUserByIdUsingPut } from '@/api/yonghumokuai.ts'
import { message } from 'ant-design-vue'
import AvatarUpload from '@/components/AvatarUpload.vue'

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

const user = ref<API.User>({})

const getUserInfo = async (id: number) => {
  if (!id) {
    return
  }
  const res = await getUserByIdUsingGet({ id })
  if (res.code === 0 && res.data) {
    user.value = res.data as API.User
  } else {
    message.error(res.message)
  }
}

// 提交
const doSubmit = async () => {
  if (!user.value.userId) {
    return
  }
  const res = await updateUserByIdUsingPut({
    ...user.value,
  })
  if (res.code === 0 && res.data) {
    message.success('修改成功')
    props.closeModal?.()
    props.refreshData?.()
  } else {
    message.error(res.message)
  }
}

// 回调函数
const onSuccess = (newUserAvatar: string) => {
  user.value.userAvatar = newUserAvatar
}

defineExpose({
  getUserInfo,
})
</script>

<template>
  <div id="user-detail-view">
    <a-modal
      v-model:open="props.isOpen"
      title="编辑用户信息"
      ok-text="提交"
      cancel-text="取消"
      @cancel="props.closeModal()"
      @ok="doSubmit"
    >
      <a-form :model="user">
        <a-form-item label="ID">
          <a-input v-model:value="user.userId" disabled />
        </a-form-item>
        <a-form-item label="账号">
          <a-input v-model:value="user.userAccount" />
        </a-form-item>
        <a-form-item label="昵称">
          <a-input v-model:value="user.userName" />
        </a-form-item>
        <a-form-item label="头像">
          <avatar-upload :user="user" :on-success="onSuccess" />
        </a-form-item>
        <a-form-item label="简介">
          <a-textarea v-model:value="user.userProfile" />
        </a-form-item>
        <a-form-item label="角色">
          <a-radio-group v-model:value="user.userRole">
            <a-radio :value="0">管理员</a-radio>
            <a-radio :value="1">普通用户</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped></style>
