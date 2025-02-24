<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getCommentCountUsingGet, queryCommentsUsingPost } from '@/api/pinglunmokuai.ts'
import { message } from 'ant-design-vue'

interface Props {
  picId: number
}

const props = withDefaults(defineProps<Props>(), {
  picId: 0,
})

// 评论数
const count = ref<number>(0)
// 评论列表
const commentList = ref<API.CommentsViewVo[]>([])

// 获取评论数
const getCommentCount = async () => {
  if (!props.picId) {
    return
  }
  const res = await getCommentCountUsingGet({
    id: props.picId,
  })
  if (res.code === 0 && res.data) {
    count.value = res.data as number
  } else {
    message.error(res.message)
  }
}

// 获取评论列表
const fetchCommentList = async () => {
  if (!props.picId) {
    return
  }
  const res = await queryCommentsUsingPost({
    picId: props.picId,
    // 只查审核通过的评论
    status: 2,
    current: 1,
    pageSize: 10,
  })
  if (res.code === 0 && res.data) {
    commentList.value = res.data.records as API.CommentsViewVo[]
  } else {
    message.error(res.message)
  }
}

onMounted(() => getCommentCount())
onMounted(() => fetchCommentList())
</script>

<template>
  <div id="comment-list">
    <a-card :title="`${count}个评论`">
      <a-comment v-for="comment in commentList" :key="comment">
        <template #avatar>
          <a-avatar :src="comment.user?.userAvatar" />
        </template>
        <template #author>
          <a>{{ comment.user?.userName }}</a>
        </template>
        <template #content>
          {{ comment.content }}
        </template>
      </a-comment>
    </a-card>
  </div>
</template>

<style scoped></style>
