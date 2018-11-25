import {
    RECORD_USERINFO,
    RECORD_SHIPPINGID,
    ADD_HISTORY,
    RECORD_FOLLOW,
    RECORE_FOOT
} from "./mutation-types"
import {setStore} from "../common/js/util";

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
    }
}
