<template>
  <div class="register">
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>

    <!-- vant 的按钮 -->
    <!-- <van-button type="primary">这是一个按钮</van-button> -->
   
   <!-- <van-field v-model="username" placeholder="请输入用户名" /> -->
   
   
   
    <!-- <hm-button @click="register">注册</hm-button> -->
  </div>
</template>

<script>
export default {
  methods: {
    register() {
      console.log('我要注册了')
    }
  },
  data(){
    return {
      username:'123'
    }
  }
}
</script>

<style scoped>
span {
  /* color: red; */
}
</style>
