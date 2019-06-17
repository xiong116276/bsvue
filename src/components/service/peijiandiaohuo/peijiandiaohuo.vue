<template>
  <div class="myContainer peijiandiaohuo">
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
        <div class="select-group"><p class="select-name">申请时间(起)</p>
          <date-picker @dp-show="doSomethingOnShow" @dp-hide="doSomethingOnHide" autocomplete="off" class="input" id="repairStart" v-model="applystartt" :config="config"></date-picker>
        </div>
        <div class="select-group"><p class="select-name">申请时间(止)</p>
          <date-picker @dp-show="doSomethingOnShow" @dp-hide="doSomethingOnHide" autocomplete="off" class="input" id="repairEnd" v-model="applyendt" :config="config"></date-picker>
        </div>
      </div>
      <div class="input-list">
        <div class="select-group"><p class="select-name">发货时间(起)</p>
          <date-picker @dp-show="doSomethingOnShow" @dp-hide="doSomethingOnHide" autocomplete="off" class="input" id="completeStart" v-model="sendstartt" :config="config"></date-picker>
        </div>
        <div class="select-group"><p class="select-name">发货时间(止)</p>
          <date-picker @dp-show="doSomethingOnShow" @dp-hide="doSomethingOnHide" autocomplete="off" class="input" id="completeEnd" v-model="sendendt" :config="config"></date-picker>
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
            <span id="btn_add_order" class="btn btn-sm" @click="addOrder">新增配件单</span>
            <span id="btn_set_people" class="btn btn-sm" @click="setPeople">配件调货人员设置</span>
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
  import peijianOrder from '../../modules/peijianOrder';
  import setPJPeople from '../../modules/setPJPeople';
  import peijianDetail from '../../modules/peijianDetail';
  import datePicker from 'vue-bootstrap-datetimepicker/dist/vue-bootstrap-datetimepicker';
  export default {
    name: "peijiandiaohuo",
    components:{breadnav,datePicker,peijianOrder,setPJPeople,peijianDetail},
    data(){
      return {
        zIndex:'',
        selectType:['条件筛选','配件状态','客户名称','配件编号','维修自编号','申请人','配件人'],
        selectList:[],
        selected:[],
        breadCrumb:['维修管理','配件调货'],
        homeTable:[],
        tableColumns:[],
        applystartt:'',
        applyendt:'',
        sendstartt:'',
        sendendt:'',
        config:{
          format: 'YYYY-MM-DD',
          useCurrent: false,
          locale: 'zh-cn',
        },
        defaultParams : {
          "status": "","client": "","partsno":"","repairno":"","applyman":"","deliveryrman":"",
          "index":"",
          "count":"",
          "applystartt":"","applyendt":"","sendstartt":"","sendendt":"",
          "timestamp":Date.parse(new Date())/1000
        },
      }
    },
    mounted(){
      var _this = this;
      this.renderTable(this.defaultParams);

      $('.peijiandiaohuo').on('click','.btn-cancel',function () {_this.cancel(event)});
      $('.peijiandiaohuo').on('click','.btn-detail',function () {_this.showDetil(event)});
    },
    methods:{
      doSomethingOnShow(){
        var top = $('.left-select').scrollTop();
        $('.left-select').css({'overflow':'unset','top':'-'+top+'px'});
      },
      doSomethingOnHide(){
        $('.left-select').css({'overflow':'auto','top':0});
      },
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
          case 0 :field = 'partsno';break;
          case 1 :field = 'client';break;
          case 2 :field = 'repairno';break;
          case 3 :field = 'applyman';break;
          case 4 :field = 'deliveryrman';break;
          case 5 :field = 'applytime';break;
          case 6 :field = 'shiptime';break;
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
          _this.$ajaxPost('partsmanagev2/get_parts_record',params)
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

          console.log(_this.selected);
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
        this.selectType = ['条件筛选','配件状态','客户名称','配件编号','维修自编号','申请人','配件人'];
        this.defaultParams ={
          "status": "","client": "","partsno":"","repairno":"","applyman":"","deliveryrman":"",
          "index":"",
          "count":"",
          "applystartt":"","applyendt":"","sendstartt":"","sendendt":"",
          "timestamp":Date.parse(new Date())/1000
        };
        this.selectList = [];
        this.selected = [];
        this.applystartt = '';
        this.applyendt = '';
        this.sendstartt = '';
        this.sendendt = '';
      },
      btnConfirm(){
        var _this = this;
        var params = this.getParams(this.selected);
        params['applystartt']=this.applystartt;
        params['applyendt']=this.applyendt;
        params['sendstartt']=this.sendstartt;
        params['sendendt']=this.sendendt;

        this.renderTable(Object.assign(this.defaultParams,params));
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
        });
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
          title: '配件调货单',
          content: {
            content: peijianOrder,
            parent: this,
            data: {}
          },
          shadeClose: false,//点击遮罩是否关闭
          area: ['460px','700px'],
          offset:  'auto',
          shade: true,//是否显示遮罩
        });
      },
      setPeople(){
        var _this = this;

        var layer = this.$layer.iframe({
          type: 2, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
          title: '配件调货人员设置',
          content: {
            content:setPJPeople,
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
        console.log('导出')
      },
      showDetil(e){
        var _this = this;
        var idx = $(e.target).parents('tr').attr('data-index');
        var status = 0;
        var layer = this.$layer.iframe({
          type: 2, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
          title: '报修单',
          content: {
            content:peijianDetail,
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
          var partsno = _this.homeTable[idx].partsno;
          var load = _this.$layer.loading();
          _this.$ajaxPost('partsmanagev2/cancel_parts_record',{'partsno':partsno,timestamp:Date.parse(new Date())/1000})
            .then(res => {
              if(res.response == 'success'){
                _this.renderTable(_this.defaultParams);
                _this.$layer.closeAll();
              }
            }).catch(err => {console.log(err)});
        });
      }
    }
  }
</script>

<style lang="scss">
  $borderColor:#3f9ffe;
  .peijiandiaohuo{
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
