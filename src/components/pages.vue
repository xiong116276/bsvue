<template>
  <div id="pages">
    <myheader id="myheader"></myheader>
    <!--<myleft id="myleft"></myleft>-->
    <router-view id="mycontent"/>
  </div>
</template>

<script>
  import myheader from '@/components/header/myheader';
  // import myleft from '@/components/myleft';
  export default {
    name: "pages",
    components:{
      myheader,
      // myleft,
    },
  }
</script>

<style lang="scss">

</style>
