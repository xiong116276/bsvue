<template>
  <div class="myContainer weixiujilu">
    <div class="left-select reset_scrollbar_v">
      <p class="title">筛选</p>
      <div class="select-list">
        <div class="select-group" :style="{zIndex:1000 - Idx}" v-for="(Item,Idx) in selectList" :key="Idx">
          <p class="select-name" v-if="Idx < `${selectList.length-1}`"><span>{{Item.name}}</span></p>
          <p class="select-name" v-else><span>{{Item.name}}</span> <span @click="deleteSelected(Idx)" class="icon-delete">×</span></p>

          <select :name="Item.name" @change="getSelectVal(Idx)">
            <option v-for="(selectItem,selectIdx) in Item.list" :key="selectIdx" :value="selectItem">{{selectItem}}</option>
          </select>
        </div>
      </div>
      <div class="select-type">
        <select name="selectType" @change="typeChange">
          <option v-for="(typeItem,typeIdx) in selectType" :key="typeIdx" :value="typeItem">{{typeItem}}</option>
        </select>
        <select class="next-select"></select>
      </div>
      <div class="input-list">
        <div class="select-group"><p class="select-name">报修时间(起)</p>
          <date-picker @dp-show="doSomethingOnShow" @dp-hide="doSomethingOnHide" autocomplete="off" class="input" id="repairStart" v-model="repairStart" :config="config"></date-picker>
        </div>
        <div class="select-group"><p class="select-name">报修时间(止)</p>
          <date-picker @dp-show="doSomethingOnShow" @dp-hide="doSomethingOnHide" autocomplete="off" class="input" id="repairEnd" v-model="repairEnd" :config="config"></date-picker>
        </div>
      </div>
      <div class="input-list">
        <div class="select-group"><p class="select-name">完成时间(起)</p>
          <date-picker @dp-show="doSomethingOnShow" @dp-hide="doSomethingOnHide" autocomplete="off" class="input" id="completeStart" v-model="completeStart" :config="config"></date-picker>
        </div>
        <div class="select-group"><p class="select-name">完成时间(止)</p>
          <date-picker @dp-show="doSomethingOnShow" @dp-hide="doSomethingOnHide" autocomplete="off" class="input" id="completeEnd" v-model="completeEnd" :config="config"></date-picker>
        </div>
      </div>

      <div class="btns">
        <span class="btn btn-reset" @click="btnReset">重置</span>
        <span class="btn btn-confirm" @click = "btnConfirm">确定</span>
      </div>
    </div>
    <div class="right-container">
      <div class="right-content">
        <div class="top-bar">
          <breadnav :breadCrumb="breadCrumb"></breadnav>
          <div class="mybtns">
            <span id="btn_add_order" class="btn btn-sm" @click="addOrder">新增维修工单</span>
            <span id="btn_patch_order" class="btn btn-sm" @click="patchOrder">补传维修工单</span>
            <span id="btn_set_people" class="btn btn-sm" @click="setPeople">维修人员设置</span>
            <span id="btn_export" class="btn btn-sm" @click="exportTable">导出</span>
          </div>
        </div>
        <div class="main">
          <div id="toolbar"></div>
          <table id="table"></table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import breadnav from '../../modules/breadnav';
  import serviceOrder from '../../modules/serviceOrder';
  import setServicePeople from '../../modules/setServicePeople';
  import repairDetail from '../../modules/repairDetail';
  import upLoadWxOrder from '../../modules/upLoadWxOrder';
  import datePicker from 'vue-bootstrap-datetimepicker/dist/vue-bootstrap-datetimepicker';
  export default {
    name: "weixiujilu",
    components:{breadnav,datePicker,serviceOrder,setServicePeople,repairDetail,upLoadWxOrder},
    data(){
      return {
        zIndex:'',
        selectType:['条件筛选','工单状态','客户公司','维修单号','客户自编号','报修人','维修人'],
        selectList:[],
        selected:[],
        breadCrumb:['维修管理','维修记录'],
        homeTable:[],
        tableColumns:[],
        repairStart:'',
        repairEnd:'',
        completeStart:'',
        completeEnd:'',
        config:{
          format: 'YYYY-MM-DD',
          useCurrent: false,
          locale: 'zh-cn',
        },
        defaultParams : {
          "loginuser":"谷延军",
          "status":"",
          "client":"",
          "repairno":"",
          "carid":"",
          "reportman":"",
          "repairman":"",
          "index":"",
          "count":"",
          "repairstartt":"",
          "repairsendt":"",
          "finishstartt":"",
          "finishendt":"",
          "timestamp":Date.parse(new Date())/1000
        },
        chooseFile:''
      }
    },
    mounted(){
      var _this = this;
      this.renderTable(this.defaultParams);

      $('.weixiujilu').on('click','.btn-cancel',function () {_this.cancel(event)});
      $('.weixiujilu').on('click','.btn-detail',function () {_this.showDetil(event)});
    },
    methods:{
      renderTable(params){
        var _this = this;
        this.getData(params).then(function (data) {
          _this.tableColumns = data.arr1;
          _this.homeTable = data.arr2;
          _this.drawTable(_this.homeTable);
        });
      },
      getField (num){//命名field
        var field = '';
        switch (num){
          case 0 :field = 'repairno';break;
          case 1 :field = 'client';break;
          case 2 :field = 'carid';break;
          case 3 :field = 'reportman';break;
          case 4 :field = 'repairman';break;
          case 5 :field = 'reporttime';break;
          case 6 :field = 'completetime';break;
          case 7 :field = 'status';break;
          case 8 :field = 'operation';break;
        }
        return field;
      },
      setHeader(tHeader){//column 设置
        var _this = this;
        var arr1 = [];
        $.each(tHeader,function (k,v) {
          if(k < 9){
            var field = _this.getField(k);
            if(k == 8){
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
      getData(params){//ajax 获取到数据
        var _this = this;
        return new Promise(function (resolve, reject) {
          var load = _this.$layer.loading();
          _this.$ajaxPost('repairmanagev2/get_repair_record',params)
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
      typeChange(e){
        var selIdx = e.target.selectedIndex;
        var name = this.selectType[selIdx];

        if(selIdx > 0){
          this.selectType.splice(selIdx,1);
          e.target.selectedIndex = 0;
          this.addSelect(name);
        }
      },
      getSelectVal(idx){
        var name = this.selectList[idx].name;
        var val = $('select[name="'+name+'"]').val();
        var len = this.selected.length-1 - idx;

        this.selected.forEach(function (v, index) {
          if(v.name == name){
            v.val = val;
          }
        });
        this.selectList = this.selectList.slice(0,idx+1);

        if(len > 0){
          var arr = this.selected.slice(idx+1,this.selected.length);
          for(var i = 0;i < len ;i++){
            this.selectType.splice(1,0,arr[i].name);
          }
        }

        this.selected = this.selected.slice(0,idx+1);
      },
      deleteSelected(idx){
        var name = this.selectList[idx].name;
        this.selectList.splice(idx,1);
        this.selected.splice(this.selected.indexOf(name),1);
        this.selectType.splice(1,0,name);
      },
      addSelect(name){
        var _this = this;
        var list = [];
        var code = this.$getWXCode(name);
        var params = this.getParams(this.selected);

        params[code] = '';

        this.getData(Object.assign(this.defaultParams, params)).then(function (data) {
          var arr2 = data.arr2;
          $.each(arr2,function (k,v) {
            if(list.indexOf(v[code]) == -1){
              list.push(v[code])
            }
          });

          _this.selectList.push({name:name, list:list});
          _this.selected.push({'name':name,'val':list[0],list:list,code:code});
        });
      },
      getParams(selected){//获取已选择的筛选项
        var _this = this;
        var params = {};
        $.each(selected,function (k,v) {
          params[v.code] = v.val;
        });
        if(params.hasOwnProperty('status')){
          params.status = _this.$statusTranslate(params.status);
        }
        return params;
      },
      btnReset(){
        this.selectType = ['条件筛选','工单状态','客户公司','维修单号','客户自编号','报修人','维修人'];
        this.defaultParams ={
          "loginuser":"谷延军",
            "status":"",
            "client":"",
            "repairno":"",
            "carid":"",
            "reportman":"",
            "repairman":"",
            "index":"",
            "count":"",
            "repairstartt":"",
            "repairsendt":"",
            "finishstartt":"",
            "finishendt":"",
            "timestamp":Date.parse(new Date())/1000
        };
        this.selectList = [];
        this.selected = [];
        this.repairStart = '';
        this.repairEnd = '';
        this.completeStart = '';
        this.completeEnd = '';
      },
      btnConfirm(){
        var _this = this;
        var params = this.getParams(this.selected);
        params['repairstartt']=this.repairStart;
        params['repairsendt']=this.repairEnd;
        params['finishstartt']=this.completeStart;
        params['finishendt']=this.completeEnd;

        this.renderTable(Object.assign(this.defaultParams,params));
      },
      doSomethingOnShow(){
        var top = $('.left-select').scrollTop();
        $('.left-select').css({'overflow':'unset','top':'-'+top+'px'});
      },
      doSomethingOnHide(){
        $('.left-select').css({'overflow':'auto','top':0});
      },
      drawTable(data){
        var _this = this;
        $('#table').bootstrapTable('destroy').bootstrapTable({
          columns:_this.tableColumns,
          data:data,
          striped: true, //是否显示行间隔色
          cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性
          minimumCountColumns: 2,             //最少允许的列数
          pagination: true,//分页
          paginationPreText: "上一页",
          paginationNextText: "下一页",
          paginationLoop:false,
          pageSize: 10,
          pageList: [10, 15, 20],
          rowAttributes:this.rowAttributes,
        }).on('page-change.bs.table', function (e, number, size) {
          // console.log(number,size)
        })
      },
      tableOperation(value, row, index, field){
        // console.log(row,field);
        return `<div class="mybtns btn-operation" data-index = ${index}>
                <span class='btn btn-sm btn-detail btn-genjin'>跟进</span><span class='btn btn-sm btn-cancel'>撤销</span>
              </div>`;
      },
      addOrder(){
        var _this = this;

        var layer = this.$layer.iframe({
          type: 2, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
          title: '维修单',
          content: {
            content: serviceOrder,
            parent: this,
            data: {
              refreshTable:function () {
                _this.renderTable(_this.defaultParams);
                _this.$layer.closeAll();
              }
            }
          },
          shadeClose: false,//点击遮罩是否关闭
          area: ['460px','700px'],
          offset:  'auto',
          shade: true,//是否显示遮罩
        });
      },
      patchOrder(){
        var _this = this;
        var layer = this.$layer.iframe({
          type: 2, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
          title: '补传维修工单',
          content: {
            content:upLoadWxOrder,
            parent:this,
            data:{}
          },
          shadeClose: false,//点击遮罩是否关闭
          area: ['460px','300px'],
          offset:  'auto',
          shade: true,//是否显示遮罩
        });
      },
      setPeople(){
        var _this = this;

        var layer = this.$layer.iframe({
          type: 2, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
          title: '维修人员设置',
          content: {
            content:setServicePeople,
            parent:this,
            data:{}
          },
          shadeClose: false,//点击遮罩是否关闭
          area: ['770px','360px'],
          offset:  'auto',
          shade: true,//是否显示遮罩
        });
      },
      exportTable(){
        console.log('导出');
      },
      showDetil(e){
        var _this = this;
        var idx = $(e.target).parents('tr').attr('data-index');
        var status = 0;
        var layer = this.$layer.iframe({
          type: 2, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
          title: '报修单',
          content: {
            content:repairDetail,
            parent:this,
            data:{
              idx:idx,
              status:status
            }
          },
          shadeClose: false,//点击遮罩是否关闭
          area: ['500px','700px'],
          offset:  'auto',
          shade: true,//是否显示遮罩
        });
      },
      cancel(e){
        var _this = this;
        var idx = $(e.target).parents('tr').attr('data-index');
        var html = `<div class="layer-confirm-text">确定撤销该工单？</div>`;
        var layer = this.$layer.confirm(html,{title:'撤销提示'},function (index) {
          var repairno = _this.homeTable[idx].repairno;
          var load = _this.$layer.loading();
          _this.$ajaxPost('repairmanagev2/delete_repair_record',{'repairno':repairno,timestamp:Date.parse(new Date())/1000})
            .then(res => {
              if(res.response == 'success'){
                _this.renderTable(_this.defaultParams);
                _this.$layer.closeAll();
            }
          }).catch(err => {console.log(err)});
        });
      },
      choosedFile(e){
        var event = e.target;
        var files = event.files;
        console.log(files[0].name);
        this.chooseFile = files[0].name;
      }
    }
  }
</script>

<style lang="scss">
  $borderColor:#3f9ffe;
  .weixiujilu{
    .main{
      position: absolute;
      top: 35px;
      left: 0;
      right: 0;
      bottom: 0;
      .bootstrap-table{
        margin: 10px;
      }
    }
  }
</style>
