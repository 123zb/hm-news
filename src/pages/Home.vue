<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="center">
        <span class="iconfont iconsearch"></span>
        <span class="text">搜索新闻</span>
      </div>
      <div class="right" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>

    <!-- tab
    sticky 粘性布局
    animated 切换的时候内容有转场动画
    swipeable 支持滑动切换
     -->
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="item.name" v-for="item in tabList" :key="item.id">
         <!-- 用van-list组件包裹 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
          :offset="50"
        >
          <hm-post v-for="post in postList" :key="post.id" :post="post"></hm-post>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 指定选中的那个tab
      active: 0,
      // 用于存放所有的tab栏数据
      tabList: [],
      // 用于存放文章的数据
      postList: [],
      // 当前页
      pageIndex: 1,
      // 每页的条数
      pageSize: 5,
      // 控制List组件的加载状态
      loading: false,
      // 控制是否还有更多数据
      finished: false
    }
  },
  async created() {
    // 发送请求，获取所有的tab数据
    const res = await this.$axios.get('/category')
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      // 获取到时所有的分类数据
      this.tabList = data
      // console.log(this.tabList)
      this.getPostList(this.tabList[this.active].id)
    }
  },
  methods: {
    // id: 分类的id
    async getPostList(id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      // console.log(data)

      //由于平凡的切换导致数据切换不及时
      //如果页码还是1，并且position中还有数据
      if (this.postList.length > 0 && this.pageIndex === 1){
        this.postList = []
      }



      // this.postList = data
      // 数据不能替换，只能追加
      this.postList = [...this.postList, ...data]
      // console.log(this.postList)
      // 数据加载完成，把loading改成false
      this.loading = false
      // 判断还有没有更多的数据
      if (data.length < this.pageSize) {
        this.finished = true
      }
    },
    onLoad() {
      // 上拉加载会执行的函数
      console.log('onLoad')
      const id = this.tabList[this.active].id
      setTimeout(() => {
        this.pageIndex++
        this.getPostList(id)
      }, 1000)
    }
  },
  // 监听active的变化，在active变化的时候，重新获取文章的数据
  watch: {
    active(value) {
      // 切换栏目的时候，需要初始化所有的状态
      this.postList = []
      this.pageIndex = 1
      this.finished = false

      // loading不应该是false，应该是true，保证切换的时候不去触发onload事件
      this.loading = true

      setTimeout(() => {
        const id = this.tabList[value].id
        this.getPostList(id)
      }, 1000)
      // this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  line-height: 50px;
  background-color: #ff0000;
  color: #fff;
  display: flex;
  padding-left: 10px;
  align-items: center;
  .left,
  .right {
    width: 60px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .iconnew {
    font-size: 50px;
  }
  .iconwode {
    font-size: 24px;
  }
  .center {
    flex: 1;
    height: 34px;
    line-height: 34px;
    background-color: rgba(255, 255, 255, 0.5);
    text-align: center;
    border-radius: 17px;
    .text {
      font-size: 14px;
      margin-left: 5px;
    }
  }
}

// 覆盖tab栏的样式
/deep/ .van-tabs__nav {
  background-color: #ddd;
}
</style>
