<template>
  <div class="my-commet">
    <hm-header>我的跟帖</hm-header>

    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        :offset="50"
      >
        <!-- 内容随意指定 -->
        <div class="item" v-for="item in list" :key="item.id">
          <div class="time">
            {{ item.create_date | date('YYYY-MM-DD HH:mm') }}
          </div>
          <!-- 父评论的内容 -->
          <div class="parent-comment" v-if="item.parent">
            <div class="parent-name">回复：{{ item.parent.user.nickname }}</div>
            <div class="parent-content">
              {{ item.parent.content }}
            </div>
          </div>
          <div class="content">{{ item.content }}</div>
          <div
            class="link"
            @click="$router.push(`/post-detail/${item.post.id}`)"
          >
            <div class="title one-txt-cut">原文：{{ item.post.title }}</div>
            <span class="iconfont iconjiantou1"></span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //评论列表
      list: [],
      loading: false,
      finished: false,
      //记录当前页
      pageIndex: 1,
      //每页条数
      pageSize: 10
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    //用于获取评列表的数据
    getCommentList() {
      this.$axios({
        method: 'get',
        url: '/user_comments',
        //注意：在使用axios发送ajax请求的时候，如果post请求没有数据，放到data参数里，如果是get则需要放到parmas请求里去
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).then(res => {
        // console.log(res.data);
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          //涉及到分页，不能简单把想用的data的list的数据给覆盖了，而应该是追加
          this.list = [...this.list,...data]
          console.log(this.list)

          //额外处理
          //数据加载完成了记得让loading改成false，不然无法触发下一次的加载
          this.loading = false
          //判断是否还有更多的数据？
          if(data.length < this.pageSize) {
            this.finished = true
          }
        }
      })
    },
    onLoad() {
      console.log('我到底了')
      setTimeout(() => {
        //加载更多数据，让页码值加一  
        this.pageIndex++
        //重新发送ajax请求即可
        this.getCommentList()
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  .time {
    font-size: 14px;
    color: #999;
    height: 30px;
    line-height: 30px;
  }
  .content {
    font-size: 16px;
    padding: 10px 0;
  }
  .link {
    color: #999;
    display: flex;
    margin-top: 10px;
    font-size: 14px;
    justify-content: space-between;
    .title {
      flex: 1;
    }
    span {
      width: 50px;
      text-align: right;
    }
  }
  .parent-comment {
    background-color: #ddd;
    padding: 10px;
    font-size: 14px;
    color: #999;
    line-height: 30px;
    .parent-name {
      font-size: 12px;
    }
  }
}
</style>
