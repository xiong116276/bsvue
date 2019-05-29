//vuex store
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import headerStore from '../components/header/header'
import userInfor from '../components/xitongguanli/reyuanguanli/userInfor'

export default new Vuex.Store({
  state:{
    count:0
  },
  modules:{
    header:headerStore,
    userInfor:userInfor
  }
});
