<template>
  <div class="carsdetail">
    <breadnav :breadCrumb="breadCrumb"></breadnav>
    <div class="detail-container">
      <div class="top-bar">
        <div class="top-item" v-for="(topItem,topIdx) in topInfo" :key="topIdx">
          <span>{{topItem.name}} : </span><span>{{topItem.val}}</span>
        </div>

        <div class="top-btns mybtns">
          <span class="btn btn-sm">全部导出</span>
          <span class="btn btn-sm">返回</span>
        </div>
      </div>
      <div class="type-info">
        <div class="type-list reset_scrollbar_v">
          <div class="type-item" v-for="(typeItem,typeIdx) in typeList" :class="[selIdx==typeIdx?'active':'']" :key="typeIdx">
            <span class="type-name" @click="selectType(typeIdx)">• {{typeItem.name}} : </span>
            <select v-if="typeItem.selects" :name="typeItem.name" @change="selChange($event,typeIdx)">
              <option v-for="(selOption,idxOption) in typeItem.selects" :key="idxOption" :value="selOption">{{selOption}}</option>
            </select>
          </div>
        </div>
        <div class="type-content">
          <div class="toolbar mybtns">
            <span class="btn btn-sm">删除</span>
            <span class="btn btn-sm">导出</span>
            <span class="btn btn-sm">查看日志</span>
          </div>
          <div class="type-show reset_scrollbar_all">
            <div>{{this.seledType}} : <span>{{this.selVal}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import breadnav from '../../modules/breadnav'
  export default {
    name: "carsdetail",
    components:{
      breadnav
    },
    data(){
      return{
        breadCrumb:['车辆管理','一车一档','详情'],
        topInfo:[
          {name:'生产流水号', val:'********'},
          {name:'订单号', val:'********'},
          {name:'车辆牌照号', val:'********'},
          {name:'VIN码', val:'********'},
          {name:'客户自编号', val:'********'},
          {name:'客户名称', val:'********'},
          {name:'存放地点', val:'********'}
        ],
        typeList:[
          {name:'转接单', selects:['转接单文档','转接单销售通知']},
          {name:'配置单', selects:['配置单文档1','配置单文档2']},
          {name:'BOM单'},
          {name:'备案数据', selects:['备案参数']},
          {name:'车辆信息记录'},
          {name:'补贴关键数据'},
          {name:'出厂检验报告', selects:['电池']},
          {name:'跟踪卡', selects:['后台上传']},
          {name:'QP单'},
          {name:'检测线数据'},
          {name:'电池数据'},
          {name:'系统数据'},
          {name:'电池箱电压电阻'},
        ],
        selIdx:0,
        seledType:'',
        selVal:''
      }
    },
    mounted(){
      console.log(this.$route.params);
      this.$layer.closeAll();
      this.selectType(this.selIdx);
    },
    methods:{
      selectType(idx){
        this.selIdx = idx;
        var name = this.typeList[idx].name;

        this.seledType = name;

        if(this.typeList[idx].selects){
          this.selVal = $('select[name="'+name+'"]').val();
        }else{
          this.selVal = '';
        }

        this.renderContent();
      },
      selChange(e,idx){
        if(this.selIdx == idx){
          var target = e.target;
          this.selVal = $(target).val();
          this.renderContent();
        }
      },
      renderContent(){
        console.log(this.seledType);
        console.log(this.selVal);
      }
    }
  }
</script>

<style lang="scss">
.detail-container{
  position: absolute;
  top: 40px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background-color: #fff;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .top-bar{
    font-size: 14px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .top-item{
      margin-right: 20px;
      color: #666;
    }
  }

  .type-info{
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .type-list{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow: auto;
      height: 100%;
    }
    .type-item{
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .type-name{
        cursor: pointer;
      }
      select{
        width: 200px;
        margin: 0 10px;
      }
      &.active{
        color: #3f9ffe;
        select{
          border-color: #3f9ffe;
        }
      }
    }

    .type-content{
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .toolbar{
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
    .type-show{
      flex: 1;
      margin: 20px 0 0 20px;
      padding: 20px;
      overflow: auto;
      border: solid 1px #ddd;
    }
  }
}
</style>






























