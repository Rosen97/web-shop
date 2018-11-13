import {
    RECORD_USERINFO,
    RECORD_SHIPPINGID
} from "./mutation-types"

export default {
    [RECORD_USERINFO](state, username) {
        state.loginName = username
    },
    [RECORD_SHIPPINGID](state, shippingId) {
        state.shippingId = shippingId
    }
}
