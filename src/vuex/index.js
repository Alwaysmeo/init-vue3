import { createStore } from 'vuex'
import state from './module/state.js'
import getters from './module/getters.js'
import mutations from './module/mutations.js'
import actions from './module/actions.js'

export default createStore({
    namespaced: true,
    strict: true,
    modules: {
        state,
        getters,
        mutations,
        actions,
    },
})
