<template>
  <div id="selectPeople">
    <div class="select-content">
      <div class="select-list">
        <p class="title">选择:</p>
        <div class="content reset_scrollbar_all">
          <ul class="level-list">
            <li class="level-one" :id="levelOneItem.Id" v-for="(levelOneItem,levelOneIdx) in dataList" :key="levelOneIdx">
              <a class="level-one-text" @click="toggleLevel">{{levelOneItem.Department}}</a>
              <ul class="level-two" v-if="levelOneItem.userlist">
                <li id="levelTwoItem.Id" v-for="(levelTwoItem,levelTwoIdx) in levelOneItem.userlist" :key="levelTwoIdx" class="level-two-text" :class="[levelTwoItem.Set?'selected':'']" @click="choosePeople(levelOneIdx,levelTwoIdx)"><a>{{levelTwoItem.Nickname}}</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="selected-list">
        <p class="title">已选:</p>
        <div class="content reset_scrollbar_all">
          <p class="selected-item" v-for="(selectedItem,selectedIdx) in choosedList" :key="selectedIdx"><span class="text">{{selectedItem.name}}</span><span @click="removeSet(selectedItem.point)" class="glyphicon glyphicon glyphicon-remove-circle"></span></p>
        </div>
      </div>
    </div>
    <div class="mybtns2">
      <span class="btn" @click="confirm">确定</span>
      <span class="btn" @click="cancel">取消</span>
    </div>
  </div>

</template>

