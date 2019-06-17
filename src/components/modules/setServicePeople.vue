<template>
  <div id="setServicePeople">
    <div class="top">
      <div class="search-container"><input v-model="searchInput" type="search" placeholder="请输入客户名称查询" class="input"><span class="glyphicon glyphicon-search"></span></div>
      <div class="mybtns2">
        <span class="btn btn-sm" @click="query">查询</span>
        <span class="btn btn-sm" @click="reset">重置</span>
      </div>
    </div>
    <div class="content">
      <table id="servicePeopleTable" class="reset_scrollbar_all"></table>
    </div>
  </div>

</template>

<script>
  import editServerPeople from '../modules/editServerPeople'
  export default {
    name: "setServicePeople",
    components:{editServerPeople},
    props:{
      layerid: {type: String, default:""},
    },
    data(){
      return {
        searchInput:'',
        allData:[],
        tableData:[],
        tableColumns:[],
        defaultParams:{"client": "","index":"","type":"","count":"",'timestamp':Date.parse(new Date()) / 1000}
      }
    },
    mounted(){
      var _this = this;
      var load = this.$layer.loading();
      this.getData(this.defaultParams).then(data =>{
        this.allData = data.arr2;
        this.tableColumns = data.arr1;
        this.tableData = this.allData;

        this.drawTable(_this.tableData);

        this.$layer.close(load);
      });
    },
    methods:{
      getField (num){//命名field
        var field = '';
        switch (num){
          case 0 :field = 'client';break;
          case 1 :field = 'contactman';break;
          case 2 :field = 'contactphone';break;
          case 3 :field = 'location';break;
          case 4 :field = 'chargeman';break;
          case 5 :field = 'operation';break;
        }
        return field;
      },
      setHeader(tHeader){//column 设置
        var _this = this;
        var arr1 = [];
        $.each(tHeader,function (k,v) {
          if(k < 6){
            var field = _this.getField(k);
            if(k == 5){
              arr1.push({
                title: v,
                field: field,
                valign:'middle',
                halign:'center',
                formatter:_this.tableOperation
              });
            }else{
              arr1.push({
                title: v,
                field: field,
                valign:'middle'
              });
            }
          }
        });
        return arr1;
      },
      getData(params){
        var _this = this;
        return new Promise(function (resolve, reject) {
          var load = _this.$layer.loading();
          _this.$ajaxPost('repairmanagev2/get_repair_man',params)
            .then(res => {
              var data = res.data.data;
              var tHeader = data[0];
              var tBody =data.slice(1);
              var arr2 = [];
              $.each(tBody,function (k,v) {
                var obj = {};
                $.each(v,function (m,n) {
                  var field = _this.getField(m);
                  obj[field] = n;
                });
                arr2.push(obj);
              });
              var arrs= {arr1:_this.setHeader(tHeader), arr2:arr2,};
              resolve(arrs);
              _this.$layer.close(load);
            }).catch(err => {console.log(err)});
        });
      },
      query(){
        var val = this.searchInput;
        var _this = this;
        if(val == ''){
          this.$layer.msg('请输入用户名！')
        }else{
          var arr1 = [];
          var arr2 = [];
          _this.allData.forEach(function (v, k) {
            arr1.push(v['client']);
          });
          arr1.forEach(function (v2, k2) {
            if(v2.indexOf(val) > -1){
              arr2.push(_this.allData[k2]);
            }
          });

          _this.tableData = arr2;
          $('#servicePeopleTable').bootstrapTable('load', _this.tableData);
        }
      },
      reset(){
        this.searchInput = '';
        this.tableData = this.allData;
        $('#servicePeopleTable').bootstrapTable('load', this.tableData);
      },
      drawTable(data){
        var _this = this;
        $('#servicePeopleTable').bootstrapTable('destroy').bootstrapTable({
          columns:_this.tableColumns,
          data:data,
          striped: true, //是否显示行间隔色
          cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性
          minimumCountColumns: 2,             //最少允许的列数
          height:250,
        });
        //编辑
        $('#servicePeopleTable').on('click','.btn-edit',function (e) {_this.edit(e.target);});
      },
      tableOperation(value, row, index, field){
        return '<div class="btn-operation"><span class="btn-edit">编辑</span></div>';
      },
      edit(e){
        var _this = this;
        var idx = $(e).parents('tr').attr('data-index');
        var row = this.allData[idx];
        var layer = this.$layer.iframe({
          type: 2, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
          title: '客户信息编辑',
          content: {
            content:editServerPeople,
            parent:this,
            data:{
              row:row
            }
          },
          shadeClose: false,//点击遮罩是否关闭
          area: ['750px','650px'],
          offset:  'auto',
          shade: true,//是否显示遮罩
        });
      }
    }
  }
</script>

<style lang="scss">
#setServicePeople{
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
      .btn-edit{
        padding: 0;
        color: #0066ff;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>
