<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore.ts'
import { message } from 'ant-design-vue'
import { querySpaceVoByPageUsingPost } from '@/api/kongjianmokuai.ts'
import { onMounted } from 'vue'
import { SPACE_TYPE_ENUM } from '@/constants/space.ts'

const router = useRouter()
const userStore = useUserStore()

// 检查用户是否有个人空间
const checkUserSpace = async () => {
  // 判断用户是否登录
  const loginUser = userStore.loginUser
  if (!loginUser.userId) {
    message.warn('请先登录')
    await router.replace('/user/login')
    return
  }
  // 判断用户是否有私有空间
  const res = await querySpaceVoByPageUsingPost({
    userId: loginUser.userId,
    spaceType: SPACE_TYPE_ENUM.PRIVATE,
    current: 1,
    pageSize: 1,
  })
  if (res.code === 0) {
    // 如果有则跳转到个人空间详情页
    if (res.data && res.data?.records?.length > 0) {
      const space = res.data?.records[0]
      await router.replace(`/space/detail/${space.id}`)
    } else {
      // 如果没有则跳转到创建空间页面
      await router.replace('/space/add')
      message.warn('请先创建空间')
    }
  } else {
    message.error(res.message)
  }
}

onMounted(() => checkUserSpace())
</script>

<template>
  <div id="spaceMyView">
    <p>正在跳转，请稍后。。。</p>
  </div>
</template>

<style scoped></style>
