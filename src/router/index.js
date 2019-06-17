import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import pages from '@/components/pages'
import home from '@/components/home'
//车辆管理
import yicheyidang from '../components/cars/yicheyidang/yicheyidang'
import carsdetail from '../components/cars/yicheyidang/carsdetail'
import yunxingjiankong from '../components/cars/yunxingjiankong/yunxingjiankong'
import shishishuju from '../components/cars/shishishuju/shishishuju'
//维修管理
import weixiujilu from '../components/service/weixiujilu/weixiujilu'
import peijiandiaohuo from '../components/service/peijiandiaohuo/peijiandiaohuo'
//考勤管理
import kaoqintongji from '../components/kaoqin/kaoqintongji/kaoqintongji'
import kaoqinshenpi from '../components/kaoqin/kaoqinshenpi/kaoqinshenpi'
import kaoqinshezhi from '../components/kaoqin/kaoqinshezhi/kaoqinshezhi'
//系统管理
import system from '../components/system/system'
import userSet from '../components/system/user-set/userSet.vue'
import quanxian from '../components/system/quanxian/quanxian.vue'
import bumenshezhi from '../components/system/bumenshezhi/bumenshezhi.vue'
import yunyingdanwei from '../components/system/yunyingdanwei/yunyingdanwei.vue'

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
        {//首页
          path: '/pages/home',
          name: 'home',
          component: home,
        },
        {//车辆管理
          path: '/pages/CarsManagement/yicheyidang',
          name: 'yicheyidang',
          component: yicheyidang,
        },
        {
          path: '/pages/CarsManagement/carsdetail/:id/:tid',
          name: 'carsdetail',
          component: carsdetail
        },
        {
          path: '/pages/CarsManagement/yunxingjiankong',
          name: 'yunxingjiankong',
          component: yunxingjiankong
        },
        {
          path: '/pages/CarsManagement/shishishuju',
          name: 'shishishuju',
          component: shishishuju
        },
        {//维修管理
          path: '/pages/sevice/weixiujilu',
          name: 'weixiujilu',
          component: weixiujilu
        },
        {
          path: '/pages/sevice/peijiandiaohuo',
          name: 'peijiandiaohuo',
          component: peijiandiaohuo
        },
        {//考勤管理
          path: '/pages/kaoqin/kaoqintongji',
          name: 'kaoqintongji',
          component: kaoqintongji
        },
        {
          path: '/pages/kaoqin/kaoqinshenpi',
          name: 'kaoqinshenpi',
          component: kaoqinshenpi
        },
        {
          path: '/pages/kaoqin/kaoqinshezhi',
          name: 'kaoqinshezhi',
          component: kaoqinshezhi
        },
        {//系统管理
          path:'/pages/system',
          name:'system',
          component:system,
          redirect:'/pages/system/userSet',
          children:[
            {
              path: '/pages/system/userSet',
              name: 'userSet',
              component: userSet
            },
            {
              path: '/pages/system/quanxian',
              name: 'quanxian',
              component: quanxian
            },
            {
              path: '/pages/system/bumenshezhi',
              name: 'bumenshezhi',
              component: bumenshezhi
            },
            {
              path: '/pages/system/yunyingdanwei',
              name: 'yunyingdanwei',
              component: yunyingdanwei
            }
          ]
        }
      ]
    },
  ]
})
