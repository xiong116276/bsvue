// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap-table/dist/bootstrap-table.min.css'
import 'bootstrap-table/dist/bootstrap-table.min'
import 'bootstrap-table/dist/locale/bootstrap-table-zh-CN.min'
import 'open-iconic/font/css/open-iconic-bootstrap.css'
import echarts from 'echarts'

import "@/assets/css/common.css";

import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import myGlobal from './components/Global'

import store from './store/index'

let serverSrc = '';
process.env.NODE_ENV === 'development' ? serverSrc='/api/bsvue/php/': serverSrc='http://192.168.0.101:8008/bsvue/php/';

Vue.config.productionTip = false;

Vue.prototype.myGlobal = myGlobal;
Vue.prototype.myServerSrc = serverSrc;

Vue.prototype.$echarts = echarts;

Vue.use(VueAxios, axios);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});



































