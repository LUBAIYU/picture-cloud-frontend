<script setup lang="ts">
import { h, ref } from 'vue'
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore.ts'
import emitter from '@/eventBus.ts'

const router = useRouter()

const userStore = useUserStore()

// 当前选中菜单
const current = ref<string[]>([])
const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/admin/manage',
    label: '用户管理',
    title: '用户管理',
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

// 退出登录
const logout = () => {
  localStorage.removeItem('Authorization')
  userStore.setLoginUser({
    userName: '未登录',
  })
  router.push('/user/login')
}

// 监听登录成功事件
emitter.on('loginSuccess', () => {
  userStore.fetchLoginUser()
})
</script>

<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <RouterLink to="/">
          <div class="title-bar">
            <img class="logo" alt="" src="../assets/logo.svg" />
            <div class="title">智能云图平台</div>
          </div>
        </RouterLink>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="120px">
        <div class="user-login-state">
          <div v-if="userStore.loginUser.userId">
            <a-dropdown>
              <a-space>
                <a-avatar :src="userStore.loginUser.userAvatar" />
                {{ userStore.loginUser.userName ?? '无名' }}
              </a-space>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="logout">
                    <LogoutOutlined />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div v-else>
            <a-button type="primary" href="/user/login">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 18px;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
