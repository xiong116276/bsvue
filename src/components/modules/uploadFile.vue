<template>
  <div class="upload-file-container">
    <div class="left-list reset_scrollbar_v">
      <p class="item" v-for="(item,index) in list" :key="index">
        <span class="name">{{item.name}}:</span>
        <router-link :to="{name:'carsdetail',params:{id:pid,tid:index}}" v-if="item.isUpload" class="pull-right uploaded">已上传</router-link>
        <span v-else class="pull-right unupload" :name="item.name" @click="chooseUpload">未上传</span>
      </p>
    </div>
    <div class="right-container reset_scrollbar_v">
      <div class="uplist-choose">
        <select name="selectedUp" id="selectedUp" v-model="chooseName">
          <option v-for="(upItem,upIdx) in upList" :key="upIdx" :name="upItem">{{upItem}}</option>
        </select>
      </div>
      <div class="show-type" v-show="chooseName != '条件筛选'">
        <div class="uplist-choose">
          <input type="text" name="selectOrder" placeholder="请输入订单号">
        </div>
        <div class="btn-template-export">{{chooseName}}标准模板导出</div>
        <div class="upload-tips">说明:文档仅限doc.docx格式，请按标准模板上传。</div>

        <div class="show-upload-file" v-if="chooseFile!=''"><span>已选择：{{chooseFile}}</span> <span @click="deleteFile" class="glyphicon glyphicon-remove"></span></div>
        <div class="btns">
          <div class="choose-upload">
            <span class="text">选择{{chooseName}}</span>
            <input @change="choosedFile" type="file" name="choosedFile">
          </div>
          <div class="btn-save" @click="saveUpload">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "uploadFile",
    props:{
      layerid: {type: String, default:""},
      pid:{type:String}
    },
    data(){
      return{
        list:[
          {name:'转接单', isUpload:false},
          {name:'配置单', isUpload:false},
          {name:'BOM单', isUpload:false},
          {name:'备案数据', isUpload:false},
          {name:'车辆信息记录', isUpload:false},
          {name:'补贴关键数据', isUpload:false},
          {name:'出厂检测报告', isUpload:false},
          {name:'跟踪卡', isUpload:false},
          {name:'QP单', isUpload:false},
          {name:'检测线数据', isUpload:true},
          {name:'电池数据', isUpload:true},
          {name:'系统数据', isUpload:true},
          {name:'电池箱电压电阻', isUpload:true},
        ],
        upList:[],
        chooseName:'条件筛选',
        chooseFile:''
      }
    },
    mounted(){
      // console.log(this.pid);
      this.initSelect();
    },
    methods:{
      initSelect(){
        var _this = this;
        var arr = ['条件筛选'];
        this.list.forEach(function (v, k) {
          if(!v.isUpload){
            arr.push(v.name);
          }
        });
        this.upList = arr;
        this.chooseName = '条件筛选';
        this.chooseFile = '';
      },
      chooseUpload(e){
        var event = e.target;
        var name = $(event).attr('name');
        this.chooseName = name;
      },
      choosedFile(e){
        var event = e.target;
        var files = event.files;
        console.log(files[0].name);
        this.chooseFile = files[0].name;
      },
      deleteFile(e){
        this.chooseFile = '';
        $('input[name="choosedFile"]').val('');
      },
      saveUpload(){
        var _this = this;

        if(this.chooseFile == ''){
          this.$layer.msg('请先上传'+this.chooseName);
        }else{
          // console.log(this.chooseName,this.chooseFile);
          this.list.forEach(function (v, k) {
            if(v.name == _this.chooseName){
              v.isUpload = true;
            }
          });

          this.$layer.msg(this.chooseName+'上传成功！');
          this.initSelect();
        }
      }
    }
  }
</script>

<style lang="scss">
  .upload-file-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    >div{
      height: 100%;
      overflow: auto;
    }
    .left-list{
      width: 40%;
      border-right: 1px solid #ddd;
      padding: 20px;
      .item{
        .unupload{
          cursor: pointer;
          color: #fd2525;
        }
        .uploaded{
          cursor: pointer;
          color: #00cc00;
        }
      }
    }
    .right-container{
      width: 60%;

      .uplist-choose{
        display: flex;
        flex-direction: row;
        align-items: center;
        select,input{
          display: inline-block;
          width: 80%;
          margin: 20px auto 0;
          height: 28px;
          border-radius: 4px;
          border: solid 1px #999999;
          padding: 0 10px;
        }
        input{
          width: 100%;
        }
      }
      .show-type{
        >div{
          width:80%;
          margin: 20px auto 0;
        }
      }
      .btn-template-export{
        text-decoration: underline;
        font-size: 14px;
        color: #0066ff;
        cursor: pointer;
      }

      .btns{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        >div{
          height: 28px;
          line-height: 28px;
          border-radius: 4px;
          border: solid 1px #3e9ffe;
          min-width: 95px;
          text-align: center;
          color:#3e9ffe;
          cursor: pointer;
          padding: 0 10px;
          &:hover{
            background-color: #3e9ffe;
            color: #fff;
          }
        }
      }

      .choose-upload{
        position: relative;
        overflow: hidden;
        input[type=file]{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          cursor: pointer;
        }
      }

      .show-upload-file{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .glyphicon{
          cursor: pointer;
          &:hover{
            color: #ff0000;
          }
        }
      }
    }
  }
</style>
