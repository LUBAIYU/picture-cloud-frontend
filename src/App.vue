<script setup lang="ts">
import BasicLayout from '@/layouts/BasicLayout.vue'
import { useUserStore } from '@/stores/userStore.ts'

const userStore = useUserStore()
userStore.fetchLoginUser()
</script>

<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<style scoped></style>
