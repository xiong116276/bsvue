<template>
  <div class="system myContainer">
    <div class="system-left left-select">
      <router-link to="/pages/system/userSet">用户设置</router-link>
      <router-link to="/pages/system/quanxian">角色权限</router-link>
      <router-link to="/pages/system/bumenshezhi">部门设置</router-link>
      <router-link to="/pages/system/yunyingdanwei">运营单位</router-link>
    </div>
    <div class="system-right right-container">
      <router-view id="systemContent"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "system"
  }
</script>

<style lang="scss">
  .system{
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
        &.router-link-active{
          background-color: #3e9ffe;
          color: #fff;
        }
      }
    }
  }

</style>
