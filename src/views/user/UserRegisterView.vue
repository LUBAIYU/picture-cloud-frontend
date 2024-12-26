<script setup lang="ts">
import { ref } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useRouter } from 'vue-router'
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { registerUsingPost } from '@/api/yonghumokuai.ts'
import { message } from 'ant-design-vue'

const router = useRouter()

const form = ref<API.UserRegisterDto>({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
})

const validateCheckPassword = (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请输入确认密码')
  } else if (value !== form.value.userPassword) {
    return Promise.reject('密码不一致')
  }
  return Promise.resolve()
}

const rules: Record<string, Rule[]> = {
  userAccount: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur',
    },
    {
      min: 4,
      message: '账号长度不能小于4位',
      trigger: 'blur',
    },
  ],
  userPassword: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    {
      min: 8,
      message: '密码长度不能小于8位',
      trigger: 'blur',
    },
  ],
  checkPassword: [
    {
      required: true,
      validator: validateCheckPassword,
      trigger: 'blur',
    },
  ],
}

const register = async () => {
  const res = await registerUsingPost(form.value)
  if (res.code === 0 && res.data) {
    message.success('注册成功')
    await router.push('/user/login')
  } else {
    message.error(res.message)
  }
}
</script>

<template>
  <div id="userRegisterPage">
    <h2 class="title">图云 - 用户注册</h2>
    <div class="desc">企业级智能协同云图库</div>
    <a-form :model="form" name="basic" autocomplete="off" :rules="rules" @finish="register">
      <a-form-item label="账号" name="userAccount">
        <a-input v-model:value="form.userAccount" placeholder="请输入账号">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="密码" name="userPassword">
        <a-input-password v-model:value="form.userPassword" placeholder="请输入密码">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item label="确认密码" name="checkPassword">
        <a-input-password v-model:value="form.checkPassword" placeholder="请输入确认密码">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <div class="tips">
        已有账号？
        <RouterLink to="/user/login">去登录</RouterLink>
      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">注 册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
#userRegisterPage {
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
