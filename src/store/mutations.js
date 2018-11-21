import {
    RECORD_USERINFO,
    RECORD_SHIPPINGID,
    ADD_HISTORY
} from "./mutation-types"
import {getStore,setStore} from "../common/js/util";

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
    }
}
