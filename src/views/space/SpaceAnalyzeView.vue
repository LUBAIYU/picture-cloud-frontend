<script setup lang="ts">
import SpaceUsageAnalyze from '@/components/analyze/SpaceUsageAnalyze.vue'
import SpaceCategoryAnalyze from '@/components/analyze/SpaceCategoryAnalyze.vue'
import SpaceTagAnalyze from '@/components/analyze/SpaceTagAnalyze.vue'
import SpaceSizeAnalyze from '@/components/analyze/SpaceSizeAnalyze.vue'
import SpaceUserAnalyze from '@/components/analyze/SpaceUserAnalyze.vue'
import SpaceRankAnalyze from '@/components/analyze/SpaceRankAnalyze.vue'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/userStore.ts'

const route = useRoute()

// 空间ID
const spaceId = computed(() => {
  return route?.query?.spaceId as string
})

// 是否查询公共图库
const queryPublic = computed(() => {
  return !!route?.query?.queryPublic
})

// 是否查询全空间
const queryAll = computed(() => {
  return !!route?.query?.queryAll
})

const userStore = useUserStore()

// 是否为管理员
const isAdmin = computed(() => {
  const loginUser = userStore.loginUser
  return loginUser.userRole === 0
})
</script>

<template>
  <div id="space-analyze-view">
    <h2>
      空间图库分析 -
      <span v-if="queryAll">全部空间</span>
      <span v-else-if="queryPublic">公共图库</span>
      <span v-else>
        <a :href="`/space/detail/${spaceId}`" target="_blank">{{ spaceId }}</a>
      </span>
    </h2>
    <a-row :gutter="[16, 16]">
      <!-- 空间资源使用分析 -->
      <a-col :xs="24" :md="12">
        <space-usage-analyze
          :query-all="queryAll"
          :query-public="queryPublic"
          :space-id="spaceId"
        />
      </a-col>
      <!-- 空间图片分类分析 -->
      <a-col :xs="24" :md="12">
        <space-category-analyze
          :query-all="queryAll"
          :query-public="queryPublic"
          :space-id="spaceId"
        />
      </a-col>
      <!-- 空间图片标签分析 -->
      <a-col :xs="24" :md="12">
        <space-tag-analyze :query-all="queryAll" :query-public="queryPublic" :space-id="spaceId" />
      </a-col>
      <!-- 空间图片大小分析 -->
      <a-col :xs="24" :md="12">
        <space-size-analyze :query-all="queryAll" :query-public="queryPublic" :space-id="spaceId" />
      </a-col>
      <!-- 用户上传行为分析 -->
      <a-col :xs="24" :md="12">
        <space-user-analyze :query-all="queryAll" :query-public="queryPublic" :space-id="spaceId" />
      </a-col>
      <!-- 空间使用排行分析 -->
      <a-col :xs="24" :md="12">
        <space-rank-analyze
          v-if="isAdmin"
          :query-all="queryAll"
          :query-public="queryPublic"
          :space-id="spaceId"
        />
      </a-col>
    </a-row>
  </div>
</template>

<style scoped></style>
