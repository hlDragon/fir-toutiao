// 定义router对象  导出给main.js使用
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'

import Home from '@/views/home'

import Welcome from '@/views/welcome'

import Article from '@/views/article'

import NotFind from '@/views/404'

import Image from '@/views/image'

import Publish from '@/views/publish'

import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'welcome',
          component: Welcome
        },
        {
          path: 'article',
          name: 'article',
          component: Article
        },
        {
          path: 'image',
          name: 'image',
          component: Image
        },
        {
          path: '/publish',
          name: 'publish',
          component: Publish
        }
      ]
    },
    {
      path: '*',
      name: '404',
      component: NotFind
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

export default router
