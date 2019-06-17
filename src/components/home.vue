<template>
  <div class="homeContent">
    <!--<breadnav :bread-crumb="breadCrumb"></breadnav>-->
    <div class="container-fluid"><div id="myChart"></div></div>
    <div class="container-fluid">
      <div class="left-chart col-xs-4"><div id="chartCarUpload"></div></div>
      <div class="right-table col-xs-8">
        <div id="tableCarInfo">
          <div class="title"><span class="text">客户车辆信息</span></div>
          <div class="content">
            <div id="homeTableContent"><table id="table"></table></div>
            <div class="rightInfo">
              <div class="list-item carImg"><img :src="carImgUrl" alt=""></div>
              <div class="list-item item-small carTotal"><img :src="carTotalUrl" alt=""><p class="text">在线总计:<span>{{carTotal}}</span></p></div>
              <div class="list-item item-small carOnline"><img :src="carOnlineUrl" alt=""><p class="text">在线车辆:<span>{{carOnline}}</span></p></div>
              <div class="list-item item-small carOutline"><img :src="carOutlineUrl" alt=""><p class="text">离线车辆:<span>{{carOutline}}</span></p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import breadnav from './modules/breadnav'
  export default {
    name: 'home',
    components:{
      breadnav
    },
    data () {
      return {
        breadCrumb: ['Home'],
        chartBar:{
          xAxis:["19/05","19/04","19/03","19/02","19/01","18/12","18/11","18/10","18/09","18/08","18/07","18/06"],
          series:[50,10,20,30,54,74,20,136,0,0,2762,1033]
        },
        chartPie:[
          {value:2, name:'已上传'},
          {value:5823, name:'未上传'}
        ],
        homeTable:[],
        tableColumns:[
          {
            title: '客户名称',
            field: 'name',
          },
          {
            title: '车辆总数',
            field: 'countnum'
          },
          {
            title: '在线数量',
            field: 'online'
          },
          {
            title: '离线数量',
            field: 'offline'
          },
          // {
          //   title: '排名',
          //   field: 'ranking'
          // }
        ],
        tableH:100,
        tableW:500,
        carImgUrl:'./static/images/car.png',
        carTotalUrl:'./static/images/total.jpg',
        carOnlineUrl:'./static/images/online.jpg',
        carOutlineUrl:'./static/images/offline.jpg',
        carTotal:'',
        carOnline:'',
        carOutline:'',
      }
    },
    mounted(){
      var _this = this;
      this.$layer.closeAll();
      _this.getData();
    },
    watch:{

    },
    methods:{
      getData(){
        var _this = this;
        var load = _this.$layer.loading();
        this.$ajaxGet('sysmanagev2/home_page',{})
        .then(res => {
          var data = JSON.parse(res);
          _this.chartBar = data[0];
          _this.chartPie[0].value = data[1].upload;
          _this.chartPie[1].value = data[1].unupload;
          _this.homeTable = data[2][1];
          _this.carTotal = data[2][0].total;
          _this.carOnline = data[2][0].online;
          _this.carOutline = data[2][0].offline;
          _this.drawLine();

          _this.$layer.close(load);
        }).catch(err => {console.log(err)});
      },
      // postData(){
      //   this.$ajaxPost('sysmanagev2/get_data',{type:1, timestamp: 1507628932})
      //   .then(res => {
      //     console.log(res);
      //   }).catch(err => {console.log(err)});
      // },
      drawLine(){
        var _this = this;

        let myChart = this.$echarts.init(document.getElementById('myChart'));
        let chartCarUpload  = this.$echarts.init(document.getElementById('chartCarUpload'));

        //绘制柱状图
        myChart.setOption({
          color: ['#43a1fe'],
          title: {
            text: '车辆注册数量',
            x:'10px',
            y:'10px',
            textStyle:{//标题内容的样式
              color:'#000',
              fontStyle:'normal',
              fontWeight:"lighter",
              fontFamily:"Microsoft YaHei",
              fontSize:16
            },
          },
          backgroundColor: '#fff',//背景色
          tooltip: {
            trigger:'axis',
            axisPointer:{    // 坐标轴指示器，坐标轴触发有效
              type : 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            itemWidth:30,
            itemHeight:30,
            orient : 'vertical',
            x : '92%',
            y:10,
            data:['客车'],
          },
          grid: {
            left: '4%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type : 'category',
              data : _this.chartBar.xAxis,
              axisTick: {
                alignWithLabel: true
              },
            }
          ],
          yAxis: [
            {
              type:'value'
            }
          ],
          series: [
            {
              name:'客车',
              type:'bar',
              barWidth: '50%',
              data:_this.chartBar.series,
              itemStyle: {
                normal: {
                  label: {
                    show: true,//是否展示
                    position: 'top',
                    textStyle: {
                      fontWeight:'bolder',
                      fontSize : '12',
                      fontFamily : 'Microsoft YaHei',
                      color:'#43a1fe ',
                    }
                  },
                  color: this.$echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#43a1fe'},
                      {offset: 1, color: '#2995ff'}
                    ]
                  )
                }
              },
            },
          ]
        });
        //绘制饼状图
        chartCarUpload.setOption({
          color: ['#ccc9c9','#43a1fe'],
          backgroundColor: '#fff',//背景色
          title : {
            text: '车辆上传情况',
            x:'2%',
            y:'2%',
            textStyle:{//标题内容的样式
              color:'#000',//京东红
              fontStyle:'normal',//主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
              fontWeight:"lighter",//可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
              fontFamily:"Microsoft YaHei",//主题文字字体，默认Microsoft YaHei
              fontSize:16//主题文字字体大小，默认为18px
            },
          },
          tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
          },
          legend: {
            itemWidth:30,
            itemHeight:30,
            orient: 'vertical',
            right: '2%',
            y:'2%',
            data:  ['已上传','未上传'],
            textStyle: {
              color: '#333'          // 图例文字颜色
            },
          },
          series : [
            {
              name: '车辆上传情况',
              type: 'pie',
              radius : '75%',
              center: ['50%', '60%'],
              data:_this.chartPie,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        //绘制表格
        _this.drawTable('#table',_this.homeTable);
        window.onresize = function(){ // 定义窗口大小变更通知事件
          myChart.resize();
          chartCarUpload.resize();
          _this.drawTable('#table',_this.homeTable);
          $(".fixed-table-container").css({"height": _this.tableH});
        };
      },
      drawTable(el,data){
        var _this = this;
        _this.tableH = $('#homeTableContent').height();

        $(el).bootstrapTable({
          columns:_this.tableColumns,
          data:data,
          striped: true, //是否显示行间隔色
          cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性
          minimumCountColumns: 2,             //最少允许的列数
          clickToSelect: true,                //是否启用点击选中行
          height: _this.tableH,               //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .homeContent{
    .container-fluid{
      height: 50%;
      &:nth-child(2){
        height: calc(50% - 20px);
      }
    }
    .left-chart{
      height: 100%;
      padding: 0 10px 0 5px;
      background-color: #fff;
    }
    .right-table{
      height: 100%;
      padding: 0 5px 0 10px;
    }

    #myChart{
      height: calc(100% - 40px);
      margin: 20px 5px;
      border: solid 1px #e5e5e5;
      background-color: #fff;
    }

    #chartCarUpload{
      width: 100%;
      height: 100%;
    }
    #tableCarInfo{
      width: 100%;
      height: 100%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title{
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        font-size: 16px;
      }
      .content{
        height: calc(100% - 60px);
        padding: 0 20px;
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
        /*min-height: 290px;*/
      }
    }
    #homeTableContent{
      width: 69%;
      table{
        td,th{
          text-align: center;
        }
      }
      .fixed-table-header{
        background-color: #d3e3ff;
        table{
          background-color: #d3e3ff;
        }
      }
    }
    .rightInfo{
      width: 31%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .list-item{
        width: 85%;
        margin: 0 auto;
        border-radius: 5px;
        border: 1px #dcdcdc solid;
        background-color: #F7F7F7;
      }
      .item-small{
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        img{
          margin: 0 20px 0 0;
        }
        .text{
          margin: 0;
        }
        span{
          padding: 0 20px;
        }
      }
      .carImg{
        padding: 20px 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
    }

  }




</style>
