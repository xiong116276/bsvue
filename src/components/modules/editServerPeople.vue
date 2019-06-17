<template>
  <div id="editServerPeople">
    <form class="form-horizontal">
      <div class="form-group">
        <label class="control-label">客户名称:</label><div class="input input-sm text">{{inputKhName}}</div>
      </div>
      <div class="form-group">
        <label class="control-label">默认联系人:</label>
        <div class="input input-sm"><input type="text" class="form-control" placeholder="请请填写默认联系人" v-model="inputContactPeople"></div>
      </div>
      <div class="form-group">
        <label class="control-label">联系电话:</label>
        <div class="input input-sm"><input type="text" class="form-control" placeholder="请请填写联系电话" v-model="inputContactNum"></div>
      </div>
      <div class="form-group">
        <label class="control-label">所属区域:</label>
        <div id="target" class="input input-sm selects" data-toggle="distpicker">
          <select :data-province="province" class="form-control" v-model="province"></select>
          <select :data-city="city" class="form-control" v-model="city"></select>
          <select :data-district="area" class="form-control" v-model="area"></select>
        </div>
      </div>
      <div class="form-group" data-type = 'principal'>
        <label class="control-label">派工负责人:</label>
        <div class="input type-column">
          <span class="mybtn" @click="addPeople">添加</span>
          <textarea readonly style="resize: none;width: 100%;" class="form-control" v-model="$store.state.inputPrincipal" placeholder="请添加派工负责人"></textarea>
        </div>
      </div>
      <div class="form-group" data-type = 'server'>
        <label class="control-label">维修人员:</label>
        <div class="input type-column">
          <span class="mybtn" @click="addPeople">添加</span>
          <textarea readonly style="resize: none;width: 100%;" class="form-control" v-model="$store.state.inputServerPeople" placeholder="请添加维修人员"></textarea>
        </div>
      </div>
      <div class="form-group" data-type = 'review'>
        <label class="control-label">审核人员:</label>
        <div class="input type-column">
          <span class="mybtn" @click="addPeople">添加</span>
          <textarea readonly style="resize: none;width: 100%;" class="form-control" v-model="$store.state.inputReviewPeople" placeholder="请添加审核人员"></textarea>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label"></label>
        <div class="input mybtns2">
          <span class="btn" @click="confirm">提交</span>
          <span class="btn" @click="cancel">取消</span>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
  import selectPeople from '../modules/selectPeople'
  export default {
    name: "editServerPeople",
    components:{selectPeople},
    props:{
      layerid: {type: String, default:""},
      row:{}
    },
    data(){
      return{
        inputKhName:'',
        inputContactPeople:'',
        inputContactNum:'',
        inputPrincipal:'',
        inputServerPeople:'',
        inputReviewPeople:'',
        province:'',
        city:'',
        area:''
      }
    },
    mounted(){
      // console.log(this.row);
      var data = this.row;
      this.inputKhName = data.client;
      this.inputContactPeople = data.contactman;
      this.inputContactNum = data.contactphone;
      var address = data.location.split('-');
      if(address.length == 2){
        this.province = address[0];
        this.city = address[0].replace(/市/ig,'城区');
        this.area = address[1];
      }else if(address.length == 3){
        this.province = address[0];
        this.city = address[1];
        this.area = address[2];
      }

      this.$store.state.inputPrincipal = data.chargeman;
      this.$store.state.inputServerPeople = '张德飞、黄黎平';
      this.$store.state.inputReviewPeople = '张德飞、黄黎平';

      this.setCity();
    },
    methods:{
      setCity(province,city){
        setTimeout(function () {
          $('#target').distpicker();
        },200);
      },
      addPeople(event){
        var e = event.target;
        var _this = this;
        var type = $(e).parents('.form-group').attr('data-type');
        var layer = this.$layer.iframe({
          type: 2, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
          title: '选择人员',
          content: {
            content:selectPeople,
            parent:this,
            data:{
              addType:type
            }
          },
          shadeClose: false,//点击遮罩是否关闭
          area: ['640px','515px'],
          offset:  'auto',
          shade: true,//是否显示遮罩
        });
      },

      confirm(){
        console.log(this.province,this.city,this.area)
      },
      cancel(){
        this.$layer.close(this.layerid);
      }
    }
  }
</script>

<style lang="scss">
#editServerPeople{
  width: 100%;
  .form-horizontal{
    .form-group{
      justify-content: flex-start;
    }
    .selects{
      justify-content: space-between;
      select{
        width: 32%;
      }
    }
  }
  .form-control[readonly]{
    background-color: #fff;
  }
  .mybtn{
    margin-bottom: 10px;
  }
  .mybtns2{
    .btn{
      margin: 0 50px 0 0;
    }
  }
}
</style>
