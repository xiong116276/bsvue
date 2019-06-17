<template>
  <nav class="navbar navbar-default headerNav">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link class="navbar-logo" to="/pages">
          <img :src="logoImg" alt=""><span class="text">上海万象智控云管理平台</span>
        </router-link>
      </div>
      <div class="navbar-list navbar-h">
        <div class="navbar-h-item" v-for="(navItem,navIdx) in navList" v-bind:key="navIdx">
          <div class="dropdown" v-if="navItem.children">
            <p class="nav-name dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              {{navItem.name}} <span class="caret"></span>
            </p>
            <ul class="dropdown-menu glyphicon glyphicon-triangle-top">
              <li v-for="(navItem1,navIdx1) in navItem.children" v-bind:key="navIdx1">
                <router-link :to="navItem1.path">{{navItem1.name}}</router-link>
              </li>
            </ul>
          </div>
          <router-link  v-else :to="navItem.path" class="nav-name">{{navItem.name}}</router-link>
        </div>
      </div>
      <div v-show="$store.state.header.isShowRight" class="top-right pull-right">
        <div class="top-right-item username">
          <div class="headImg dropdown">
            <img :src="headImg" class="img-responsive dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            <ul class="dropdown-menu glyphicon glyphicon-triangle-top">
              <li><a href="#">修改密码</a></li>
              <li><a @click="signOut">退出登录</a></li>
            </ul>
          </div>
          <span class="text">{{userName}}</span>
        </div>
        <div class="top-right-item butie">
          <div class="msgImg"><img :src="msgImg" alt=""><span class="badge">{{butie}}</span></div>
          <span class="text">补贴提醒</span>
        </div>
        <div class="top-right-item btn-refresh" @click="reFresh">
          <span class="glyphicon glyphicon-repeat"></span>
          <span class="text">刷新</span>
        </div>
        <div class="top-right-item time" v-html="timeCurrent"></div>
      </div>
      <!--<li> <a class="dropdown-item" @click="signOut" href="#">退出</a></li>-->
    </div>
  </nav>
</template>

<script>
  export default {
    name: "myheader",
    data(){
      return {
        userName:'',
        butie:'1',
        timeCurrent:this.$getDate(),
        logoImg:'./static/images/LOGO.png',
        headImg:'./static/images/user.png',
        msgImg:'./static/images/yj.png',
        navList:[
          {
            path:'/pages/home',
            name:'首页'
          },
          {
            // path:'/pages/home',
            name:'车辆管理',
            children:[
              {
                path:'/pages/CarsManagement/yicheyidang',
                name:'一车一档'
              },
              {
                path:'/pages/CarsManagement/yunxingjiankong',
                name:'运行监控'
              },
              {
                path:'/pages/CarsManagement/shishishuju',
                name:'实时数据'
              }
            ]
          },
          {
            // path:'/pages/home',
            name:'维修管理',
            children:[
              {
                path:'/pages/sevice/weixiujilu',
                name:'维修记录'
              },
              {
                path:'/pages/sevice/peijiandiaohuo',
                name:'配件调货'
              }
            ]
          },
          {
            // path:'/pages/home',
            name:'考勤管理',
            children:[
              {
                path:'/pages/kaoqin/kaoqintongji',
                name:'考勤统计'
              },
              {
                path:'/pages/kaoqin/kaoqinshenpi',
                name:'考勤审批'
              },
              {
                path:'/pages/kaoqin/kaoqinshezhi',
                name:'考勤设置'
              }
            ]
          },
          {
            path:'/pages/system',
            name:'系统管理',
          }
        ]
      }
    },
    mounted(){
      var _this = this;
      var username = sessionStorage.getItem('username');

      if(username == ''||username == undefined||username == null){
        this.$router.push('/');
      }else{
        this.userName = username;
      }

      var W = document.getElementById('myheader').offsetWidth;

      if(W <= 1450){
        _this.$store.dispatch('rightHide');
      }else{
        _this.$store.dispatch('rightShow');
      }
    },
    methods:{
      signOut(){
        var _this = this;
        var html = `<div class="layer-confirm-text">确定退出登录吗！</div>`;
        this.$layer.confirm(html,function (idx) {
          sessionStorage.setItem('username','');
          sessionStorage.setItem('password','');
          _this.$layer.close(idx);
          _this.$router.push('/');
        });
      },
      reFresh(){
        // this.$router.push(this.$route.fullPath);
        window.location.reload();
      }
    }
  }
</script>

<style lang="scss">
.headerNav{
  font-size: 16px;
  .top-right{
    .top-right-item{
      float: left;
      height: 65px;
      display: flex;
      margin-left: 15px;
      flex-direction: row;
      align-items: center;
      color: #fefefe;
      .headImg{
        width: 40px;
        height: 40px;
      }
      .text{
        margin: 0 0 0 10px;
      }
    }

    .butie{
      cursor:pointer;
    }
    .btn-refresh{
      cursor: pointer;
      .glyphicon{
        font-size: 18px;
      }
    }
    .msgImg{
      position: relative;
      .badge{
        position: absolute;
        top: -30%;
        right: -30%;
        background-color: #ff0000;
      }
    }

    .headImg{
      .dropdown-menu{
        left: 50%;
        transform: translate(-50%,12px);
      }
    }
  }
}
</style>
