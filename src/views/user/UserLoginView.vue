<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore.ts'
import { loginUsingPost } from '@/api/yonghumokuai.ts'
import { message } from 'ant-design-vue'
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const form = ref<API.UserLoginDto>({
  userAccount: '',
  userPassword: '',
})

const login = async () => {
  const res = await loginUsingPost(form.value)
  if (res.code === 0 && res.data) {
    // 保存token到本地
    const token = res.data.token
    if (!token) {
      message.error('登录失败')
      return
    }
    localStorage.setItem('Authorization', token)
    // 获取登录用户
    await userStore.fetchLoginUser()
    message.success('登录成功')
    await router.push('/')
  } else {
    message.error(res.message)
  }
}
</script>

<template>
  <div id="userLoginView">
    <h2 class="title">图云 - 用户登录</h2>
    <div class="desc">企业级智能协同云图库</div>
    <a-form :model="form" name="basic" autocomplete="off" @finish="login">
      <a-form-item
        label="账号"
        name="userAccount"
        :rules="[
          { required: true, message: '请输入账号' },
          {
            min: 4,
            message: '账号长度不能小于4位',
          },
        ]"
      >
        <a-input v-model:value="form.userAccount" placeholder="请输入账号">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        label="密码"
        name="userPassword"
        :rules="[
          { required: true, message: '请输入密码' },
          {
            min: 8,
            message: '密码长度不能小于8位',
          },
        ]"
      >
        <a-input-password v-model:value="form.userPassword" placeholder="请输入密码">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <div class="tips">
        没有账号？
        <RouterLink to="/user/register">去注册</RouterLink>
      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">登 录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
#userLoginView {
  max-width: 360px;
  margin: 0 auto;
}

.title {
  text-align: center;
  margin-bottom: 16px;
}

.desc {
  text-align: center;
  color: #bbb;
  margin-bottom: 16px;
}

.tips {
  margin-bottom: 16px;
  color: #bbb;
  font-size: 13px;
  text-align: right;
}
</style>
