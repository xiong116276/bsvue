<template>
  <div id="serviceOrder">
    <form class="form-horizontal">
      <div class="form-item">
        <p class="item-title">车辆信息</p>
        <div class="form-group">
          <label class="control-label">客户自编号</label>
          <div class="input">
            <input type="text" class="form-control" placeholder="请填写客户自编号(必填)" v-model="inputKhNum">
            <span class="btn-add mybtn" @click="query">查询</span>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">客户名称</label>
          <div class="input"><input type="text" class="form-control" readonly placeholder="自动填写客户名称" v-model="inputKhName"></div>
        </div>
        <div class="form-group">
          <label class="control-label">VIN码</label>
          <div class="input"><input type="text" class="form-control" readonly placeholder="自动填写VIN码" v-model="inputVIN"></div>
        </div>
        <div class="form-group">
          <label class="control-label">车辆牌照</label>
          <div class="input"><input type="text" class="form-control" readonly placeholder="自动填写车辆牌照" v-model="inputCarNum"></div>
        </div>
        <div class="form-group">
          <label class="control-label">车型</label>
          <div class="input"><input type="text" class="form-control" readonly placeholder="自动填写车型" v-model="inputCarType"></div>
        </div>
        <div class="form-group">
          <label class="control-label">维修地点</label>
          <div class="input"><input type="text" class="form-control" readonly placeholder="自动填写维修地点" v-model="inputRepairLocation"></div>
        </div>
      </div>
      <div class="form-item">
        <p class="item-title">报修信息</p>
        <div class="form-group">
          <label class="control-label">报修内容</label>
          <div class="input"><textarea style="resize: none" class="form-control" v-model="inputServerDetail" placeholder="请填写报修详情(必填)"></textarea></div>
        </div>
        <div class="form-group">
          <label class="control-label">客户联系人</label>
          <div class="input"><input type="text" class="form-control" placeholder="请请填写客户联系人(必填)" v-model="inputContactPeople"></div>
        </div>
        <div class="form-group">
          <label class="control-label">联系电话</label>
          <div class="input"><input type="text" class="form-control" placeholder="请填写联系电话(必填)" v-model="inputContactNum"></div>
        </div>
        <div class="form-group">
          <label class="control-label">派工负责人</label>
          <div class="input"><input type="text" class="form-control" readonly placeholder="自动填写派工负责人" v-model="inputServerPeople"></div>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label"></label>
        <div class="input btns">
          <span class="btn" @click="confirm">提交</span>
          <span class="btn" @click="cancel">取消</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: "serviveOrder",
    props:{
      layerid: {type: String, default:""},
      refreshTable:{type:Function,default:function () {}}
    },
    data(){
      return{
        inputKhNum:'',
        inputKhName:'',
        inputVIN:'',
        inputCarNum:'',
        inputCarType:'',
        inputRepairLocation:'',
        inputServerDetail:'',
        inputContactPeople:'',
        inputContactNum:'',
        inputServerPeople:'',
      }
    },
    watch:{
      inputKhNum(val){this.inputKhNum = val;},
      inputKhName(val){this.inputKhName = val;},
      inputVIN(val){this.inputVIN = val;},
      inputCarNum(val){this.inputCarNum = val;},
      inputCarType(val){this.inputCarType = val;},
      inputRepairLocation(val){this.inputRepairLocation = val;},
      inputServerDetail(val){this.inputServerDetail = val;},
      inputContactPeople(val){this.inputContactPeople = val;},
      inputContactNum(val){this.inputContactNum = val;},
      inputServerPeople(val){this.inputServerPeople = val;},
    },
    mounted(){

    },
    methods:{
      query(){
        var _this = this;
        var val = this.inputKhNum;
        if(val == ''){
          this.$layer.msg('客户自编号不能为空！');
        }else{
          var load = this.$layer.loading();
          this.$ajaxPost('repairmanagev2/get_car_info',{carid:_this.inputKhNum,timestamp:Date.parse(new Date()) / 1000})
            .then(function (res) {
              if (res.response == 'success') {
                var data = res.data.data[0];

                _this.inputKhName = data.CarId;
                _this.inputCarType = data.CarModel;
                _this.inputCarNum = data.License;
                _this.inputRepairLocation = data.Placetmp;
                _this.inputServerPeople = data.Principal;
                _this.inputVIN = data.VinCode;

                _this.$layer.close(load);
              }
            }).catch(err => {console.log(err)});
        }
      },
      confirm(){
        var _this = this;
        var params = {timestamp:Date.parse(new Date()) / 1000};

        params['status'] = '0';
        params['userid'] = '1';
        params['client'] = this.inputKhName;
        params['carid'] = this.inputKhNum;
        params['reportman'] = '谷延军';
        params['chargeman'] = this.inputServerPeople;
        params['repairplace'] = this.inputRepairLocation;
        params['repaircont'] = this.inputServerDetail;
        params['contactman'] = this.inputContactPeople;
        params['contactphone'] = this.inputContactNum;

        for (var k in params) {
          if(params[k] == ''){
            this.$layer.msg('所填项不能为空!');
            return;
          }
        }

        this.$layer.loading();
        this.$ajaxPost('repairmanagev2/add_repair_record',params)
          .then(function (res) {
            if (res.response == 'success') {
              console.log(res);

              _this.refreshTable();
            }
          }).catch(err => {console.log(err)});
      },
      cancel(){
        this.$layer.close(this.layerid);
      }
    }
  }
</script>

<style lang="scss">
#serviceOrder{
  width: 100%;
  padding: 10px;

  .item-title{
    border-bottom: 1px solid #ddd;
    margin: 0;
    height: 28px;
    line-height: 28px;
  }
  .btns{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .btn{
      border: solid 1px #3e9ffe;
      color: #3e9ffe;
      border-radius: 4px;
      width: 90px;
      text-align: center;
      padding: 0;
      height: 30px;
      line-height: 30px;

      &:hover{
        background-color: #3e9ffe;
        color: #fff;
      }
    }

    .btn-add-people{
      margin-top: 7px;
      cursor: pointer;
      float: right;
      color: #0066ff;
      text-decoration: underline;
    }
  }
}
</style>
