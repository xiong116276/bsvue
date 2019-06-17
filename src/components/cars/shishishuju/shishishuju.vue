<template>
  <div class="real-time-data">
    <breadnav :breadCrumb="breadCrumb"></breadnav>
    <div class="data-container">
      <div class="top-select">
        <select name="select" v-model="selectVal">
          <option v-for="(selectItem,selectIdx) in selectList" :value="selectItem" :key="selectIdx">{{selectItem}}</option>
        </select>
        <input name="input" type="text" placeholder="请输入" v-model="inputVal">
        <div class="mybtns">
          <span class="btn btn-sm">确认</span>
          <span class="btn btn-sm" @click="resetSelect">重置</span>
        </div>
      </div>
      <div class="data-content">
        <div class="left-map">
          <div id="map"></div>
        </div>
        <div class="data-info">
          <div class="yibiao">
            <div id="speed"></div>
            <div id="soc"></div>
          </div>
          <div class="table reset_scrollbar_all">
            <div class="show-item" v-for="(item,idx) in carInfo" :key="idx">
              <p class="show-title">{{item.title}}</p>
              <div class="show-content clearfix">
                <div class="show-row"  v-for="(itemDetail,detailIdx) in item.data" :key="detailIdx">
                  <div class="left"><span class="name">{{itemDetail[0].name}}</span><span class="value">{{itemDetail[0].value}}</span></div>
                  <div v-if="itemDetail[1]" class="right"><span class="name">{{itemDetail[1].name}}</span><span class="value">{{itemDetail[1].value}}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import breadnav from '../../modules/breadnav';
  export default {
    name: "shishishuju",
    components:{breadnav},
    data(){
      return {
        breadCrumb:['车辆管理','实时数据'],
        selectList:['条件筛选','车辆牌照号','VIN码'],
        selectVal:'',
        inputVal:'',
        point:[],
        speed:0,
        soc:0,
        carInfo:[]
      }
    },
    mounted(){
      var _this = this;
      this.point = [114.0536,22.6246];
      this.speed = 45;
      this.soc = 70;
      this.carInfo = [
        {
          title:'基本信息',
          data:[
            [{name:'生产流水线',value:'18DB20009'}, {name:'订单号',value:'18DB20009'},],
            [{name:'客户名称',value:'18DB20009'}, {name:'整车型号',value:'18DB20009'}],
            [{name:'电机温度',value:'18DB20009'}, {name:'控制器温度',value:'18DB20009'}],
            [{name:'车辆牌照',value:'18DB20009'}, {name:'VIN码',value:'18DB20009'}],
            [{name:'总里程',value:'18DB20009'}, {name:'SOC',value:'18DB20009'}],
            [{name:'上报时间',value:'18DB20009'}, {name:'当前位置',value:'18DB20009'}],
          ]
        },
        {
          title:'整车信息',
          data:[
            [{name:'车速',value:'18DB20009'}, {name:'制动踏板行程值',value:'18DB20009'}],
            [{name:'档位',value:'18DB20009'}, {name:'运行模式',value:'18DB20009'}],
            [{name:'DC-DC状态',value:'18DB20009'}, {name:'车辆状态',value:'18DB20009'}],
            [{name:'SOC',value:'18DB20009'}, {name:'正极对地电阻',value:'18DB20009'}],
            [{name:'里程',value:'18DB20009'}, {name:'加速踏板行程值',value:'18DB20009'}],
            [{name:'制动状态',value:'18DB20009'}, {name:'驱动状态',value:'18DB20009'}],
            [{name:'总电压',value:'18DB20009'}, {name:'总电流',value:'18DB20009'}],
            [{name:'充电状态',value:'18DB20009'}],
          ]
        },
        {
          title:'驱动机信息',
          data:[
            [{name:'生产流水线',value:'18DB20009'}, {name:'订单号',value:'18DB20009'}],
            [{name:'客户名称',value:'18DB20009'}, {name:'整车型号',value:'18DB20009'}],
            [{name:'电机温度',value:'18DB20009'}, {name:'控制器温度',value:'18DB20009'}],
            [{name:'车辆牌照',value:'18DB20009'}, {name:'VIN码',value:'18DB20009'}],
            [{name:'总里程',value:'18DB20009'}, {name:'SOC',value:'18DB20009'}],
            [{name:'上报时间',value:'18DB20009'}, {name:'当前位置',value:'18DB20009'}],
          ]
        }
      ];
      this.init();
    },
    methods:{
      init(){
        this.selectVal = this.selectList[0];
        this.map();
        this.drawLine();
      },
      resetSelect(){
        this.selectVal ='条件筛选';
        this.inputVal = '';
      },
      map(){
        let map =new BMap.Map('map'); // 创建Map实例
        var point=new BMap.Point(this.point[0],this.point[1]);
        map.centerAndZoom(point,20);  // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        //添加比例尺等控件
        var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});// 左上角，添加比例尺
        var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
        map.addControl(top_left_control);
        map.addControl(top_left_navigation);
        //添加点
        var marker = new BMap.Marker(point); // 创建点
        map.addOverlay(marker);            //增加点
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      },
      drawLine(){
        var _this = this;

        let chartSpeed = this.$echarts.init(document.getElementById('speed'));
        let chartSoc  = this.$echarts.init(document.getElementById('soc'));

        //绘制仪表盘
        chartSpeed.setOption(this.setOption('车速计量表','速度',this.speed,'km/h',130),true);
        chartSoc.setOption(this.setOption('SOC计量表','SOC',this.soc,'%',100),true);

        window.onresize = function(){ // 定义窗口大小变更通知事件
          chartSpeed.resize();
          chartSoc.resize();
        };
      },
      setOption(title,name,val,type,len){
        return {
          title: {
            text: title,
            x:'center',
            y:'85%',
            textStyle:{//标题内容的样式
              color:'#000',
              fontStyle:'normal',
              fontWeight:"lighter",
              fontFamily:"Microsoft YaHei",
              fontSize:14
            },
          },
          tooltip : {
            formatter: "{b} : {c}"+type
          },
          series: [
            {
              name: '速度',
              type: 'gauge',
              min:0,
              max:len,    //设置刻度盘内数值区间
              // splitNumber:10,  //设置间隔区域的显示数量
              detail: {
                formatter:'{value}'+type,
                textStyle:{
                  "fontSize": 12,
                }
              },
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  // color: [[0.2, '#c23531'], [0.8, '#63869e'], [1, '#91c7ae']],
                  width: 20,
                }
              },
              data: [{value: val, name: name}],
            }
          ]
        }
      }
    },
  }
