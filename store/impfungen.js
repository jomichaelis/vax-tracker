import { firestoreAction } from 'vuexfire'

export const state = () => ({
  impfungen: []
})

export const getters = {
  all: (state) => {
    return state.impfungen
  },
  byID: (state) => {
    return id => state.impfungen.find(impfung => impfung.id === id)
  },
  byDate: (state) => {
    return isoDate => state.impfungen.find(impfung => impfung.date === isoDate)
  }
}

export const mutations = {}

export const actions = {
  bindImpfungen: firestoreAction(function ({ bindFirestoreRef }) {
    return bindFirestoreRef('impfungen',
      this.$fire.firestore.collection('user/'+this.$fire.auth.currentUser.uid+'/impfungen').orderBy('date')
    )
  }),
  unbindImpfungen: firestoreAction(({ unbindFirestoreRef }) => {
    return unbindFirestoreRef('impfungen')
  }),
  createImpfung (context, payload) {
    this.$fire.firestore.collection('user/'+this.$fire.auth.currentUser.uid+'/impfungen').add(payload).then(() => {
      // this.$toast.success('Gottesdienst wurde erstellt.')
    }).catch((error) => {
      // this.$toast.error('Fehler beim Erstellen des Gottesdienstes: ' + error)
    })
  },
  editImpfung (context, payload) {
    this.$fire.firestore.collection('user/'+this.$fire.auth.currentUser.uid+'/impfungen').doc(payload.id).update(payload.impfung).then(() => {
      // this.$toast.success('Gottesdienst wurde bearbeitet.')
    }).catch((error) => {
      // this.$toast.error('Fehler beim Bearbeiten des Gottesdienstes: ' + error)
    })
  },
  deleteImpfung (context, impfungID) {
    this.$fire.firestore.collection('user/'+this.$fire.auth.currentUser.uid+'/impfungen').doc(impfungID).delete().then(() => {
      // this.$toast.success('Gottesdienst wurde gelöscht.')
    }).catch((error) => {
      // this.$toast.error('Fehler beim Löschen des Gottesdienstes: ' + error)
    })
  }
}
