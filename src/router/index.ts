import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/user/login',
      name: '用户登录',
      component: () => import('@/views/user/UserLoginView.vue'),
    },
    {
      path: '/user/register',
      name: '用户注册',
      component: () => import('@/views/user/UserRegisterView.vue'),
    },
    {
      path: '/admin/userManage',
      name: '用户管理',
      component: () => import('@/views/admin/UserManageView.vue'),
    },
    {
      path: '/admin/pictureManage',
      name: '图片管理',
      component: () => import('@/views/admin/PictureManageView.vue'),
    },
    {
      path: '/picture/add',
      name: '创建图片',
      component: () => import('@/views/picture/PictureAddView.vue'),
    },
    {
      path: '/picture/batch/add',
      name: '批量创建图片',
      component: () => import('@/views/picture/PictureBatchAddView.vue'),
    },
    {
      path: '/picture/detail/:id',
      name: '图片详情',
      component: () => import('@/views/picture/PictureDetailView.vue'),
      props: true,
    },
  ],
})

export default router
