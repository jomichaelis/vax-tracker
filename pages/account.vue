<template>
  <div>
    <v-layout row wrap justify-center class="my-5">
      <h1 class="heading primary--text">
        Account
      </h1>
    </v-layout>
    <v-layout column justify-center align-center>
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-badge bottom bordered color="primary" icon="mdi-camera" overlap @click="initializeForm">
            <v-btn icon x-large v-on="on">
              <v-avatar color="primary" size="70">
                <div v-if="!loading">
                  <img v-if="photoURL" :src="photoURL" alt="profile"/>
                  <span v-else class="white--text headline">{{ name[0] }}</span>
                </div>
                <v-progress-circular
                  v-else
                  indeterminate
                  color="white"
                />
              </v-avatar>
            </v-btn>
          </v-badge>
        </template>
        <v-list>
          <v-list-item v-if="!this.photoURL" @click="$refs.uploader.$refs.input.click()">
            <v-list-item-title>Bild hinzufügen</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="this.photoURL" @click="$refs.uploader.$refs.input.click()">
            <v-list-item-title>Bild ersetzen</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="this.photoURL" @click="removeAccountImage">
            <v-list-item-title>Bild entfernen</v-list-item-title>
          </v-list-item>
          <v-file-input
            v-model="imageFile"
            accept="image/png, image/jpeg, image/bmp"
            class="d-none"
            type="file"
            ref="uploader"
            @change="onFileChanged"
          />
        </v-list>
      </v-menu>
      <v-container fluid class="mt-4">
        <v-form>
          <v-row class="d-flex justify-center">
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="name"
                label="Anzeigename"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">
                    <v-text-field
                      v-model="email"
                      label="E-Mail"
                      required
                      disabled
                    ></v-text-field>
                  </span>
                </template>
                <span>Die Mail-Adresse kann nicht geändert werden.</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
      <v-btn class="primary" @click="editAccount">
        Speichern
      </v-btn>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "account",
  data () {
    return {
      name: '',
      email: '',
      photoURL: null,
      imageFile: null,
      loading: false
    }
  },
  methods: {
    editAccount () {
      this.loading = true
      this.$fire.auth.currentUser.updateProfile({
        displayName: this.name
      }).then(async () => {
        this.loading = false
        await this.$toast.success('Einstellungen wurden gespeichert.')
      }).then( () => {
        setTimeout( () => {
          window.location.reload()
        }, 1000)
      }).catch(function(error) {
        this.loading = false
        this.$toast.success('Fehler beim Speichern der Einstellungen.')
      });
    },
    initializeForm () {
      this.name = this.$store.getters["user/authUser"].displayName
      this.email = this.$store.getters["user/authUser"].email
      this.photoURL = this.$store.getters["user/authUser"].photoURL
    },
    async removeAccountImage() {
      this.loading = true
      let me = this
      await this.$fire.auth.currentUser.updateProfile({
        photoURL: ''
      }).then(function() {
        me.loading = false
        me.$toast.success('Bild wurde erfolgreich entfernt.')
      }).then( () => {
        setTimeout( () => {
          window.location.reload()
        }, 1000)
      }).catch(function(error) {
        me.loading = false
        me.$toast.error('Fehler beim Entfernen des Bildes: ' + error )
      })
    },
    async onFileChanged(file) {
      this.loading = true
      let me = this
      const timestamp = Date.now()
      await this.$fire.storage.ref('user_' + `${this.currentUser.uid}/${timestamp}_${file.name}`).put(file)
        .then(async () => {
          await this.$fire.storage.ref('user_' + `${this.currentUser.uid}/${timestamp}_${file.name}`).getDownloadURL()
            .then(async (downloadURL) => {
              await this.$fire.auth.currentUser.updateProfile({
                photoURL: downloadURL
              }).then(async () => {
                me.loading = false
                me.imageFile = null
                await me.$toast.success('Bild wurde erfolgreich hochgeladen.')
              }).then( () => {
                setTimeout( () => {
                  window.location.reload()
                }, 1000)
              })
          })
        })
        .catch(function(error) {
          me.loading = false
          me.$toast.error('Fehler beim Hochladen des Bildes: ' + error )
        })
    }
  },
  computed: {
    currentUser() {
      return this.$fire.auth.currentUser
    }
  },
  beforeMount() {
    this.initializeForm()
  }
}
</script>

<style scoped>

</style>
