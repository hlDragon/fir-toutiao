// 定义router对象  导出给main.js使用
import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: '/login',
      component: Login
    }
  ]
})

export default router