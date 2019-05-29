<template>
  <div id="app">
    <router-view/>

    <!-- 模态框 -->
    <div class="modal fade" id="myModalSignOut">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- 模态框头部 -->
          <div class="modal-header">
            <h4 class="modal-title">退出提示</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- 模态框主体 -->
          <div class="modal-body">
            确定要退出登录吗？
          </div>

          <!-- 模态框底部 -->
          <div class="modal-footer">
            <button type="button" @click="signOut" class="btn btn-success" data-dismiss="modal">确定</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {

    }
  },
  components:{

  },
  created(){

  },
  methods:{
    signOut(){
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

</style>
