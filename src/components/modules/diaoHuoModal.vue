<template>
  <div id="diaoHuoModal" class="reset_scrollbar_all">
      <form class="form-horizontal">
        <div class="form-item" v-if="status == '1'">
          <div class="form-group">
            <label class="control-label">时间</label>
            <div class="input"><input type="text" class="form-control" readonly v-model="applyTime"></div>
          </div>
          <div class="form-group">
            <label class="control-label">配件编号</label>
            <div class="input"><input type="text" class="form-control" readonly v-model="pjNum"></div>
          </div>
          <div class="form-group">
            <label class="control-label">申请人</label>
            <div class="input"><input type="text" class="form-control" readonly v-model="applyPeople"></div>
          </div>
        </div>
        <div class="form-item">
          <div class="form-group">
            <label class="control-label">收货人</label>
            <div class="input"><input type="text" class="form-control toggle-readonly" v-model="receiver" placeholder="请填写收货人"></div>
          </div>
          <div class="form-group">
            <label class="control-label">收获地址</label>
            <div class="input"><input type="text" class="form-control toggle-readonly" v-model="receiveAddress" placeholder="请填写收货地址"></div>
          </div>
          <div class="form-group">
            <label class="control-label">维修编号</label>
            <div class="input"><input type="text" class="form-control" readonly v-model="weiXiuNum"></div>
          </div>
          <div class="form-group">
            <label class="control-label">客户自编号</label>
            <div class="input"><input type="text" class="form-control" readonly v-model="inputKhNum"></div>
          </div>
          <div class="form-group">
            <label class="control-label">客户名称</label>
            <div class="input"><input type="text" class="form-control" readonly v-model="inputKhName"></div>
          </div>
          <div class="form-group">
            <label class="control-label">VIN码</label>
            <div class="input"><input type="text" class="form-control" readonly v-model="inputVIN"></div>
          </div>
          <div class="form-group">
            <label class="control-label">车牌照号</label>
            <div class="input"><input type="text" class="form-control" readonly v-model="inputCarNum"></div>
          </div>
          <div class="form-group">
            <label class="control-label">车型</label>
            <div class="input"><input type="text" class="form-control" readonly v-model="inputCarType"></div>
          </div>
          <div class="form-group">
            <label class="control-label">维修地点</label>
            <div class="input"><input type="text" class="form-control" readonly v-model="inputRepairLocation"></div>
          </div>
          <div class="form-group">
            <label class="control-label">配件名称及数量</label>
            <div class="input"><input type="text" class="form-control toggle-readonly" v-model="pjNameNum" placeholder="请填写配件名称及数量"></div>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label"></label>
          <div class="input btns">
            <span class="btn" @click="confirm">提交</span>
          </div>
        </div>
      </form>
    </div>
</template>

<script>
  export default {
    name: "diaoHuoModal",
    props:{
      layerid: {type: String, default:""},
      status: {},
      idx: {},
    },
    data(){
      return{
        applyTime:'2019-06-13 14:06:22',
        pjNum:'PJ190613140659',
        applyPeople:'高天雷',
        receiver:'',
        receiveAddress:'',
        weiXiuNum:'WS190613104913',
        inputKhNum:'SXC-0311',
        inputKhName:'京申大众',
        inputVIN:'LWXCD4E4XJD600281',
        inputCarNum:'沪A09126D',
        inputCarType:'SXC6940GBEV4',
        inputRepairLocation:'上海万象汽车制造有限公司',
        pjNameNum:''
      }
    },
    mounted(){
      var _this = this;
      console.log(this.status);
      setTimeout(function () {
        _this.toggleReadonly();
      },200)
    },
    methods:{
      toggleReadonly(){
        var arr =$('.toggle-readonly');
        if(this.status == 1){
          $.each(arr,function (k,v) {
            $(v).prop('readonly',true);
          });
        }else{
          $.each(arr,function (k,v) {
            $(v).prop('readonly',false);
          });
        }

      },
      confirm(){

      }
    }
  }
</script>

<style lang="scss">
  #diaoHuoModal{
    width: 100%;
    padding: 10px;
    overflow: auto;
    .item-title{
      border-bottom: 1px solid #ddd;
      margin: 0;
      height: 28px;
      line-height: 28px;
    }
    .btns{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      .btn{
        border: solid 1px #3e9ffe;
        color: #3e9ffe;
        border-radius: 4px;
        width: 90px;
        text-align: center;
        padding: 0;
        height: 30px;
        line-height: 30px;
        /*margin: 0 20px 0 0;*/

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
