//配置路由信息
import Vue from 'vue'
import VueRouter from 'vue-router'
//导入组件
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'
import Edit from '../pages/Edit.vue'
import Test from '../pages/Test.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    //命名路由 指定name
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/edit',
      component: Edit,
      name: 'edit'
    },
    {
      path:'/test',
      component:Test,
      name:'test'
    }
  ]
})

//注册全局的导航守卫

//需要授权的路径，需要登录才能访问的路径
const authUrl = ['/user', '/edit']

router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  //include包含的意思
  if (authUrl.includes(to.path)) {
    //判断是否有token
    if (token) {
      next()
    } else {
      //没有token就去login
      next('/login')
    }
  } else {
    //放行
    next()
  }
})

export default router
