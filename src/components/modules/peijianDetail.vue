<template>
  <div id="peijianDetail" class="reset_scrollbar_all">
    <form class="form-horizontal">
      <div class="form-item">
        <p class="item-title">基础信息</p>
        <div class="form-group">
          <label class="control-label">创建时间</label>
          <div class="input"><input type="text" class="form-control" readonly v-model="creatTime"></div>
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
        <p class="item-title">申请信息</p>
        <div class="form-group">
          <label class="control-label">收货人</label>
          <div class="input"><input type="text" class="form-control" readonly v-model="receiver"></div>
        </div>
        <div class="form-group">
          <label class="control-label">收货地址</label>
          <div class="input"><input type="text" class="form-control" readonly v-model="receiveAddress"></div>
        </div>
        <div class="form-group">
          <label class="control-label">申请配件及数量</label>
          <div class="input"><textarea class="form-control" readonly v-model="pjNameNum"></textarea></div>
        </div>
        <div class="form-group">
          <label class="control-label">关联维修编号</label>
          <div class="input"><input type="text" class="form-control" readonly v-model="weiXiuNum"></div>
        </div>
      </div>

      <div class="form-item">
        <p class="item-title">车辆信息</p>
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
      </div>

      <div class="form-item">
        <p class="item-title">处理信息</p>
        <div class="form-group">
          <label class="control-label">实际配件及数量</label>
          <div class="input"><textarea class="form-control" readonly v-model="realPJNameNum"></textarea></div>
        </div>
        <div class="form-group">
          <label class="control-label">物流单号</label>
          <div class="input"><input type="text" class="form-control" readonly v-model="shipmentNum"></div>
        </div>
        <div class="form-group">
          <label class="control-label">备注</label>
          <div class="input"><textarea type="text" class="form-control" readonly v-model="peijianRemark"></textarea></div>
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
  import diaoHuoModal from '../modules/diaoHuoModal';
  export default {
    name: "peijianDetail",
    components:{diaoHuoModal},
    props:{
      layerid: {type: String, default:""},
      status: {},
      idx: {},
    },
    data(){
      return{
        creatTime:'2019-06-13 10:48:35',
        pjNum:'WS190613104913',
        applyPeople:'刘建强',

        receiver:'太阳岛小林',
        receiveAddress:'徐泾东',
        pjNameNum:'制动总泵模块3个',
        weiXiuNum:'WS180605120219',

        inputKhNum:'SXC-0311',
        inputKhName:'京申大众',
        inputVIN:'LWXCD4E4XJD600281',
        inputCarNum:'沪A09126D',
        inputCarType:'SXC6940GBEV4',
        inputRepairLocation:'上海万象汽车制造有限公司',

        realPJNameNum:'制动总泵模块3件瑞立备件',
        shipmentNum:'自提',
        peijianRemark:'备注',
      }
    },
    mounted(){
      console.log(this.idx);
      console.log(this.status);
    },
    methods:{
      confirm(){

      },
      cancel(){
        this.$layer.close(this.layerid);
      }
    }
  }
</script>

<style lang="scss">
  #peijianDetail{
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

    .pjList{
      width: 100%;
      .pj-item{
        cursor: pointer;
        background-color: #eee;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 10px;
      }
    }
  }
</style>
