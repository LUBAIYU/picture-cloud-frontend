<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { SPACE_ROLE_OPTIONS } from '@/constants/space.ts'
import {
  addSpaceUserUsingPost,
  deleteSpaceUserByIdUsingDelete,
  editSpaceUserUsingPut,
  listSpaceUserUsingPost,
} from '@/api/kongjianyonghuguanlianmokuai.ts'

interface Props {
  id: string
}

const props = defineProps<Props>()

// 数据
const dataList = ref([])

// 获取数据
const fetchData = async () => {
  const spaceId = props.id
  if (!spaceId) return
  const res = await listSpaceUserUsingPost({
    spaceId,
  })
  if (res.code === 0 && res.data) {
    dataList.value = res.data as any
  } else {
    message.error('获取数据失败，' + res.message)
  }
}

// 表格列
const columns = [
  {
    title: '用户',
    dataIndex: 'userInfo',
  },
  {
    title: '角色',
    dataIndex: 'spaceRole',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
  },
]

// 删除
const doDelete = async (id: string) => {
  if (!id) {
    return
  }
  const res = await deleteSpaceUserByIdUsingDelete({
    id,
  })
  if (res.code === 0) {
    message.success('删除成功')
    await fetchData()
  } else {
    message.error(res.message)
  }
}

// 编辑空间角色
const editSpaceRole = async (value: any, record: API.SpaceUserVo) => {
  const res = await editSpaceUserUsingPut({
    id: record.id,
    spaceRole: value,
  })
  if (res.code === 0 && res.data) {
    message.success('修改成功')
  } else {
    message.error('修改失败，' + res.message)
  }
}

// 添加用户
const formData = ref<API.SpaceUserAddDto>({})

const handleSubmit = async () => {
  const spaceId = props.id
  if (!spaceId) return
  const res = await addSpaceUserUsingPost({
    spaceId,
    ...formData.value,
  })
  if (res.code === 0 && res.data) {
    message.success('添加成功')
    await fetchData()
  } else {
    message.error('添加失败，' + res.message)
  }
}

onMounted(() => fetchData())
</script>

<template>
  <div id="space-user-manage-view">
    <a-form layout="inline" :model="formData" @finish="handleSubmit">
      <a-form-item label="用户 id" name="userId">
        <a-input v-model:value="formData.userId" placeholder="请输入用户 id" allow-clear />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">添加用户</a-button>
      </a-form-item>
    </a-form>
    <div style="margin-bottom: 16px" />
    <a-table :data-source="dataList" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'userInfo'">
          <a-space>
            <a-avatar :src="record.userVo?.userAvatar" />
            {{ record.userVo?.userName }}
          </a-space>
        </template>
        <template v-if="column.dataIndex === 'spaceRole'">
          <a-select
            v-model:value="record.spaceRole"
            :options="SPACE_ROLE_OPTIONS"
            @change="(value: any) => editSpaceRole(value, record)"
          />
        </template>
        <template v-if="column.key === 'action'">
          <a-space wrap>
            <a-popconfirm
              title="确定删除这条记录吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="doDelete(record.id)"
            >
              <a-button danger type="link">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped></style>
