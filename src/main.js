import Vue from 'vue'
import App from './App.vue'
//导入通用的样式
import './styles/base.less'
//导入字体图标
import './styles/iconfont.less'
import 'lib-flexible'

Vue.config.productionTip = false
import router from './router'

//----------------------全局注册--------------------

import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo'
import HmButton   from './components/HmButton'



Vue.component('hm-header',HmHeader)
Vue.component('hm-logo',HmLogo)
Vue.component('hm-button',HmButton)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
