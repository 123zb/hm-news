<template>
  <div class="test">
    <!-- autoCrop传了就是默认值为true -->
    <vue-cropper
      ref="cropper"
      img="http://himg2.huanqiu.com/attachment2010/2012/0814/20120814095136664.jpg"
      :outputSize="1"
      outputType="jpeg"
      :autoCrop="true"
      :info="true"
      :autoCropWidth="150"
      :autoCropHeight="150"
    ></vue-cropper>
    <van-button class="crop" type="primary" @click="crop">裁剪</van-button>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  //局部注册了头像裁剪插件
  components: {
    VueCropper
  },
  methods:{
    crop() {
      //裁剪图片
      this.$refs.cropper.getCropData(data => {
        //data是图片的base64编码
        console.log(data);
        
      })
    }
  }
}
</script>

<style lang="less" scoped>
.test {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.crop {
  position: absolute;
  bottom:0
}
</style>
