<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { deleteSpaceByIdUsingDelete, querySpaceByPageUsingPost } from '@/api/spaceController.ts'
import { SPACE_LEVEL_MAP, SPACE_LEVEL_OPTIONS } from '@/constants/space.ts'
import { formatSize } from '../../utils'

const router = useRouter()

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    width: 80,
    align: 'center',
  },
  {
    title: '空间名称',
    dataIndex: 'spaceName',
    align: 'center',
  },
  {
    title: '空间级别',
    dataIndex: 'spaceLevel',
    align: 'center',
  },
  {
    title: '使用情况',
    dataIndex: 'spaceUseInfo',
    align: 'center',
  },
  {
    title: '用户 id',
    dataIndex: 'userId',
    width: 80,
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
  },
  {
    title: '编辑时间',
    dataIndex: 'editTime',
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 数据
const tableData = ref<API.Space[]>([])
const total = ref<number>(0)

// 搜索条件
const searchParams = ref<API.SpacePageDto>({
  current: 1,
  pageSize: 10,
})

// 分页参数
const pagination = computed(() => {
  return {
    current: searchParams.value.current ?? 1,
    pageSize: searchParams.value.pageSize ?? 10,
    total: total.value,
    showSizeChanger: true,
    showTotal: (total: number) => `共 ${total} 条`,
  }
})

// 加载数据
const loadData = async () => {
  const res = await querySpaceByPageUsingPost({
    ...searchParams.value,
  })
  if (res.code === 0 && res.data) {
    tableData.value = res.data.records
    total.value = res.data.total
  } else {
    message.error(res.message)
  }
}

// 表格变化处理
const doTableChange = (page: any) => {
  searchParams.value.current = page.current
  searchParams.value.pageSize = page.pageSize
  loadData()
}

// 搜索
const doSearch = () => {
  searchParams.value.current = 1
  loadData()
}

// 重置
const doReset = () => {
  searchParams.value = {
    current: 1,
    pageSize: 10,
  }
  loadData()
}

// 删除
const doDelete = async (id: string) => {
  if (!id) {
    return
  }
  const res = await deleteSpaceByIdUsingDelete({
    id,
  })
  if (res.code === 0) {
    message.success('删除成功')
    await loadData()
  } else {
    message.error(res.message)
  }
}

// 跳转到编辑页面
const doEdit = (id: string) => {
  router.push({
    path: '/space/add',
    query: {
      id,
    },
  })
}

onMounted(() => loadData())
</script>

<template>
  <div id="spaceManageView">
    <a-flex justify="space-between">
      <h2>空间管理</h2>
      <a-space>
        <a-button type="primary" href="/space/add" target="_blank">+ 创建空间</a-button>
      </a-space>
    </a-flex>
    <div style="margin-bottom: 16px" />
    <a-form layout="inline" :model="searchParams" @finish="doSearch" style="margin-bottom: 20px">
      <a-form-item label="空间名称">
        <a-input v-model:value="searchParams.spaceName" placeholder="请输入空间名称" allow-clear />
      </a-form-item>
      <a-form-item label="空间级别">
        <a-select
          v-model:value="searchParams.spaceLevel"
          placeholder="请选择空间级别"
          :options="SPACE_LEVEL_OPTIONS"
          allow-clear
          style="min-width: 180px"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">搜索</a-button>
        <a-button style="margin-left: 10px; background-color: grey; color: white" @click="doReset"
          >重置
        </a-button>
      </a-form-item>
    </a-form>
    <a-table
      :data-source="tableData"
      :columns="columns"
      :pagination="pagination"
      @change="doTableChange"
    >
      <template #bodyCell="{ column, record }">
        <!-- 空间级别 -->
        <template v-if="column.dataIndex === 'spaceLevel'">
          <a-tag>{{ SPACE_LEVEL_MAP[record.spaceLevel] }}</a-tag>
        </template>
        <!-- 使用情况 -->
        <template v-if="column.dataIndex === 'spaceUseInfo'">
          <div>大小：{{ formatSize(record.totalSize) }} / {{ formatSize(record.maxSize) }}</div>
          <div>数量：{{ record.totalCount }}/{{ record.maxCount }}</div>
        </template>
        <template v-if="column.key === 'action'">
          <a-space wrap>
            <a-button type="link" @click="doEdit(record.id)" target="_blank"> 编辑</a-button>
            <a-popconfirm
              title="确定删除这条记录吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="doDelete(record.id)"
            >
              <a-button danger type="text">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped></style>
