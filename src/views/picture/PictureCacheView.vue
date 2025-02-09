<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { deleteCacheByKeyUsingGet, listAllCacheKeysUsingGet } from '@/api/tupianmokuai.ts'
import { message } from 'ant-design-vue'

const prefix = ref<string>('')
const loading = ref(false)

const dataList = ref<string[]>([])

const doSearch = async () => {
  loading.value = true
  const res = await listAllCacheKeysUsingGet({
    prefix: prefix.value,
  })
  if (res.code === 0 && res.data) {
    dataList.value = res.data as string[]
  } else {
    message.error('获取数据失败，' + res.message)
  }
  loading.value = false
}

// 删除指定缓存键
const doDelete = async (key: string) => {
  const res = await deleteCacheByKeyUsingGet({
    hashKey: key,
  })
  if (res.code === 0 && res.data) {
    message.success('删除成功')
    await doSearch()
  } else {
    message.error(res.message)
  }
}

onMounted(() => doSearch())
</script>

<template>
  <div id="picture-cache-view">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <a-input-search
        v-model:value="prefix"
        placeholder="请输入缓存键前缀"
        enter-button="搜索"
        size="large"
        @search="doSearch"
      />
    </div>
    <div style="margin-bottom: 16px" />
    <!-- 缓存键列表 -->
    <a-list item-layout="horizontal" :data-source="dataList" :loading="loading">
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <a-popconfirm
              title="确定删除这个缓存键吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="doDelete(item)"
            >
              <a-button type="link" danger>删除</a-button>
            </a-popconfirm>
          </template>
          <a-list-item-meta :description="item" />
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style scoped>
#picture-cache-view .search-bar {
  max-width: 480px;
  margin: 0 auto 16px;
}
</style>
