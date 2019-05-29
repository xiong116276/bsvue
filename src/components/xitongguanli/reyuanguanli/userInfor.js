export default {
  state:{
    isShow: false
  },
  mutations:{
    isShow(state){
      state.isShow = !state.isShow
    }
  },
  actions:{
    Action(context){
      context.commit('isShow')
    }
  }
}
