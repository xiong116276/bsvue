<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="(breadItem,breadIdx) in breadCrumb" v-bind:key="breadIdx" class="breadcrumb-item" :class="[(breadIdx == len) ?'active':'']" :aria-current="[(breadIdx == len) ?'page':'']">{{breadItem}}</li>
    </ol>
  </nav>
</template>

<script>
  export default {
    name: "breadnav",
    props:{
      breadCrumb:Array
    },
    data(){
      return {
        len:''
      }
    },
    mounted(){
      this.len = this._props.breadCrumb.length - 1;
    }
  }
</script>

<style lang="scss">

</style>
