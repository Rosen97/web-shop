import {RECORD_USERINFO} from "./mutation-types"

export default {
  [RECORD_USERINFO](state,username){
    state.loginName = username
  }
}
