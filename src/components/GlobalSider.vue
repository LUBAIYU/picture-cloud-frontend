<script setup lang="ts">
import { h, ref } from 'vue'
import { PictureOutlined, UserOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore.ts'

const router = useRouter()
const userStore = useUserStore()

// 当前选中菜单
const current = ref<string[]>([])
const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(PictureOutlined),
    label: '公共图库',
  },
  {
    key: '/space/my',
    icon: () => h(UserOutlined),
    label: '我的空间',
  },
])

const doMenuClick = ({ key }: { key: string }) => {
  router.push({
    path: key,
  })
}

// 监听路由变化，更新当前选中菜单
router.afterEach((to) => {
  current.value = [to.path]
})
</script>

<template>
  <div id="globalSider">
    <a-layout-sider
      width="200"
      v-if="userStore.loginUser.userId"
      breakpoint="lg"
      collapsed-width="0"
    >
      <a-menu v-model:selectedKeys="current" mode="inline" :items="items" @click="doMenuClick" />
    </a-layout-sider>
  </div>
</template>

<style scoped></style>
