import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import pages from '@/components/pages'
import home from '@/components/home'
import userInfor from '../components/xitongguanli/reyuanguanli/userInfor'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/pages',
      name: 'pages',
      component: pages,
      redirect:'/pages/home',
      children:[
        {
          path: '/pages/home',
          name: 'home',
          component: home,
        },
        {
          path: '/pages/userInfor',
          name: 'userInfor',
          component: userInfor
        }
      ]
    },
  ]
})