<script>
  export default {
    name: "selectPeople",
    props:{
      layerid: {type: String, default:""},
      addType:{}
    },
    data(){
      return{
        dataList:[
          {
            Id: "1",
            Department: "管理部",
            userlist: [
              {
                Id: "102",
                Nickname: "万象",
                Set: 0
              }
            ]
          },
          {
            Id: "2",
            Department: "财务部",
            userlist: [ ]
          },
          {
            Id: "3",
            Department: "技术中心",
            userlist: [
              {
                Id: "91",
                Nickname: "尹群英",
                Set: 1
              },
              {
                Id: "198",
                Nickname: "石玮鋆",
                Set: 0
              },
              {
                Id: "217",
                Nickname: "邱水军",
                Set: 0
              }
            ]
          },
          {
            Id: "4",
            Department: "信息部",
            userlist: [
              {
                Id: "212",
                Nickname: "李天佐",
                Set: 0
              }
            ]
          },
          {
            Id: "5",
            Department: "物流部",
            userlist: [ ]
          },
          {
            Id: "6",
            Department: "生产部",
            userlist: [ ]
          },
          {
            Id: "7",
            Department: "项目科",
            userlist: [ ]
          },
          {
            Id: "8",
            Department: "生产技术部",
            userlist: [
              {
                Id: "161",
                Nickname: "王建军",
                Set: 0
              }
            ]
          },
          {
            Id: "9",
            Department: "质保部",
            userlist: [
              {
                Id: "221",
                Nickname: "许晓龙",
                Set: 0
              }
            ]
          },
          {
            Id: "10",
            Department: "售后服务部",
            userlist: [
              {
                Id: "92",
                Nickname: "李忱",
                Set: 0
              },
              {
                Id: "95",
                Nickname: "关相宇",
                Set: 0
              },
              {
                Id: "97",
                Nickname: "黄周美",
                Set: 0
              },
              {
                Id: "103",
                Nickname: "兰公鹏",
                Set: 0
              },
              {
                Id: "104",
                Nickname: "朱成华",
                Set: 0
              },
              {
                Id: "105",
                Nickname: "刘建强",
                Set: 0
              },
              {
                Id: "106",
                Nickname: "陈翔宇",
                Set: 0
              },
              {
                Id: "110",
                Nickname: "郭碧华",
                Set: 0
              },
              {
                Id: "112",
                Nickname: "王雅兴",
                Set: 0
              },
              {
                Id: "114",
                Nickname: "曲琛",
                Set: 0
              },
              {
                Id: "115",
                Nickname: "姚浩芦",
                Set: 0
              },
              {
                Id: "116",
                Nickname: "李星泽",
                Set: 0
              },
              {
                Id: "118",
                Nickname: "谷延军",
                Set: 0
              },
              {
                Id: "121",
                Nickname: "余京",
                Set: 0
              },
              {
                Id: "123",
                Nickname: "高天雷",
                Set: 0
              },
              {
                Id: "126",
                Nickname: "冯金钢",
                Set: 0
              },
              {
                Id: "128",
                Nickname: "张洪宇",
                Set: 0
              },
              {
                Id: "129",
                Nickname: "李珍伟",
                Set: 0
              },
              {
                Id: "130",
                Nickname: "曹建伟",
                Set: 0
              },
              {
                Id: "131",
                Nickname: "李丹雅",
                Set: 0
              },
              {
                Id: "132",
                Nickname: "崔凡龙",
                Set: 0
              },
              {
                Id: "133",
                Nickname: "陈伟东",
                Set: 0
              },
              {
                Id: "136",
                Nickname: "宋克磊",
                Set: 0
              },
              {
                Id: "137",
                Nickname: "孙敏根",
                Set: 0
              },
              {
                Id: "138",
                Nickname: "丁水涵",
                Set: 0
              },
              {
                Id: "139",
                Nickname: "陈志杰",
                Set: 0
              },
              {
                Id: "146",
                Nickname: "郜周治",
                Set: 0
              },
              {
                Id: "147",
                Nickname: "樊健鹏",
                Set: 0
              },
              {
                Id: "171",
                Nickname: "孙伟",
                Set: 0
              },
              {
                Id: "172",
                Nickname: "徐震",
                Set: 0
              },
              {
                Id: "173",
                Nickname: "胡旷达",
                Set: 0
              },
              {
                Id: "196",
                Nickname: "李兆峰",
                Set: 0
              },
              {
                Id: "197",
                Nickname: "宫长安",
                Set: 0
              },
              {
                Id: "201",
                Nickname: "温建伟",
                Set: 0
              },
              {
                Id: "216",
                Nickname: "孙萍",
                Set: 0
              },
              {
                Id: "219",
                Nickname: "杨波",
                Set: 0
              }
            ]
          },
          {
            Id: "11",
            Department: "营销中心",
            userlist: [
              {
                Id: "156",
                Nickname: "蔡鹏松",
                Set: 0
              },
              {
                Id: "158",
                Nickname: "刘振华",
                Set: 0
              },
              {
                Id: "164",
                Nickname: "刘芬",
                Set: 0
              },
              {
                Id: "166",
                Nickname: "林允",
                Set: 0
              },
              {
                Id: "168",
                Nickname: "黄宇",
                Set: 0
              },
              {
                Id: "175",
                Nickname: "邓玉梅",
                Set: 0
              },
              {
                Id: "176",
                Nickname: "朱琦",
                Set: 0
              },
              {
                Id: "177",
                Nickname: "陈宇",
                Set: 0
              },
              {
                Id: "178",
                Nickname: "李刚",
                Set: 0
              },
              {
                Id: "180",
                Nickname: "李红威",
                Set: 0
              },
              {
                Id: "183",
                Nickname: "杨洪庆",
                Set: 0
              },
              {
                Id: "187",
                Nickname: "何忠",
                Set: 0
              },
              {
                Id: "188",
                Nickname: "陈攀",
                Set: 0
              },
              {
                Id: "189",
                Nickname: "赵露",
                Set: 0
              },
              {
                Id: "190",
                Nickname: "王蕾",
                Set: 0
              },
              {
                Id: "191",
                Nickname: "曹阳",
                Set: 0
              },
              {
                Id: "192",
                Nickname: "王鹍",
                Set: 0
              },
              {
                Id: "193",
                Nickname: "姚新远",
                Set: 0
              },
              {
                Id: "194",
                Nickname: "仇超俊",
                Set: 0
              },
              {
                Id: "195",
                Nickname: "刘思禹",
                Set: 0
              },
              {
                Id: "199",
                Nickname: "岑微",
                Set: 0
              },
              {
                Id: "200",
                Nickname: "董博文",
                Set: 0
              },
              {
                Id: "202",
                Nickname: "王光波",
                Set: 0
              },
              {
                Id: "203",
                Nickname: "沈东明",
                Set: 0
              },
              {
                Id: "204",
                Nickname: "马志鹏",
                Set: 0
              },
              {
                Id: "205",
                Nickname: "林翔",
                Set: 0
              },
              {
                Id: "206",
                Nickname: "张军",
                Set: 0
              },
              {
                Id: "207",
                Nickname: "杨曦",
                Set: 0
              },
              {
                Id: "208",
                Nickname: "史明辉",
                Set: 0
              },
              {
                Id: "209",
                Nickname: "杨坚荣",
                Set: 0
              },
              {
                Id: "210",
                Nickname: "张德成",
                Set: 0
              },
              {
                Id: "213",
                Nickname: "查庆民",
                Set: 0
              },
              {
                Id: "214",
                Nickname: "周卫星",
                Set: 0
              },
              {
                Id: "215",
                Nickname: "石小虎",
                Set: 0
              },
              {
                Id: "218",
                Nickname: "林海虹",
                Set: 0
              }
            ]
          },
          {
            Id: "12",
            Department: "新能源技术科",
            userlist: [ ]
          },
          {
            Id: "13",
            Department: "其它",
            userlist: [
              {
                Id: "101",
                Nickname: "巴士三公司",
                Set: 0
              },
              {
                Id: "140",
                Nickname: "华会科技",
                Set: 0
              },
              {
                Id: "141",
                Nickname: "测试",
                Set: 0
              },
              {
                Id: "163",
                Nickname: "巴士三公司",
                Set: 0
              }
            ]
          },
          {
            Id: "14",
            Department: "新增部门",
            userlist: [ ]
          },
          {
            Id: "15",
            Department: "轻型车事业部",
            userlist: [ ]
          },
          {
            Id: "16",
            Department: "上海市场部",
            userlist: [ ]
          },
          {
            Id: "17",
            Department: "国内市场部",
            userlist: [
              {
                Id: "155",
                Nickname: "张德飞",
                Set: 0
              }
            ]
          },
          {
            Id: "18",
            Department: "海外市场部",
            userlist: [ ]
          },
          {
            Id: "19",
            Department: "营销管理部",
            userlist: [
              {
                Id: "109",
                Nickname: "陈燊辉",
                Set: 0
              },
              {
                Id: "148",
                Nickname: "杨晔",
                Set: 0
              }
            ]
          }
        ],
        choosedList:[]
      }
    },
    mounted(){
      this.choosedList = this.getChoosed();
    },
    methods:{
      toggleLevel(event){
        var e = event.target;
        $(e).parents('.level-one').toggleClass('active');
        $(e).next('.level-two').slideToggle();
      },
      choosePeople(idx1,idx2){
        this.dataList[idx1].userlist[idx2].Set = !this.dataList[idx1].userlist[idx2].Set;
        this.choosedList = this.getChoosed();
      },
      getChoosed(){
        var arr = [];
        this.dataList.forEach(function (v, k) {
          if(v.userlist.length > 0){
            v.userlist.forEach(function (m,n) {
              if(m.Set){
                arr.push({point:[k,n],name:m.Nickname});
              }
            });
          }
        });
        return arr;
      },
      removeSet(point){
        this.choosePeople(point[0],point[1]);
      },
      confirm(){
        var _this = this;
        if(_this.addType == 'principal'){
          if(this.choosedList.length > 1){
            _this.$layer.msg('派工负责人只能选择一个！');
            return;
          }else if(this.choosedList.length == 0){
            _this.$store.state.inputPrincipal = '';
          }else{
            _this.$store.state.inputPrincipal = _this.choosedList[0].name
          }
        }else {
          var text = '';
          if(_this.choosedList.length == 0){
            text = '';
          }else{
            _this.choosedList.forEach(function (v,k) {
              if(k < _this.choosedList.length - 1){
                text += v.name+'、';
              }else{
                text += v.name;
              }
            });
          }
          if(_this.addType == 'server'){
            _this.$store.state.inputServerPeople = text;
          }else if(_this.addType == 'review'){
            _this.$store.state.inputReviewPeople = text;
          }else if(_this.addType == 'addPJPeople'){
            _this.$store.state.addPJPeople = text;
            console.log(_this.$store.state.addPJPeople);
          }
        }

        this.$layer.close(this.layerid);
      },
      cancel(){
        this.$layer.close(this.layerid);
      }
    }
  }
</script>

<style lang="scss">
#selectPeople{
  width: 100%;
  display: flex;
  flex-direction: column;
  .select-content{
    flex: 1;
    display: flex;
    >div{
      flex: 1;
      padding: 20px 20px 0;
      display: flex;
      flex-direction: column;
    }
    .content{
      flex: 1;
      overflow: auto;
      height: 0;
      border: 1px solid #ddd;
    }
  }

  .selected-list{
    .content{
      /*padding: 0 20px;*/
    }
    .selected-item{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 80%;
      margin: 10px auto;
      .glyphicon{
        font-size: 22px;
        cursor: pointer;
        color: #999;
        &:hover{
          color: #ff0000;
        }
      }
    }
  }

  .mybtns2{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .btn{
      margin: 10px 0;
    }
  }
}
</style>
