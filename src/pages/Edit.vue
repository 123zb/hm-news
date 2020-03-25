<template>
  <div class="edit">
    <hm-header>编辑资料</hm-header>
    <!-- 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt />
      <!-- 上传头像的组件 -->
      <van-uploader class="uploader" :after-read="afterRead" />
    </div>
    <hm-navbar title="昵称" :content="info.nickname" @click="showNickname"></hm-navbar>
    <hm-navbar title="密码" :content="info.password | password" @click="showPassword"></hm-navbar>
    <hm-navbar title="性别" :content="info.gender === 1 ? '男' : '女'" @click="showGender"></hm-navbar>

    <!-- 修改昵称 的对话框 -->

    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="editNickname">
      <van-field v-model="nickname" placeholder="请输入用户昵称"></van-field>
    </van-dialog>

    <!-- 修改密码的对话框 -->
    <van-dialog v-model="show1" title="修改密码" show-cancel-button @confirm="editPassword">
      <van-field v-model="password" placeholder="请输入用户密码"></van-field>
    </van-dialog>

    <!-- 修改x的对话框 -->
    <van-dialog v-model="show2" title="修改性别" show-cancel-button @confirm="editGender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>

    <div class="cropper-mask" v-show="showCropper">
      <vue-cropper
        ref="cropper"
        :img="img"
        :autoCrop="true"
        :autoCropWidth="150"
        :autoCropHeight="150"
        :fixed="true"
      ></vue-cropper>
      <van-button class="crop" type="primary" @click="crop">裁剪</van-button>
      <van-button class="cancel" type="info" @click="cancel">取消</van-button>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  data() {
    return {
      info: {
        // password: ''
      },
      show: false,
      //昵称
      nickname: '',
      //控制密码框的显示和隐藏
      show1: false,
      password: '',
      show2: false,
      gender: 1,
      showCropper: false,
      img: ''
    }
  },
  created() {
    //获取个人信息
    this.getInfo()
  },
  methods: {
    async getInfo() {
      //发送ajax请求
      const user_id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')
      const res = await this.$axios({
        method: 'get',
        url: `/user/${user_id}`
      })

      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
        console.log(this.info)
      }
    },
    async editUser(data) {
      const user_id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')
      const res = await this.$axios({
        method: 'post',
        url: `/user_update/${user_id}`,
        data
      })
      // console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        //1 重新渲染
        this.getInfo()
        //2 给一个成功的提示
        this.$toast.success(message)
      }
    },
    //显示修改昵称的对话框
    showNickname() {
      //对话框显示
      this.show = true
      //显示nickname
      this.nickname = this.info.nickname
    },
    //修改昵称
    editNickname() {
      // console.log('我要修改呢称了')
      //发送请求
      // const user_id = localStorage.getItem('user_id')
      // const token = localStorage.getItem('token')
      // this.$axios({
      //   method: 'post',
      //   url: `/user_update/${user_id}`,
      //   data: {
      //     nickname: this.nickname
      //   },
      //   headers: {
      //     Authorization: token
      //   }
      // }).then(res => {
      //   // console.log(res.data)
      //   const { statusCode, message } = res.data
      //   if (statusCode === 200) {
      //     //1 重新渲染
      //     this.getInfo()
      //     //2 给一个成功的提示
      //     this.$toast.success(message)
      //   }
      // })
      this.editUser({
        nickname: this.nickname
      })
    },
    showPassword() {
      this.show1 = true
      this.password = this.info.password
    },
    editPassword() {
      this.editUser({
        password: this.password
      })
      // const user_id = localStorage.getItem('user_id')
      // const token = localStorage.getItem('token')
      // this.$axios({
      //   method: 'post',
      //   url: `/user_update/${user_id}`,
      //   data: {
      //     password: this.password
      //   },
      //   headers: {
      //     Authorization: token
      //   }
      // }).then(res => {
      //   // console.log(res.data)
      //   const { statusCode, message } = res.data
      //   if (statusCode === 200) {
      //     //1 重新渲染
      //     this.getInfo()
      //     //2 给一个成功的提示
      //     this.$toast.success(message)
      //   }
      // })
    },
    showGender() {
      this.show2 = true
      this.gender = this.info.gender
    },
    editGender() {
      this.editUser({
        gender: this.gender
      })
    },
    afterRead(file) {
      //需要异步的上传文件

      //读取完这个文件就需要上传这个文件
      this.showCropper = true
      this.img = file.content

      // const fd = new FormData()
      // fd.append('file', file.file)
      // this.$axios({
      //   method: 'post',
      //   url: '/upload',
      //   data: fd,
      //   headers: {
      //     Authorization: localStorage.getItem('token')
      //   }
      // }).then(res => {
      //   const { statusCode, data } = res.data
      //   if (statusCode === 200) {
      //     this.editUser({
      //       head_img: data.url
      //     })
      //   }
      // })
    },
    beforeRead(file) {
      // if (file.size / 1024 >= 200) {
      //   this.$toast.fail('文件大小不能超过200kb')
      //   return false
      // }
      // if (file.type !== 'image/jpge') {
      //   this.$toast.fail('上传的文件必须是jpg文件')
      //   return false
      // }
      return true
    },
    cancel() {
      //取消裁剪
      this.showCropper = false
      this.img = ''
    },
    crop() {
      this.$refs.cropper.getCropBlob(async data => {
        //把裁剪出来的图片进行上传
        const fd = new FormData()
        fd.append('file', data)
        const res = await this.$axios({
          method: 'post',    
          url: '/upload',
          data: fd
        })
        //data 变量重复声明了 data结构之后重命名
        const { statusCode, data: data1 } = res.data
        if (statusCode === 200) {
          //隐藏裁剪框
          this.showCropper = false
          //把裁剪的图片地址清除
          this.img = ''
          //修改头像
          this.editUser({
            head_img: data1.url
          })
        }
      })
    }
  },
  filters: {
    password(input) {
      if (input) {
        return input.replace(/./g, '*')
      } else {
        return ''
      }
    }
  },
  components: {
    VueCropper
  }
}
</script>

<style lang="less" scoped>
.avatar {
  position: relative;
  img {
    width: 70px;
    height: 70px;
    display: block;
    border-radius: 50%;
    margin: 30px auto;
  }
  .uploader {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
}
.van-dialog {
  padding: 0 10px;
}
.van-field {
  border: 1px solid #ccc;
  margin: 10px 0;
}
.cropper-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
  .crop,
  .cancel {
    position: absolute;
    top: 0;
  }
  .crop {
    left: 0;
  }
  .cancel {
    right: 0;
  }
}
</style>
