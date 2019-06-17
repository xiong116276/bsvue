<template>
  <div class="myContainer kaoqin-container">
    <div class="system-left left-select">
      <a @click="changePage(idx)" :class="[selectedIdx == idx?'active':'']" v-for="(item,idx) in list" :key="idx" :href="item.url" :target="item.target">{{item.name}}</a>
    </div>
    <div class="system-right right-container">
      <iframe class="iframe-page" name="tongjiRight" :src="list[0].url" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
  export default {
    name: "kaoqinshenpi",
    data(){
      return {
        list:[
          {name:'请假',url:this.kaoqinURL+'worker/leave',target:'tongjiRight'},
          {name:'加班',url:this.kaoqinURL+'worker/overtime',target:'tongjiRight'},
          {name:'外出',url:this.kaoqinURL+'worker/outsidesp',target:'tongjiRight'},
          {name:'忘打卡',url:this.kaoqinURL+'worker/forgetcard',target:'tongjiRight'}
        ],
        selectedIdx:0
      }
    },
    mounted(){

    },
    methods:{
      changePage(idx){
        this.selectedIdx = idx;
      }
    }
  }
</script>

<style lang="scss">
  .kaoqin-container{
    display: flex;
    flex-direction: row;

    .system-left{
      display: flex;
      flex-direction: column;
      align-items: center;
      a{
        display: inline-block;
        width: 160px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 4px;
        border: solid 1px #3e9ffe;
        color: #3e9ffe;
        margin-bottom: 20px;
        &.router-link-active,&.active{
          background-color: #3e9ffe;
          color: #fff;
        }
      }
    }
  }

</style>
