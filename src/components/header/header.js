export default {
  state:{
    isShowRight:true,
  },
  mutations:{
    isShow(state){
      state.isShowRight = true
    },
    isHide(state){
      state.isShowRight = false
    }
  },
  actions:{
    rightShow(context){
      context.commit('isShow')
    },
    rightHide(context){
      context.commit('isHide')
    }
  }
}
