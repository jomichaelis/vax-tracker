export default (context) => {
  const { store } = context

  return new Promise((resolve, reject) => {
    context.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        return resolve(
          store.commit('user/setAuthUser', {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          })
        )
      }
      return resolve()
    })
  })
}
