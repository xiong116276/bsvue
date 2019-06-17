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
    name: "kaoqintongji",
    data(){
      return {
        list:[
          {name:'打卡记录',url:this.kaoqinURL+'worker/cardrecord',target:'tongjiRight'},
          {name:'每日统计',url:this.kaoqinURL+'worker/dailytj',target:'tongjiRight'},
          {name:'考勤汇总',url:this.kaoqinURL+'worker/statistics',target:'tongjiRight'}
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
