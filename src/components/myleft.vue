<template>
  <div class="left-menu">
    <nav id="leftNav" class="nav flex-column">
      <div class="nav-item" v-for="(navItem, navIndex) in leftNav"  v-bind:key="navIndex">
        <div class="left-nav-0" v-if="navItem.children">
          <a class="left-nav-title" :name="navItem.name">
            <span class="glyphicon" :class="`glyphicon-${navItem.icon}`" aria-hidden="true"></span>
            <span class="text">{{navItem.name}}</span>
          </a>

          <div class="left-nav-1" v-for="(navItem1, navIndex1) in navItem.children"  v-bind:key="navIndex1">
            <div v-if="navItem1.children">
              <a class="left-nav-title" @click="nav1Click"  :name="navItem1.name">
                <span class="glyphicon" :class="`glyphicon-${navItem1.icon}`" aria-hidden="true"></span>
                <span class="text">{{navItem1.name}}</span>
              </a>

              <div class="left-nav-2">
                <router-link v-for="(navItem2, navIndex2) in navItem1.children"  v-bind:key="navIndex2" :to="navItem2.path" class="nav-link" href="#">
                  <span class="text" :name="navItem2.name">{{navItem2.name}}</span>
                </router-link>
              </div>
            </div>

            <router-link v-else :to="navItem1.path" class="nav-link" href="#" :name="navItem1.name">
              <span class="glyphicon" :class="`glyphicon-${navItem1.icon}`" aria-hidden="true"></span>
              <span class="text">{{navItem1.name}}</span>
            </router-link>
          </div>
        </div>
        <router-link v-else :to="navItem.path" class="nav-link" href="#" :name="navItem.name">
          <span class="glyphicon" :class="`glyphicon-${navItem.icon}`" aria-hidden="true"></span>
          <span class="text">{{navItem.name}}</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "left",
    data(){
      return{
        leftNav:[
          {
            name:'系统首页',
            icon:'home',
            path:'home'
          },
          {
            name:'系统管理',
            icon:'blackboard',
            children:[
              {
                name:'人员管理',
                icon:'play',
                children:[
                  {
                    name:'用户资料',
                    icon:'',
                    path:'userInfor'
                  },
                  {
                    name:'角色权限',
                    icon:'',
                    path:'home'
                  }
                ]
              }
            ]
          },
          {
            name:'系统首页',
            icon:'home',
            path:'home'
          },
          {
            name:'系统管理',
            icon:'blackboard',
            children:[
              {
                name:'人员管理',
                icon:'play',
                children:[
                  {
                    name:'用户资料',
                    icon:'',
                    path:'userInfor'
                  },
                  {
                    name:'角色权限',
                    icon:'',
                    path:'home'
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    created(){

    },
    methods:{
      nav1Click(event){
        var par = $(event.target).parents('.left-nav-1');
        var len = par.find('.left-nav-2').find('.nav-link').length;
        par.toggleClass('active');
        if(par.hasClass('active')){
          par.find('.left-nav-2').slideDown();
        }else{
          par.find('.left-nav-2').slideUp();
        }
      }
    }
  }
</script>

<style lang="scss">
  .left-menu{
    .nav{
      .text{
        margin: 0 0 0 5px;
      }
      a{
        &:hover{
          text-decoration: none;
        }
        &:link{
          text-decoration:none;
        }
      }
    }
    .left-nav-title,.nav-link{
      display: block;
      color: #333;
      cursor: pointer;
      height: 35px;
      line-height: 35px;
      padding: 0 15px;
      font-size: 15px;
      &:hover{
        background-color: #2995ff;
        color: #fff;
      }
    }
    .left-nav-1{
      .left-nav-title,.nav-link{
        padding-left: 38px;
      }
      .left-nav-2{
        /*height: 0;*/
        /*transition: height 500ms;*/
        overflow: hidden;
        display: none;
        .nav-link{
          padding-left: 80px;
        }
      }
      .glyphicon-play{
        transform: rotate(0deg);
        transition: transform 500ms;
      }
      &.active{
        .glyphicon-play{
          transform: rotate(90deg);
          transition: transform 500ms;
        }
      }
    }
    .router-link-active{
      background-color: #2995ff;
      color: #fff;
    }
  }
</style>
