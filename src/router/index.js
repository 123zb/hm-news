//配置路由信息
import Vue from 'vue'
import VueRouter from 'vue-router'
//导入组件
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'
import Edit from '../pages/Edit.vue'
import Test from '../pages/Test.vue'
import MyFollow from '../pages/MyFollow.vue'
import MyComments from '../pages/MyComments.vue'
import MyStar from '../pages/MyStar.vue'
import Home from '../pages/Home.vue'
import PostDetail from '../pages/PostDetail.vue'
Vue.use(VueRouter)

//解决报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  //配置路由规则
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home'
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
      path: '/test',
      component: Test,
      name: 'test'
    },
    {
      path: '/my-follow',
      component: MyFollow,
      name: 'my-follow'
    },
    {
      path: '/my-comments',
      component: MyComments,
      name: 'my-comments'
    },
    {
      path: '/my-star',
      component: MyStar,
      name: 'my-star'
    },
    {
      path:'/post-detail/:id',
      component:PostDetail,
      name:'post-detail'
    }
  ]
})

//注册全局的导航守卫

//需要授权的路径，需要登录才能访问的路径
const authUrl = ['/user', '/edit', '/my-follow', '/my-comments', '/my-star']

router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  //include包含的意思
  if (authUrl.includes(to.path)) {
    //判断是否有token
    if (token) {
      next()
    } else {
      //没有token就去login
      // next('/login')
      router.push('/login')
    }
  } else {
    //放行
    next()
  }
})

export default router
