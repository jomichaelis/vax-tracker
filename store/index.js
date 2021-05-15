import { vuexfireMutations } from 'vuexfire'

export const state = () => ({
  currentPageTitle: 'Dashboard',
  loading: false
})

export const mutations = {
  ...vuexfireMutations,
  setLoading (state, payload) {
    state.loading = payload
  }
}

export const getters = {
  currentPageTitle: (state) => {
    return state.currentPageTitle
  },
  loading: (state) => {
    return state.loading
  }
}

export const actions = {
  setLoading (context, payload) {
    context.commit('setLoading', payload)
  }
}
