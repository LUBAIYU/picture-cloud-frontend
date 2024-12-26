import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getLoginUserUsingGet } from '@/api/yonghumokuai.ts'

export const useUserStore = defineStore('user', () => {
  const loginUser = ref<API.UserVo>({
    userName: '未登录',
  })

  const fetchLoginUser = async () => {
    const res = await getLoginUserUsingGet()
    if (res.code === 0 && res.data) {
      setLoginUser(res.data as API.UserVo)
    }
  }

  const setLoginUser = (newLoginUser: API.UserVo) => {
    loginUser.value = newLoginUser
  }

  return {
    loginUser,
    fetchLoginUser,
    setLoginUser,
  }
})
