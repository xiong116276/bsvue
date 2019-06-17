<template>
  <div id="peijianOrder">
    <form class="form-horizontal">
      <div class="form-item">
        <p class="item-title">申请信息</p>
        <div class="form-group">
          <label class="control-label">收货人</label>
          <div class="input"><input type="text" class="form-control" placeholder="请填写收货人(必填)" v-model="receiver"></div>
        </div>
        <div class="form-group">
          <label class="control-label">收货地址</label>
          <div class="input"><input type="text" class="form-control" placeholder="请填写收货地址(必填)" v-model="receiveAddress"></div>
        </div>
        <div class="form-group">
          <label class="control-label">配件及数量</label>
          <div class="input"><textarea style="resize: none" class="form-control" placeholder="请填写配件及数量(必填)" v-model="peijianNum"></textarea></div>
        </div>
        <div class="form-group">
          <label class="control-label">关联维修单号</label>
          <div class="input">
            <input type="text" class="form-control" placeholder="请填写关联维修单号(必填)" v-model="peijianOrderNum">
            <span class="btn-add mybtn" @click="query">查询</span>
          </div>
        </div>
      </div>
      <div class="form-item">
        <p class="item-title">车辆信息</p>
        <div class="form-group">
          <label class="control-label">客户自编号</label>
          <div class="input"><input type="text" class="form-control" readonly placeholder="自动填写客户自编号" v-model="inputKhNum"></div>
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
          <label class="control-label">车牌照号</label>
          <div class="input"><input type="text" class="form-control" readonly placeholder="自动填写车牌照号" v-model="inputCarNum"></div>
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
    name: "peijianOrder",
    props:{
      layerid: {type: String, default:""},
    },
    data(){
      return{
        receiver:'',
        receiveAddress:'',
        peijianNum:'',
        peijianOrderNum:'',
        inputKhNum:'',
        inputKhName:'',
        inputVIN:'',
        inputCarNum:'',
        inputCarType:'',
        inputRepairLocation:'',
      }
    },
    watch:{
      receiver(val){this.receiver = val;},
      receiveAddress(val){this.receiveAddress = val;},
      peijianNum(val){this.peijianNum = val;},
      peijianOrderNum(val){this.peijianOrderNum = val;},
      inputKhNum(val){this.inputKhNum = val;},
      inputKhName(val){this.inputKhName = val;},
      inputVIN(val){this.inputVIN = val;},
      inputCarNum(val){this.inputCarNum = val;},
      inputCarType(val){this.inputCarType = val;},
      inputRepairLocation(val){this.inputRepairLocation = val;},
    },
    mounted(){

    },
    methods:{
      query(){
        var _this = this;
        var val = this.peijianOrderNum;
        if(val == ''){
          this.$layer.msg('关联维修单号不能为空！');
        }else{
          console.log(val)
        }
      },
      confirm(){

      },
      cancel(){
        this.$layer.close(this.layerid);
      }
    }
  }
</script>

<style lang="scss">
  #peijianOrder{
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
