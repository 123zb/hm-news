import Vue from 'vue'
import App from './App.vue'
//导入通用的样式
import './styles/base.less'
//导入字体图标
import './styles/iconfont.less'
//导入lib-flexible模块，会自动适配所有的屏幕、
//会给每个屏幕设置一个html的大小  会把屏幕的大小/10 = 1rem
import 'lib-flexible'

Vue.config.productionTip = false
//导入路由对象
import router from './router'

import axios from 'axios'

//----------------------全局注册--------------------

import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo'
import HmButton from './components/HmButton'
import HmInput from './components/HmInput.vue'

Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-button', HmButton)
Vue.component('hm-input', HmInput)

//axios的优化
//aioxs和vue没有关系，强行让axios和vue有关系
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = axios

//------------------vant-ui的处理-------------------
// import Vant from 'vant'
// import 'vant/lib/index.css'
// //使用vant的插件
// Vue.use(Vant)

//按需加载的方式
import { Button,Field,Toast } from 'vant'
Vue.use(Button)
Vue.use(Field)
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
