//vuex store
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import headerStore from '../components/header/header'
import userInfor from '../components/system/user-set/userSet'

export default new Vuex.Store({
  state:{
    count:0,
    inputPrincipal:'',
    inputServerPeople:'',
    inputReviewPeople:'',
    addPJPeople:''
  },
  modules:{
    header:headerStore,
    userInfor:userInfor,
  }
});

