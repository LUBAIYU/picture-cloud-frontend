<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { delBatchTagUsingDelete, listTagByPageUsingPost } from '@/api/biaoqianmokuai.ts'
import TagAddView from '@/views/tag/TagAddView.vue'
import TagDetailView from '@/views/tag/TagDetailView.vue'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 数据
const tableData = ref<API.Tag[]>([])
const total = ref<number>(0)

// 搜索条件
const searchParams = ref<API.TagPageDto>({
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

// 新增模态框打开变量
const addModalOpen = ref<boolean>(false)
// 编辑模态框打开变量
const editModalOpen = ref<boolean>(false)
// 编辑模态框对象
const editModalRef = ref(null)

// 加载数据
const loadData = async () => {
  const res = await listTagByPageUsingPost({
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
  const res = await delBatchTagUsingDelete({
    ids: [id],
  })
  if (res.code === 0) {
    message.success('删除成功')
    await loadData()
  } else {
    message.error(res.message)
  }
}

// 关闭新增模态框
const closeAddModal = () => {
  addModalOpen.value = false
}

// 关闭编辑模态框
const closeEditModal = () => {
  editModalOpen.value = false
}

// 点击编辑按钮触发
const doEdit = (id: number) => {
  editModalOpen.value = true
  editModalRef?.value?.getTagInfo(id)
}

onMounted(() => loadData())
</script>

<template>
  <div id="tag-manage-view">
    <a-flex justify="space-between">
      <h2>标签管理</h2>
      <a-space>
        <a-button
          type="primary"
          @click="
            () => {
              addModalOpen = true
            }
          "
        >
          + 新建标签
        </a-button>
      </a-space>
    </a-flex>
    <div style="margin-bottom: 16px" />
    <a-form layout="inline" :model="searchParams" @finish="doSearch" style="margin-bottom: 20px">
      <a-form-item label="名称">
        <a-input v-model:value="searchParams.name" placeholder="请输入标签名称" allow-clear />
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
        <template v-if="column.key === 'action'">
          <a-space wrap>
            <a-button type="link" @click="doEdit(record.id)">编辑</a-button>
            <a-popconfirm
              title="确定删除这条记录吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="doDelete(record.id)"
            >
              <a-button type="link" danger>删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
    <tag-add-view :is-open="addModalOpen" :close-modal="closeAddModal" :refresh-data="loadData" />
    <tag-detail-view
      ref="editModalRef"
      :is-open="editModalOpen"
      :close-modal="closeEditModal"
      :refresh-data="loadData"
    />
  </div>
</template>

<style scoped></style>
