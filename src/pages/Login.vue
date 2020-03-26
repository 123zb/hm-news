<template>
  <div class="login">
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>

    <hm-input
      type="text"
      placeholder="请输入用户名"
      v-model="username"
      :rule="/^\d{4,10}$/"
      message="用户名格式不对"
      ref="username"
    ></hm-input>

    <hm-input
      type="password"
      placeholder="请输入密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="用户密码错误"
      ref="password"
    ></hm-input>

    <hm-button @click="login">登录</hm-button>

    <!-- 去注册的连接 -->
    <div class="go-register">
      没有账号？ 去<router-link class="link" to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    //给DEM注册的时间，可以通过DOM的凡是触发
    async login() {
      //做一个表单校验
      const result1 = this.$refs.username.validate(this.username)
      const result2 = this.$refs.password.validate(this.password)
      if (!result1 || !result2) {
        return
      }

      // console.log('我要登陆了')
      const res = await this.$axios({
        method: 'post',
        url: '/login',
        data: {
          username: this.username,
          password: this.password
        }
      })

      const { statusCode, data, message } = res.data
      if (res.data.statusCode === 200) {
        // alert('恭喜登录成功')
        this.$toast.success('登录成功了')
        //保存登录的token和用户信息
        localStorage.setItem('token', data.token)
        localStorage.setItem('user_id', data.user.id)
        //如果登录成功了，需要跳转到个人中心，也可能会跳
        // this.$router.push('/user')



        if (this.$route.params.back) {
          this.$router.back()
        }else{
          this.$router.push('/user')
        }
      } else {
        this.$toast.fail('message')
      }
    }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  created() {
    console.log(this.$route)
    this.username = this.$route.params.username
    this.password = this.$route.params.password
  }
}
</script>

<style scoped lang="less">
.go-register {
  padding: 0;
  font-size: 18px;
  text-align: right;
  .link {
    color: orange;
  }
}
</style>
