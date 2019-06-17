<template>
  <div id="loginPage">
    <div class="login-content login_mid_form">
      <div class='layer'></div>
      <div class='login_txt'>上海万象智控云管理平台</div>
      <div class="login_userdiv">
        <div>用户名</div>
        <input class="unam" value="" type="text" name="username" id="username" maxlength="17" placeholder="请输入用户名" autocomplete="off" v-model="username">
      </div>
      <div class="login_pswddiv">
        <div>密<b style='visibility:hidden'>密</b>码</div>
        <input  class="pswd"  value="" type="password"  name="password" id="password" maxlength="30" placeholder="请输入密码" v-model="password">
      </div>
      <div class="login_remediv">
        <label>
          <input  type="checkbox" name="reme" id="checkbox" class="reme"/>
          <span  class="remetit"> 记住密码</span>
        </label>

        <a class="forget-password" target=_blank ><span style="float:right" class="remetits" @click="forgetPassword"> 忘记密码？</span></a>
      </div>
      <div class="login_logdiv"><button  class="lbutton" @click="login">登录 </button></div>
  </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data(){
      return {
        username:'',
        password:'',
        loginbox:0
      }
    },
    mounted(){
      var _this = this;
      if(this.getCookie('loginbox') != null){
        if(this.getCookie('loginbox') == 1){
          $("#checkbox").attr('checked',true);
          this.username = this.getCookie('username');
          this.password = this.getCookie('password');
        }
      }

      document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode===13){
          _this.login();
        }
      };
    },
    methods:{
      login(){
        var _this = this;

        if ($("#checkbox").is(":checked")) {
          this.loginbox = 1;
        } else {
          this.loginbox = 0;
        }

        if(this.username == ''){
          this.$layer.msg('用户名不能为空！');
          return;
        }
        if(this.password == ''){
          this.$layer.msg('密码不能为空！');
          return;
        }

        var params = {
          'username':this.username,
          'password':this.password
        };

        var load = _this.$layer.loading();
        this.$ajaxPost('login/user_login',params)
          .then(res => {
            if(res.response== 'success'){//== 'success'
              if(_this.loginbox == 1){
                _this.setCookie('loginbox',_this.loginbox);
                _this.setCookie('username',_this.username);
                _this.setCookie('password',_this.password);
              }else{
                _this.delCookie('loginbox');
                _this.delCookie('username');
                _this.delCookie('password');
              }

              sessionStorage.setItem('username',this.username);
              sessionStorage.setItem('password',this.password);
              _this.$router.push('pages');
            }else{
              _this.$layer.msg(res.message);
              _this.$layer.close(load);
            }
          }).catch(err => {
            console.log(err);
            _this.$layer.close(load);
          });
      },
      forgetPassword(){
        this.$layer.msg('忘记密码了吧')
      }
    }
  }
</script>

<style lang="scss" scoped>
  #loginPage{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background:#fff url("../../static/images/login_small.png") no-repeat 100% center;
    .login-content{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      height: 420px;
      width: 670px;
      background: linear-gradient(#f8f8f8,#f4f4f4,#e2e2e2,#e6e6e6);
      border-radius: 6px;
      border: 1px #c5c5c5 solid;
      box-shadow: 0 3px 5px #afb1b0;

      .login_txt {
        font-size: 32px;
        height: 60px;
        line-height: 45px;
        color: #046bc3;
        margin: 57px 65px 47px 72px;
        border-bottom: 1px solid #a8a8a8;
        padding-left: 74px;
        background: url(../../static/images/logo_01.png) no-repeat;
        background-size: 72px 48px;
      }

      .layer {
        display: none;
        background: #fedada;
        position: absolute;
        z-index: 10;
        width: 383px;
        height: 40px;
        line-height: 40px;
        left: 190px;
        top: 121px;
        text-align: center;
        padding: 0;
        color: #fa5b5b;
        font-size: 16px;
        opacity: 0.7;
      }
      .login_userdiv, .login_pswddiv, .login_remediv {
        width: 483px;
        height: 45px;
        margin: auto;
        text-align: left;
        margin-bottom: 18px;
        position: relative;
        box-sizing: border-box;
      }
      .login_userdiv {
        margin-bottom: 34px;
      }

      .login_pswddiv {
        margin-bottom: 0;
      }

      .login_remediv {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 386px;
        margin-left: 186px;
        height: 30px;
        line-height: 30px;
        margin-bottom: 17px;
        margin-top: 5px;
        label{
          display: flex;
          flex-direction: row;
          align-items: center;
          cursor: pointer;
          input[type=checkbox]{
            width: 18px;
            height: 18px;
            margin: 0 5px 0 0;
          }
        }
      }

      .login_userdiv>div, .login_pswddiv div {
        width: 96px;
        display: inline-block;
        font-size: 20px;
        height: 22px;
        line-height: 22px;
      }

      .unam,.pswd,.vcode,.login_pswd_head {
        width: 351px;
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        padding-right: 20px;
        font-size: 14px;
        border: 1px solid #c4c0c1;
        border-radius: 6px;
        outline: none;
      }

      .login_logdiv {
        margin: 0;
        margin-bottom: 40px;
        button {
          width: 385px;
          line-height: 40px;
          height: 40px;
          color: #FFF;
          font-size: 18px;
          margin: 0;
          padding: 0 20px 30px 20px;
          background: #43a1fe;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          margin-left: 191px;
          outline: none;
        }
      }
    }
    .forget-password{
      cursor: pointer;
    }
  }
</style>
