<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import {
  deletePictureByIdUsingDelete,
  doPictureReviewUsingPost,
  queryPictureByPageUsingPost,
} from '@/api/tupianmokuai.ts'
import {
  PIC_REVIEW_STATUS_ENUM,
  PIC_REVIEW_STATUS_MAP,
  PIC_REVIEW_STATUS_OPTIONS,
} from '../../constants/picture.ts'

const columns = [
  {
    title: 'ID',
    dataIndex: 'picId',
    align: 'center',
  },
  {
    title: '图片',
    dataIndex: 'picUrl',
    align: 'center',
  },
  {
    title: '名称',
    dataIndex: 'picName',
    align: 'center',
  },
  {
    title: '简介',
    dataIndex: 'introduction',
    align: 'center',
  },
  {
    title: '分类',
    dataIndex: 'category',
    align: 'center',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    align: 'center',
  },
  {
    title: '图片信息',
    dataIndex: 'picInfo',
    align: 'center',
  },
  {
    title: '审核信息',
    dataIndex: 'reviewInfo',
    align: 'center',
  },
  {
    title: '用户ID',
    dataIndex: 'userId',
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
const tableData = ref<API.Picture[]>([])
const total = ref<number>(0)

// 搜索条件
const searchParams = ref<API.PicturePageDto>({
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
  const res = await queryPictureByPageUsingPost({
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
  const res = await deletePictureByIdUsingDelete({
    picId: id,
  })
  if (res.code === 0) {
    message.success('删除成功')
    await loadData()
  } else {
    message.error(res.message)
  }
}

// 图片审核
const handleReview = async (record: API.Picture, reviewStatus: number) => {
  const reviewMessage =
    reviewStatus === PIC_REVIEW_STATUS_ENUM.PASS ? '管理员操作通过' : '管理员操作拒绝'
  const res = await doPictureReviewUsingPost({
    id: record.picId,
    reviewStatus,
    reviewMessage,
  })
  if (res.code === 0) {
    message.success('审核操作成功')
  } else {
    message.error('审核操作失败，' + res.message)
  }
  // 刷新数据
  await loadData()
}

onMounted(() => loadData())
</script>

<template>
  <div id="pictureManageView">
    <a-flex justify="space-between">
      <h2>图片管理</h2>
      <a-space>
        <a-button type="primary" href="/picture/add" target="_blank">+ 创建图片</a-button>
        <a-button type="primary" ghost href="/picture/batch/add" target="_blank">
          + 批量创建图片
        </a-button>
      </a-space>
    </a-flex>
    <div style="margin-bottom: 16px" />
    <a-form layout="inline" :model="searchParams" @finish="doSearch" style="margin-bottom: 20px">
      <a-form-item label="关键词">
        <a-input v-model:value="searchParams.searchText" placeholder="请输入关键词" allow-clear />
      </a-form-item>
      <a-form-item label="分类">
        <a-input v-model:value="searchParams.category" placeholder="请输入分类" allow-clear />
      </a-form-item>
      <a-form-item label="标签">
        <a-select
          v-model:value="searchParams.tagList"
          mode="tags"
          placeholder="请输入标签"
          allow-clear
          style="min-width: 180px"
        />
      </a-form-item>
      <a-form-item label="审核状态">
        <a-select
          v-model:value="searchParams.reviewStatus"
          placeholder="请选择审核状态"
          :options="PIC_REVIEW_STATUS_OPTIONS"
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
        <template v-if="column.dataIndex === 'picUrl'">
          <a-image :src="record.picUrl" :width="60" />
        </template>
        <template v-if="column.dataIndex === 'tags'">
          <a-space wrap>
            <a-tag v-for="tag in JSON.parse(record.tags || '[]')" :key="tag">
              {{ tag }}
            </a-tag>
          </a-space>
        </template>
        <template v-if="column.dataIndex === 'picInfo'">
          <div>格式：{{ record.picFormat }}</div>
          <div>宽度：{{ record.picWidth }}</div>
          <div>高度：{{ record.picHeight }}</div>
          <div>宽高比：{{ record.picScale }}</div>
          <div>大小：{{ (record.picSize / 1024).toFixed(2) }}KB</div>
        </template>
        <template v-if="column.dataIndex === 'reviewInfo'">
          <div>审核状态：{{ PIC_REVIEW_STATUS_MAP[record.reviewStatus] }}</div>
          <div>审核信息：{{ record.reviewMessage ?? '-' }}</div>
          <div>审核人：{{ record.reviewerId ?? '-' }}</div>
          <div v-if="record.reviewTime">审核时间：{{ record.reviewTime }}</div>
        </template>
        <template v-if="column.key === 'action'">
          <a-space wrap>
            <a-button
              v-if="record.reviewStatus !== PIC_REVIEW_STATUS_ENUM.PASS"
              type="link"
              @click="handleReview(record, PIC_REVIEW_STATUS_ENUM.PASS)"
            >
              通过
            </a-button>
            <a-button
              v-if="record.reviewStatus !== PIC_REVIEW_STATUS_ENUM.REJECT"
              type="link"
              danger
              @click="handleReview(record, PIC_REVIEW_STATUS_ENUM.REJECT)"
            >
              拒绝
            </a-button>
            <a-button type="link" :href="`/picture/add?id=${record.picId}`" target="_blank">
              编辑
            </a-button>
            <a-popconfirm
              title="确定删除这条记录吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="doDelete(record.picId)"
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
