<template>
  <div class="myContainer yunxingjiankong">
    <div class="left-select">
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
        <div class="select-group"><p class="select-name">累计行驶里程(起)</p><input v-model="distanceStart" name="distanceStart" class="input" type="text"></div>
        <div class="select-group"><p class="select-name">累计行驶里程(止)</p><input v-model="distanceEnd" name="distanceEnd" class="input" type="text"></div>
      </div>
      <div class="input-list">
        <div class="select-group"><p class="select-name">行驶证日期(起)</p>
          <date-picker @dp-show="doSomethingOnShow" @dp-hide="doSomethingOnHide" autocomplete="off" class="input" id="repairStart" v-model="drivingLicenseStart" :config="config"></date-picker>
        </div>
        <div class="select-group"><p class="select-name">行驶证日期(止)</p>
          <date-picker @dp-show="doSomethingOnShow" @dp-hide="doSomethingOnHide" autocomplete="off" class="input" id="repairEnd" v-model="drivingLicenseEnd" :config="config"></date-picker>
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
            <span id="btn_export" class="btn btn-sm" @click="applicationSetting">补贴申请设置</span>
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
  import datePicker from 'vue-bootstrap-datetimepicker/dist/vue-bootstrap-datetimepicker';
  export default {
    name: "yunxingjiankong",
    components:{breadnav,datePicker},
    data(){
      return {
        zIndex:'',
        selectType:['条件筛选','是否补贴','客户名称','整车型号','订单号','客户自编号','VIN码','车辆牌照号'],
        selectList:[],
        selected:[],
        breadCrumb:['车辆管理','运行监控'],
        homeTable:[],
        tableColumns:[],
        fixedNumber:6,
        distanceStart:'',
        distanceEnd:'',
        config:{
          format: 'YYYY-MM-DD',
          useCurrent: false,
          locale: 'zh-cn',
        },
        defaultParams : {
          "subsidy": "",
          "online":"",
          "client":"",
          "smileage":"",
          "emileage":"",
          "index":"",
          "count":"",
          "timestamp":Date.parse(new Date())/1000
        },
        drivingLicenseStart:'',
        drivingLicenseEnd:'',
      }
    },
    mounted(){
      var _this = this;
      this.renderTable(this.defaultParams);
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
      setHeader(tHeader){//column 设置
        var _this = this;
        var arr1 = [];
        $.each(tHeader,function (k,v) {
          var w = 100;
          var field = '';
          switch (k) {
            case 0: w = 120;break;
            case 2: w = 180;break;
            case 5: w = 130;break;
            case 12: w = 180;break;
            case 13: w = 180;break;
            case 14: w = 110;break;
            case 15: w = 110;break;
            case 16: w = 110;break;
            case 17: w = 190;break;
            case 18: w = 160;break;
            case 23: w = 110;break;
            case 24: w = 140;break;
            case 25: w = 130;break;
          }
          if(k == 4){
            field = 'client'
          }else{
            field = 'col'+k;
          }
          arr1.push({
            title: v,
            field: field,
            valign:'middle',
            width: w
          });
        });
        return arr1;
      },
      getData(params){//ajax 获取到数据
        var _this = this;
        return new Promise(function (resolve, reject) {
          var load = _this.$layer.loading();
          _this.$ajaxPost('realdatav2/get_monitor_data',params)
            .then(res => {
              var data = res.data.data;
              var tHeader = data[0];
              var tBody =data.slice(1);
              var arr2 = [];
              $.each(tBody,function (k,v) {
                var obj = {};
                $.each(v,function (m,n) {
                  var field = '';
                  if(m == 4){
                    field = 'client';
                  }else{
                    field = 'col'+m;
                  }

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

        switch (name) {
          case '是否补贴' : code = 'subsidy';break;
          case '在线状态' : code = 'online';break;
          case '客户名称' : code = 'client';break;
        }

        var code = this.$getWXCode(name);
        var params = this.getParams(this.selected);

        params[code] = '';

        this.getData(Object.assign(this.defaultParams, params)).then(function (data) {
          var arr2 = data.arr2;

          switch (code) {
            case 'subsidy':list = ['未补贴','已补贴'];break;
            case 'online':list = ['离线','运行','充电'];break;
            case 'client':
              $.each(arr2,function (k,v) {
                if(list.indexOf(v[code]) == -1){
                  list.push(v[code])
                }
              });break;
          }

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

        if(params.hasOwnProperty('subsidy')){
          params.subsidy = _this.$statusTranslate(params.subsidy);
        }
        if(params.hasOwnProperty('online')){
          params.online = _this.$statusTranslate(params.online);
        }
        return params;
      },
      btnReset(){
        this.selectType = ['条件筛选','是否补贴','客户名称','整车型号','订单号','客户自编号','VIN码','车辆牌照号'];
        this.defaultParams ={
          "subsidy": "",
          "online":"",
          "client":"",
          "smileage":"",
          "emileage":"",
          "index":"",
          "count":"",
          "timestamp":Date.parse(new Date())/1000
        };
        this.selectList = [];
        this.selected = [];
        this.distanceStart = '';
        this.distanceEnd = '';
        this.drivingLicenseStart = '';
        this.drivingLicenseEnd = '';
      },
      btnConfirm(){
        var _this = this;
        var params = this.getParams(this.selected);
        params['smileage']=this.distanceStart;
        params['emileage']=this.distanceEnd;

        this.renderTable(Object.assign(this.defaultParams,params));
      },
      drawTable(data){
        var _this = this;
        $('#table').bootstrapTable('destroy').bootstrapTable({
          fixedColumns: true,
          fixedFrom:'left',
          fixedNumber: _this.fixedNumber ,
          columns:_this.tableColumns,
          data:data,
          striped: true, //是否显示行间隔色
          // search:true,
          // toolbar:'#toolbar',
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
      doSomethingOnShow(){
        var top = $('.left-select').scrollTop();
        $('.left-select').css({'overflow':'unset','top':'-'+top+'px'});
      },
      doSomethingOnHide(){
        $('.left-select').css({'overflow':'auto','top':0});
      },
      applicationSetting(){
        var _this = this;
        var params = {timestamp:Date.parse(new Date())/ 1000};
        this.$ajaxPost('/realdatav2/get_subsidy',params)
          .then(res => {
            if(res.response == 'success' ){
              var data = res.data.data.subsidy;
              console.log(data);
              var html = `
                <div class="application-setting">
                  <span class="text">请输入开始提醒的累计行驶里程数</span>
                  <input class="input" type="text" name="setNum" value="${data}">
                  <span class="text">公里</span>
                </div>
              `;
              var layer = this.$layer.open({
                type: 0, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
                title: '',
                content: html,
                shadeClose: false,//点击遮罩是否关闭
                area: ['460px','200px'],
                offset:  'auto',
                btn:'确定',
                shade: true,//是否显示遮罩
                yes:function () {
                  var val = $('input[name="setNum"]').val();
                  if(val !== ''){
                    var params = {"subsidy": val,"timestamp":Date.parse(new Date())/ 1000};
                    _this.$ajaxPost('/realdatav2/set_subsidy',params)
                      .then(res => {
                        console.log(res);
                        if(res.response == 'success'){
                          _this.$layer.close(layer);
                          _this.$layer.msg('补贴提醒设置成功！',{time:2});
                        }else{
                          _this.$layer.msg(res.message);
                        }
                      }).catch(err => {console.log(err)});
                  }else{
                    _this.$layer.msg('补贴提醒设置不能为空！',{time:2});
                  }

                },
                cancel:function () {
                  _this.$layer.close(layer);
                }
              });
            }else{
              _this.$layer.msg(res.message);
            }

          }).catch(err => {console.log(err)});
      }
    }
  }
</script>

<style lang="scss">
  $borderColor:#3f9ffe;
  .yunxingjiankong{
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

  .application-setting{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .input{
      width: 80px;
      padding: 0 10px;
      margin: 0 10px;
      text-align: center;
    }
  }
</style>
