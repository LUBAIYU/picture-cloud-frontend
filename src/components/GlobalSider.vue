<script setup lang="ts">
import { computed, h, ref, watchEffect } from 'vue'
import { PictureOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons-vue'
import { type MenuProps, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore.ts'
import { SPACE_TYPE_ENUM } from '@/constants/space.ts'
import { listMyTeamSpaceUsingGet } from '@/api/kongjianyonghuguanlianmokuai.ts'

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
  {
    key: '/space/add?type=' + SPACE_TYPE_ENUM.TEAM,
    label: '创建团队',
    icon: () => h(TeamOutlined),
  },
])

const teamSpaceList = ref<API.SpaceUserVo[]>([])
const menuItems = computed(() => {
  // 没有团队空间
  if (teamSpaceList.value.length < 1) {
    return items.value
  }
  // 展示团队空间分组
  const teamSpaceSubMenus = teamSpaceList.value.map((spaceUser) => {
    const space = spaceUser.spaceVo
    return {
      key: '/space/detail/' + spaceUser.spaceId,
      label: space?.spaceName,
    }
  })
  const teamSpaceMenuGroup = {
    type: 'group',
    label: '我的团队',
    key: 'teamSpace',
    children: teamSpaceSubMenus,
  }
  return [...items.value, teamSpaceMenuGroup]
})

// 加载团队空间列表
const fetchTeamSpaceList = async () => {
  const res = await listMyTeamSpaceUsingGet()
  if (res.code === 0 && res.data) {
    teamSpaceList.value = res.data as API.SpaceUserVo[]
  } else {
    message.error('加载我的团队空间失败，' + res.message)
  }
}

const doMenuClick = ({ key }: { key: string }) => {
  router.push(key)
}

// 监听路由变化，更新当前选中菜单
router.afterEach((to) => {
  current.value = [to.path]
})

// 监听变量，改变时触发数据的重新加载
watchEffect(() => {
  // 登录才加载
  if (userStore.loginUser.userId) {
    fetchTeamSpaceList()
  }
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
      <a-menu v-model:selectedKeys="current" mode="inline" :items="menuItems" @click="doMenuClick" />
    </a-layout-sider>
  </div>
</template>

<style scoped></style>
