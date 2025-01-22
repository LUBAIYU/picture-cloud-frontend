<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { deleteUserByIdsUsingDelete, pageUsersUsingPost } from '@/api/yonghumokuai.ts'
import { message } from 'ant-design-vue'
import UserDetailView from '@/views/user/UserDetailView.vue'

const columns = [
  {
    title: 'ID',
    dataIndex: 'userId',
    align: 'center',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    align: 'center',
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    align: 'center',
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
    align: 'center',
  },
  {
    title: '简介',
    dataIndex: 'userProfile',
    align: 'center',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
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
const tableData = ref<API.UserVo[]>([])
const total = ref<number>(0)

// 搜索条件
const searchParams = ref<API.UserPageDto>({
  current: 1,
  pageSize: 10,
})

// 模态框控制器
const modalOpen = ref<boolean>(false)
// ref对象
const userDetailRef = ref()

// 关闭模态框
const closeModal = () => {
  modalOpen.value = false
}

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
  const res = await pageUsersUsingPost({
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
  const res = await deleteUserByIdsUsingDelete({
    ids: [id],
  })
  if (res.code === 0) {
    message.success('删除成功')
    await loadData()
  } else {
    message.error(res.message)
  }
}

// 编辑
const doEdit = (id: number) => {
  modalOpen.value = true
  userDetailRef.value.getUserInfo(id)
}

onMounted(() => loadData())
</script>

<template>
  <div id="userManageView">
    <a-form layout="inline" :model="searchParams" @finish="doSearch" style="margin-bottom: 20px">
      <a-form-item label="账号">
        <a-input v-model:value="searchParams.userAccount" placeholder="请输入账号" allow-clear />
      </a-form-item>
      <a-form-item label="用户名">
        <a-input v-model:value="searchParams.userName" placeholder="请输入用户名" allow-clear />
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
        <template v-if="column.dataIndex === 'userAvatar'">
          <a-image :src="record.userAvatar" :width="60" />
        </template>
        <template v-if="column.dataIndex === 'userRole'">
          <div v-if="record.userRole === 0">
            <a-tag color="green">管理员</a-tag>
          </div>
          <div v-else>
            <a-tag color="blue">普通用户</a-tag>
          </div>
        </template>
        <template v-if="column.key === 'action'">
          <a-button type="link" @click="doEdit(record.userId)"> 编辑</a-button>
          <a-popconfirm
            title="确定删除这条记录吗？"
            ok-text="确定"
            cancel-text="取消"
            @confirm="doDelete(record.userId)"
          >
            <a-button type="link" danger>删除</a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
    <user-detail-view
      ref="userDetailRef"
      :is-open="modalOpen"
      :close-modal="closeModal"
      :refresh-data="loadData"
    />
  </div>
</template>

<style scoped></style>
