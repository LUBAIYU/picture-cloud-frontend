import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const loginUser = ref({
    userName: '未登录',
  })

  const fetchLoginUser = () => {}

  const setLoginUser = (newLoginUser: never) => {
    loginUser.value = newLoginUser
  }

  return {
    loginUser,
    fetchLoginUser,
    setLoginUser,
  }
})
