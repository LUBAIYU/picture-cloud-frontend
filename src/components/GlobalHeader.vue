<script setup lang="ts">
import { computed, h, ref } from 'vue'
import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore.ts'
import emitter from '@/eventBus.ts'
import { routes } from '@/router/routes.ts'

const router = useRouter()

const userStore = useUserStore()

// 当前选中菜单
const current = ref<string[]>([])

// 根据路由和权限渲染菜单
const menuItems = computed(() => {
  return routes
    .filter((item) => {
      if (item?.meta?.hidden) {
        return false
      }
      if (item.meta?.access && item.meta?.access === 'admin') {
        const role = userStore.loginUser.userRole
        if (role !== 0) {
          return false
        }
      }
      return true
    })
    .map((item) => {
      if (item.name === '主页') {
        return {
          key: item.path,
          icon: () => h(HomeOutlined),
          label: item.name,
          title: item.name,
        }
      } else {
        return {
          key: item.path,
          label: item.name,
          title: item.name,
        }
      }
    })
})

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
          :items="menuItems"
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
                  <a-menu-item>
                    <router-link to="/space/my">
                      <UserOutlined />
                      我的空间
                    </router-link>
                  </a-menu-item>
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
