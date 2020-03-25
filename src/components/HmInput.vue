<template>
  <div class="hm-input">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="inputFn"
      :class="{ success: status === 'success', error: status === 'error' }"
    />
    <div class="tips" v-show="status === 'error'">{{ message }}</div>
  </div>
</template>

<script>
export default {
  //用于接受父组件传递过来的数据
  // props: ['type', 'placeholder']
  props: {
    //接受type属性
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      dafault: '请输入...'
    },
    value: String,
    //传入正则表达式
    rule: RegExp,
    message: String
  },
  data() {
    return {
      status: ''
    }
  },
  methods: {
    inputFn(e) {
      let value = e.target.value
      this.$emit('input', e.target.value)
      this.validate(value)
    },
    //对表单进行校验
    validate(value) {
      //添加表单校验
      if (this.rule) {
        if (this.rule.test(value)) {
          this.status = 'success'
          return true
        } else {
          this.status = 'error'
          return false
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.hm-input {
  height: 50px;
  margin: 0 20px;
  input {
    height: 30px;
    line-height: 30px;
    outline: none;
    border: none;
    border-bottom: 1px solid #ccc;
    width: 100%;
    font-size: 16px;
    color: #666;

    &.success {
      border: 1px solid green;
    }

    &.error {
      border-color: red;
    }
  }

  .tips {
    color: red;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
  }
}
</style>
