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
  async createImpfung (context, payload) {
    this.$fire.firestore.collection('user/'+this.$fire.auth.currentUser.uid+'/impfungen').doc(payload.date).set(payload).then(() => {
      this.$toast.success('Eintrag wurde erstellt.')
    }).catch((error) => {
      this.$toast.error('Fehler beim Erstellen des Eintrags: ' + error)
    })
  },
  editImpfung (context, payload) {
    this.$fire.firestore.collection('user/'+this.$fire.auth.currentUser.uid+'/impfungen').doc(payload.id).update(payload.impfung).then(() => {
      // this.$toast.success('Gottesdienst wurde bearbeitet.')
    }).catch((error) => {
      // this.$toast.error('Fehler beim Bearbeiten des Gottesdienstes: ' + error)
    })
  },
  async deleteImpfung (context, impfungID) {
    this.$fire.firestore.collection('user/'+this.$fire.auth.currentUser.uid+'/impfungen').doc(impfungID).delete().then(() => {
      this.$toast.success('Eintrag wurde gelöscht.')
    }).catch((error) => {
      this.$toast.error('Fehler beim Löschen des Eintrags: ' + error)
    })
  }
}
