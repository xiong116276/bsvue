// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap-table/dist/bootstrap-table.min.css'
import 'bootstrap-table/dist/bootstrap-table.min'
import 'bootstrap-table/dist/locale/bootstrap-table-zh-CN.min'
import 'bootstrap-table-fixed-columns-pro/bootstrap-table-fixed-columns-pro.css'
import 'bootstrap-table-fixed-columns-pro/bootstrap-table-fixed-columns-pro'
import layer from 'vue-layer'
import echarts from 'echarts'
/*日历插件*/
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';
//地址插件
import 'distpicker/dist/distpicker.min'


import "@/assets/css/common.css";

import Vue from 'vue'
import App from './App'
import router from './router'

// import axios from 'axios'
// import VueAxios from 'vue-axios'

import myGlobal from './components/Global'

import store from './store/index'

let serverSrc = '';
Vue.prototype.kaoqinURL = 'http://192.168.0.195:82/wxb.php/';
process.env.NODE_ENV === 'development' ? serverSrc='/api/': serverSrc='http://192.168.0.195:82/wxb.php/';
Vue.config.productionTip = false;

Vue.prototype.myGlobal = myGlobal;
Vue.prototype.myServerSrc = serverSrc;

Vue.prototype.$echarts = echarts;
Vue.prototype.$layer = layer(Vue);
// Vue.use(VueAxios, axios);
Vue.prototype.$ajaxGet = function (action, params) {
  return new Promise(function (resolve, reject) {
    $.get(serverSrc+action,params,
      function(data, status){
        if(typeof data == 'String'){
          resolve(JSON.parse(data));
        }else{
          resolve(data);
        }
      }
    ).fail(function (xhr, errorText, errorType) {
      reject(errorText);
    });
  });
};
Vue.prototype.$ajaxPost = function (action, params) {
  return new Promise(function (resolve, reject) {
    $.post(serverSrc+action,params,
      function(data, status){
        if(typeof data == String){
          resolve(data)
        }else{
          resolve(JSON.parse(data));
        }
      }
    ).fail(function (xhr, errorText, errorType) {
      reject(errorText);
    });
  });
};
Vue.prototype.$getDate = function(){
  var date = new Date();

  var Y = date.getFullYear();
  var M = date.getMonth()+1;
  var D = date.getDate();
  var week = ['日','一','二','三','四','五','六'][date.getDay()];

  var time = Y+' 年 '+M+' 月 '+D+' 日 &nbsp;&nbsp;&nbsp; 星期'+week;

  return time;
};

Vue.prototype.setCookie = function(name,value) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
Vue.prototype.getCookie = function(name) {
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg)){
    return unescape(arr[2]);
  } else{
    return null;
  }
}
Vue.prototype.delCookie = function(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=this.getCookie(name);
  if(cval!=null){
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
  }
}

Vue.prototype.$getWXCode = function (str) {
  var code = '';
  switch (str) {
    case '维修单号' : code = 'repairno';break;
    case '客户公司' : code = 'client';break;
    case '客户自编号' : code = 'carid';break;
    case '报修人' : code = 'reportman';break;
    case '维修人' : code = 'repairman';break;
    case '工单状态' : code = 'status';break;

    case '配件状态' : code = 'status';break;
    case '客户名称' : code = 'client';break;
    case '配件编号' : code = 'partsno';break;
    case '维修自编号' : code = 'repairno';break;
    case '申请人' : code = 'applyman';break;
    case '配件人' : code = 'deliveryrman';break;

    case '是否补贴' : code = 'subsidy';break;
    case '在线状态' : code = 'online';break;

    case '上传状态' : code = 'upload';break;
    case '订单号' : code = 'orderno';break;
    case '生产流水号' : code = 'linenum';break;
    case '车辆牌照号' : code = 'license';break;
    case 'VIN码' : code = 'vincode';break;
  }

  return code;
};

Vue.prototype.$statusTranslate = function (str) {
  var code = str;
  switch (str) {
    case '未派工' : code = '0';break;
    case '处理中' : code = '1';break;
    case '处理完成(待审批）' : code = '2';break;
    case '审批不通过' : code = '3';break;
    case '审批通过' : code = '4';break;
    case '已撤销' : code = '5';break;

    case '未补贴' : code = '0';break;
    case '已补贴' : code = '1';break;
    case '离线' : code = '0';break;
    case '运行' : code = '1';break;
    case '充电' : code = '2';break;

    case '未上传' : code = '0';break;
    case '已上传' : code = '1';break;
  }

  return code;
};

// this.axios({
//   method: 'POST',
//   url: this.myServerSrc+'sysmanagev2/get_data',
//   transformRequest: [function (data) {return Qs.stringify(data)}],
//   data: {type:1, timestamp: 1507628932}
// }).then(res=>{
//   console.log('res=>',res);
// }).catch(
//   err=>{console.log('err=>',err)}
// )

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});



































