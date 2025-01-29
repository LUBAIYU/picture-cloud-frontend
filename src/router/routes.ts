import type { RouteRecordRaw } from 'vue-router'

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: '主页',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/user/login',
    name: '用户登录',
    component: () => import('@/views/user/UserLoginView.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/user/register',
    name: '用户注册',
    component: () => import('@/views/user/UserRegisterView.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/admin/userManage',
    name: '用户管理',
    component: () => import('@/views/admin/UserManageView.vue'),
    meta: {
      access: 'admin',
    },
  },
  {
    path: '/admin/pictureManage',
    name: '图片管理',
    component: () => import('@/views/admin/PictureManageView.vue'),
    meta: {
      access: 'admin',
    },
  },
  {
    path: '/admin/spaceManage',
    name: '空间管理',
    component: () => import('@/views/admin/SpaceManageView.vue'),
    meta: {
      access: 'admin',
    },
  },
  {
    path: '/admin/categoryManage',
    name: '分类管理',
    component: () => import('@/views/admin/CategoryManageView.vue'),
    meta: {
      access: 'admin',
    },
  },
  {
    path: '/admin/tagManage',
    name: '标签管理',
    component: () => import('@/views/admin/TagManageView.vue'),
    meta: {
      access: 'admin',
    },
  },
  {
    path: '/picture/add',
    name: '创建图片',
    component: () => import('@/views/picture/PictureAddView.vue'),
  },
  {
    path: '/space/add',
    name: '创建空间',
    component: () => import('@/views/space/SpaceAddView.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/picture/batch/add',
    name: '批量创建图片',
    component: () => import('@/views/picture/PictureBatchAddView.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/picture/detail/:id',
    name: '图片详情',
    component: () => import('@/views/picture/PictureDetailView.vue'),
    props: true,
    meta: {
      hidden: true,
    },
  },
  {
    path: '/picture/search',
    name: '图片搜索',
    component: () => import('@/views/picture/PictureSearchView.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/space/detail/:id',
    name: '空间详情',
    component: () => import('@/views/space/SpaceDetailView.vue'),
    props: true,
    meta: {
      hidden: true,
    },
  },
  {
    path: '/space/my',
    name: '我的空间',
    component: () => import('@/views/space/SpaceMyView.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/space/analyze',
    name: '空间分析',
    component: () => import('@/views/space/SpaceAnalyzeView.vue'),
    meta: {
      hidden: true,
    },
  },
]
