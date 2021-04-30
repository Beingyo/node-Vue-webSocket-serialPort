import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'index', meta: {title: '首页'}, component: () => import('@/components/index')},

    {path: '/demo1', name: 'demo1', meta: {title: '串口收发数据'}, component: () => import('@/pages/demo1')},
    {path: '/demo2', name: 'demo2', meta: {title: 'WebSocket调试'}, component: () => import('@/pages/demo2')},
  ]
})
