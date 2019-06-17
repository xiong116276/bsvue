<template>
  <div id="upLoadWxOrder">
    <div class="btn-template-export">{{chooseName}}标准模板导出</div>
    <div class="upload-tips">说明:建议使用标准模板上传。</div>

    <div class="show-upload-file" v-if="chooseFile!=''"><span>已选择：{{chooseFile}}</span> <span @click="deleteFile" class="glyphicon glyphicon-remove"></span></div>
    <div class="btns">
      <div class="choose-upload">
        <span class="text">选择{{chooseName}}</span>
        <input @change="choosedFile" type="file" name="choosedFile">
      </div>
      <div class="btn-save" @click="saveUpload">保存</div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "upLoadWxOrder",
    props:{
      layerid: {type: String, default:""},
    },
    data(){
      return {
        chooseFile:'',
        chooseName:'维修工单',
      }
    },
    mounted(){
      console.log(this.layerid)
    },
    methods:{
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

          this.$layer.msg(this.chooseName+'上传成功！');
        }
      }
    }
  }
</script>

<style lang="scss">
#upLoadWxOrder{
  width: 100%;
  padding: 20px;
  >div{
    margin-bottom: 10px;
  }
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
</style>