</script>

<style lang="scss">
.real-time-data{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  .data-container{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    background-color: #fff;
    margin: 0 10px;
    padding: 10px;
    .top-select{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin: 0 0 10px 0;
      select,input{
        height: 28px;
        border-radius: 4px;
        outline: none;
      }
      select{
        border: solid 1px #3f9ffe;
        color: #3f9ffe;
      }

      input{
        border: solid 1px #999;
        padding: 0 10px;
        width: 220px;
        margin-left: 10px;
      }
    }
    .data-content{
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .left-map{
      width: 60%;
    }
    .data-info{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      .yibiao{
        height: 260px;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid #ddd;
        margin-left: 10px;
        >div{
          flex:1;
          height: 100%;
        }
      }
      .table{
        flex: 1;
        overflow: auto;
        padding-left: 10px;
        height: 0;
        margin: 0;
      }
      .show-item{
        margin-bottom: 10px;
        font-size: 14px;
        &:last-child{
          margin-bottom: 0;
        }
        .show-title{
          height: 28px;
          line-height: 28px;
          margin: 0;
        }
        .show-content{
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          border: 1px solid #eee{
            bottom: 0;
            right: 0;
          };
          .show-row{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            &:nth-child(2n){
              background-color: #eee;
            }
            >div{
              width: 50%;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              >span{
                flex: 1;
                padding-left: 20px;
                display: inline-block;
                height: 40px;
                line-height: 40px;
                border: 1px solid #eee{
                  top: 0;
                  left: 0;
                };
              }
            }

            .name{
              background-color: #d3e3ff;
            }
          }
        }
      }
    }

    #map{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
