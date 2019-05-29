<template>
  <div class="hello">
    <!--<img src="../assets/logo.png" alt="">-->
    {{msg}}
    <div id="myChart"></div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted(){
      this.getData();
      this.drawLine();
      // console.log($)
    },
    methods:{
      getData(){
        this.axios.get(this.myServerSrc+'get.php?uname=xiongda&type=html').then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
          title: { text: '在Vue中使用echarts' },
          tooltip: {},
          xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #myChart{
    width: 100%;
    height: 300px;
  }
</style>
