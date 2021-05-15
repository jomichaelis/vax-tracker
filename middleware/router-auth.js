import 'firebase/auth'

export default function ({ app, store, redirect, route }) {
  // console.log(app.$fire.auth.currentUser)
  app.$fire.auth.onAuthStateChanged(function(user) {
    if (user) {
      store.dispatch('impfungen/bindImpfungen')
    }
    if (!user && route.name !== 'login') {
      redirect('/login')
    }
    else if (user && route.name === 'login') {
      redirect('/')
    }
  })

  /*
  // if ( !app.$fire.auth.currentUser && route.name !== 'login') {
  console.log(app.$fire.auth.currentUser)
  console.log(store.getters["user/authUser"])
  if ( !store.getters["user/authUser"] && route.name !== 'login') {
    redirect('/login')
  }
  if (route.name === 'login' && store.state.user.uid) {
    redirect('/')
  }
   */
}
