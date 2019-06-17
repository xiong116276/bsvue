<template>
  <div id="setPJPeople">
    <div class="top">
      <div class="mybtn" @click="addPeople">
        <span class="glyphicon glyphicon-plus"></span>新建
      </div>
    </div>
    <div class="content">
      <table id="setPJPeopleTable" class="reset_scrollbar_all"></table>
    </div>
  </div>

</template>

<script>
  import selectPeople from '../modules/selectPeople'
  export default {
    name: "setPJPeople",
    components:{selectPeople},
    props:{
      layerid: {type: String, default:""},
    },
    data(){
      return {
        allData:[],
        tableData:[],
        tableColumns:[],
      }
    },
    mounted(){
      var _this = this;
      this.allData = [
        {
          "tr1": "李枕",
          "tr2": "售后服务部(二部)",
          "tr3": "13816638197",
          "tr4": "lic@wxdaeaoo.com",
          "tr5": "删除",
        },
        {
          "tr1": "李枕",
          "tr2": "售后服务部(二部)",
          "tr3": "13816638197",
          "tr4": "lic@wxdaeaoo.com",
          "tr5": "删除",
        },
        {
          "tr1": "李枕",
          "tr2": "售后服务部(二部)",
          "tr3": "13816638197",
          "tr4": "lic@wxdaeaoo.com",
          "tr5": "删除",
        },
        {
          "tr1": "李枕",
          "tr2": "售后服务部(二部)",
          "tr3": "13816638197",
          "tr4": "lic@wxdaeaoo.com",
          "tr5": "删除",
        },
        {
          "tr1": "李枕",
          "tr2": "售后服务部(二部)",
          "tr3": "13816638197",
          "tr4": "lic@wxdaeaoo.com",
          "tr5": "删除",
        },
        {
          "tr1": "李枕",
          "tr2": "售后服务部(二部)",
          "tr3": "13816638197",
          "tr4": "lic@wxdaeaoo.com",
          "tr5": "删除",
        },
        {
          "tr1": "李枕",
          "tr2": "售后服务部(二部)",
          "tr3": "13816638197",
          "tr4": "lic@wxdaeaoo.com",
          "tr5": "删除",
        },
        {
          "tr1": "李枕",
          "tr2": "售后服务部(二部)",
          "tr3": "13816638197",
          "tr4": "lic@wxdaeaoo.com",
          "tr5": "删除",
        },
        {
          "tr1": "李枕",
          "tr2": "售后服务部(二部)",
          "tr3": "13816638197",
          "tr4": "lic@wxdaeaoo.com",
          "tr5": "删除",
        },
        {
          "tr1": "李枕",
          "tr2": "售后服务部(二部)",
          "tr3": "13816638197",
          "tr4": "lic@wxdaeaoo.com",
          "tr5": "删除",
        }
      ];
      this.tableColumns = [
        {
          title: '姓名',
          field: 'tr1'
        },
        {
          title: '公司部门',
          field: 'tr2',
        },
        {
          title: '联系电话',
          field: 'tr3',
        },
        {
          title: '邮箱',
          field: 'tr4',
        },
        {
          title: '操作',
          field: 'tr5',
          halign:'center',
          formatter:this.tableOperation
        }
      ];
      this.tableData = this.allData;

      setTimeout(function () {
        _this.drawTable(_this.tableData);
      },200);
    },
    methods:{
      drawTable(data){
        var _this = this;
        $('#setPJPeopleTable').bootstrapTable('destroy').bootstrapTable({
          columns:_this.tableColumns,
          data:data,
          striped: true, //是否显示行间隔色
          cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性
          minimumCountColumns: 2,             //最少允许的列数
          height:250,
        });
        //编辑
        $('#setPJPeopleTable').on('click','.btn-delete',function (e) {_this.deletePeople(e.target);});
      },
      tableOperation(){
        return '<div class="btn-operation"><span class="btn-delete">删除</span></div>';
      },
      addPeople(event){
        var _this = this;
        var type = 'addPJPeople';
        var layer = this.$layer.iframe({
          type: 2, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
          title: '选择人员',
          content: {
            content:selectPeople,
            parent:this,
            data:{
              addType:type
            }
          },
          shadeClose: false,//点击遮罩是否关闭
          area: ['640px','515px'],
          offset:  'auto',
          shade: true,//是否显示遮罩
        });
      },
      deletePeople(e){
        var _this = this;
        var idx = $(e).parents('tr').attr('data-index');
        var html = `<div class="layer-confirm-text">确定删除该人员？</div>`;
        this.$layer.confirm(html,{title:'删除提示'},function (index) {
          console.log('确定删除：'+idx);
        });
      }
    }
  }
</script>

<style lang="scss">
  #setPJPeople{
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top{
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;
    }
    .search-container{
      position: relative;
      .input{
        padding: 0 30px 0 10px;
      }
      .glyphicon-search{
        position: absolute;
        top: 7px;
        right: 10px;
        color: #ddd;
        font-size: 15px;
        cursor: default;
      }
    }

    .content{
      flex: 1;
      overflow: auto;
      table{
        width: 100%;
        height: 100%;
        .btn-delete{
          padding: 0;
          color: #0066ff;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
</style>
