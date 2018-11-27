import {
    RECORD_USERINFO,
    RECORD_SHIPPINGID,
    ADD_HISTORY,
    ADD_FOLLOW,
    REDUCE_FOLLOW,
    RECORE_FOOT
} from "./mutation-types"
import {setStore,dedupeObject} from "../common/js/util";

export default {
    [RECORD_USERINFO](state, username) {
        state.loginName = username
    },
    [RECORD_SHIPPINGID](state, shippingId) {
        state.shippingId = shippingId
    },
    [ADD_HISTORY](state,searchHistory) {
        state.searchHistory = searchHistory
        setStore('searchHistory',searchHistory)
    },
    //足迹列表
    [RECORE_FOOT](state,footprintList) {
        state.footprintList = footprintList
        setStore('footprintList',footprintList)
    },
  //关注列表
  [ADD_FOLLOW](state,followList) {
      // let followResult = []
      // if(type === 'add'){
      //   state.followList = dedupeObject(state.followList.push(product))
      //   return
      // }
      // if(type === 'reduce'){
      //   state.followList.forEach((item)=>{
      //     if(item.id === product.id){
      //       return
      //     }
      //     followResult.push(item)
      //   })
      //   state.followList = followResult
      // }
    state.followList = dedupeObject(followList)
  },
  [REDUCE_FOLLOW](state,productId){
      let result = []
      state.followList.forEach((item)=>{
        if(item.id === productId){
          return
        }
        result.push(item)
      })
      state.followList = result
  }
}
