<template>
  <div id="userInfor">
    <breadnav :bread-crumb="breadCrumb"></breadnav>
    <div v-if="$store.state.userInfor.isShow">显示隐藏模块</div>
    <p>{{$store.state.userInfor.isShow}}</p>
    <a href="javascript:;" @click="$store.dispatch('Action')">click</a>
    <div id="toolbar"></div>
    <table id="table" data-search="true" data-search-align="left"></table>
  </div>
</template>

<script>
  import breadnav from '../../modules/breadnav';
  export default {
    name: "userSet",
    data(){
      return {
        tableJson: [],
        breadCrumb:['Home','Library','UserInfo']
      }
    },
    components:{
      breadnav,
    },
    mounted(){
      console.log(this.myGlobal);

      $.get('./static/test.json',function (res) {
        console.log(res)
        $('table').bootstrapTable({
          columns: [{
            title: 'ID',
            field: 'id',
            sortable:true
          }, {
            title: 'Item Name',
            field: 'name'
          }, {
            title: 'Item Price',
            field: 'price'
          }],
          data:res,
          striped: true,//是否显示行间隔色
          cache: false,//是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性
          pagination:true,//是否显示分页（*）
          paginationLoop: false,
          sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
          pageNumber:1,                       //初始化加载第一页，默认第一页
          pageSize: 10,                       //每页的记录行数（*）
          pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
          minimumCountColumns: 2,             //最少允许的列数
          clickToSelect: true,                //是否启用点击选中行
          // height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
          uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
          showExport:"true",
          toolbar:"#toolbar",
          exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'excel', 'pdf'],
        })
      });

    },
    methods:{

    }
  }
</script>

<style lang="scss">
  #userInfor{
    background-color: #fff;
  }
</style>
