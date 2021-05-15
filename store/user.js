import 'firebase/auth'

export const state = () => ({
  authUser: null,
  loginError: '',
  loginSuccess: ''
})

export const getters = {
  authUser: (state) => {
    return state.authUser
  },
  loginError: (state) => {
    return state.loginError
  },
  loginSuccess: (state) => {
    return state.loginSuccess
  }
}

export const mutations = {
  setAuthUser (state, payload) {
    state.authUser = payload
  },
  setLoginError (state, payload) {
    state.loginError = payload
  },
  setLoginSuccess (state, payload) {
    state.loginSuccess = payload
  }
}

export const actions = {
  async signUserIn ({ commit }, payload) {
    try {
      await this.$fire.auth.signInWithEmailAndPassword(payload.email, payload.password)
    } catch (error) {
      console.error('Login-error', error)
    }
  },

  async signUserOut ({ commit }) {
    try {
      await this.$fire.auth.signOut()
      commit('setAuthUser', null)
      //TODO: reset store completely
    } catch (error) {
      commit('setError', error)
    }
  },

  resetPW ({ commit }, payload) {
    this.$fire.auth.sendPasswordResetEmail(payload.email).then(() => {
      commit('setLoginSuccess', 'E-Mail wurde gesendet.')
    }).catch((error) => {
      commit('setLoginError', error)
    })
  }
}
