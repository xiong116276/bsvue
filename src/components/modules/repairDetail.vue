<template>
  <div id="repairDetail" class="reset_scrollbar_all">
    <form class="form-horizontal">
      <div class="form-item">
        <p class="item-title">基础信息</p>
        <div class="form-group">
          <label class="control-label">创建时间</label>
          <div class="input"><input type="text" class="form-control" readonly v-model="creatTime"></div>
        </div>
        <div class="form-group">
          <label class="control-label">维修编号</label>
          <div class="input"><input type="text" class="form-control" readonly v-model="repairNum"></div>
        </div>
        <div class="form-group">
          <label class="control-label">报修人</label>
          <div class="input"><input type="text" class="form-control" readonly v-model="repairPeople"></div>
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
        <p class="item-title">报修信息</p>
        <div class="form-group">
          <label class="control-label">报修内容</label>
          <div class="input"><textarea style="resize: none" class="form-control" readonly v-model="inputServerDetail"></textarea></div>
        </div>
        <div class="form-group">
          <label class="control-label">客户联系人</label>
          <div class="input"><input type="text" class="form-control" readonly v-model="inputContactPeople"></div>
        </div>
        <div class="form-group">
          <label class="control-label">联系电话</label>
          <div class="input"><input type="text" class="form-control" readonly v-model="inputContactNum"></div>
        </div>
        <div class="form-group">
          <label class="control-label">派工负责人</label>
          <div class="input"><input type="text" class="form-control" readonly v-model="inputServerPeople"></div>
        </div>
        <div class="form-group select-more">
          <label class="control-label">维修人</label>
          <div class="input">
            <input type="text" :title="weiXiuPeople" class="form-control select-chow" @click="toggleShowSelect" readonly v-model="weiXiuPeople" placeholder="请选择维修人">
            <div class="select-contaienr">
              <div class="select-content reset_scrollbar_all">
                <p @click.stop="addWxPeople" v-for="(wxItem,wxIdx) in weiXiuList" :key="wxIdx" class="select-item"><label><input type="checkbox"><span class="text">{{wxItem}}</span></label></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-item">
        <p class="item-title">处理信息</p>
        <div class="form-group">
          <label class="control-label">处理情况</label>
          <div class="input"><textarea style="resize: none" class="form-control" v-model="processingSituation" placeholder="请填写处理详情(必填)"></textarea></div>
        </div>
        <div class="form-group type-column">
          <div class="pjList">
            <div class="pj-item" @click="showDiaoHuo"><label class="control-label">配件调货1</label><span class="pj-num">PJ190613140659</span></div>
            <div class="pj-item" @click="showDiaoHuo"><label class="control-label">配件调货2</label><span class="pj-num">PJ190613140659</span></div>
          </div>
          <div @click="addDiaoHuo" class="btn-addPj mybtn">添加配件调货</div>
        </div>
      </div>

      <div class="form-item">
        <p class="item-title">审核信息</p>
        <div class="form-group">
          <label class="control-label">审核人</label>
          <div class="input"><input type="text" class="form-control" v-model="reviewPeople" readonly></div>
        </div>
        <div class="form-group">
          <label class="control-label">审核结果</label>
          <div class="input">
            <select class="form-control" v-model="reviewResults">
              <option value="0">请选择审核结果</option>
              <option value="1">通过</option>
              <option value="2">不通过</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">审核备注</label>
          <div class="input"><textarea style="resize: none" class="form-control" v-model="reviewRemark" placeholder="请填写审核备注"></textarea></div>
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
    name: "repairDetail",
    components:{diaoHuoModal},
    props:{
      layerid: {type: String, default:""},
      status: {},
      idx: {},
    },
    data(){
      return{
        creatTime:'2019-06-13 10:48:35',
        repairNum:'WS190613104913',
        repairPeople:'刘建强',
        inputKhNum:'SXC-0311',
        inputKhName:'京申大众',
        inputVIN:'LWXCD4E4XJD600281',
        inputCarNum:'沪A09126D',
        inputCarType:'SXC6940GBEV4',
        inputRepairLocation:'上海万象汽车制造有限公司',
        inputServerDetail:'test',
        inputContactPeople:'唐鸿超',
        inputContactNum:'17316596981',
        inputServerPeople:'朱成华',
        weiXiuPeople:'',
        weiXiuList:['刘建强','王雅兴','曲琛','姚浩芦','李星泽','谷延军','余京','高天雷','冯金钢'],
        processingSituation:'',
        reviewPeople:'',
        reviewResults:1,
        reviewRemark:''
      }
    },
    mounted(){
      console.log(this.idx);
      console.log(this.status);
    },
    methods:{
      toggleShowSelect(event){
        var e = event.target;
        $(e).next('.select-contaienr').slideToggle();
      },
      addWxPeople(event){
        var arr = $('.select-content').find('input[type="checkbox"]:checked');
        var arr2 = [];
        $(arr).each(function (k,v) {
          var text = $(v).next('.text').text();
          if(arr2.indexOf(text) == -1){
            arr2.push(text)
          }
        });

        this.weiXiuPeople = arr2.join('、');
      },
      diaoHuoModal(status){
        var _this = this;
        var layer = this.$layer.iframe({
          type: 2, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
          title: '调货申请',
          content: {
            content:diaoHuoModal,
            parent:this,
            data:{
              idx:_this.idx,
              status:status
            }
          },
          shadeClose: false,//点击遮罩是否关闭
          area: ['500px','750px'],
          offset:  'auto',
          shade: true,//是否显示遮罩
        });
      },
      addDiaoHuo(){
        this.diaoHuoModal(0);
      },
      showDiaoHuo(){
        this.diaoHuoModal(1);
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
  #repairDetail{
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
