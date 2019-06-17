<template>
  <div class="car-register-container">
    <form class="form-horizontal">
      <div v-for="(inputItem,inputIdx) in list" :key="inputIdx">
        <div v-if="inputItem.type == 'input'" class="form-group">
          <label class="control-label">{{inputItem.name}}</label>
          <div class="input"><input :name="inputItem.name" type="text" class="form-control" :placeholder="inputItem.tip" v-model="list[inputIdx].val"></div>
        </div>
        <div v-else class="form-group">
          <label class="control-label">{{inputItem.name}}</label>
          <div class="input">
            <select :name="inputItem.name" class="form-control" v-model="list[inputIdx].val" @change="selectKh">
              <option v-for="(selectItem,selectIdx) in inputItem.data" :key="selectIdx" :value="selectItem">{{selectItem}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">{{inputLine}}</label>
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
    name: "car-register",
    props: {
      layerid: {type: String, default: ""}
    },
    data(){
      return {
        inputLine:'',
        inputVIN:'',
        inputOrder:'',
        inputLicense:'',
        inputKhNum:'',
        inputKhName:'浦东公交1',
        inputCarType:'',
        inputStorageLocation:'',
        list:[],
      }
    },
    mounted(){
      this.list = [
        {type:'input',val:this.inputLine,name:'生产流水线',tip:'必填'},
        {type:'input',val:this.inputVIN,name:'VIN码',tip:'必填'},
        {type:'input',val:this.inputOrder,name:'订单号',tip:'必填'},
        {type:'input',val:this.inputLicense,name:'车辆牌照',tip:''},
        {type:'input',val:this.inputKhNum,name:'客户自编号',tip:'必填'},
        {type:'select',val:this.inputKhName,name:'客户名称',data:['浦东公交0','浦东公交1','浦东公交2','浦东公交3','浦东公交4','浦东公交5']},
        {type:'input',val:this.inputCarType,name:'车型',tip:''},
        {type:'input',val:this.inputStorageLocation,name:'存放地点',tip:''},
      ];
      this.list[5].data.push('新增客户');
    },
    watch:{

    },
    methods:{
      selectKh(e){
        var _this = this;
        var val = $(e.target).val();
        if(val == '新增客户'){
          _this.cancel();
          _this.$router.push('/pages/system/yunyingdanwei');
        }
      },
      confirm(){
        console.log(this.list);
      },
      cancel(){
        this.$layer.close(this.layerid);
      }
    }
  }
</script>

<style lang="scss">
  .car-register-container{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;

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
