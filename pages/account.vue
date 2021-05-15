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
                <img v-if="photoURL" :src="photoURL" alt="profile"/>
                <span v-else class="white--text headline">{{ this.name[0] }}</span>
              </v-avatar>
            </v-btn>
          </v-badge>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-btn
                depressed
                rounded
                text
              >
                Edit Account
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
              >
                Disconnect
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
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
              <v-text-field
                v-model="email"
                label="E-Mail"
                required
                disabled
              ></v-text-field>
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
      photoURL: null
    }
  },
  methods: {
    editAccount () {
      this.$fire.auth.currentUser.updateProfile({
        displayName: this.name,
        photoURL: "https://cdn.vuetifyjs.com/images/john.jpg"
      }).then(function() {
        console.log('worked')
        // Update successful.
      }).catch(function(error) {
        console.error(error)
        // An error happened.
      });
    },
    initializeForm () {
      console.log(this.$fire.auth.currentUser)
      this.name = this.$store.getters["user/authUser"].displayName
      this.email = this.$store.getters["user/authUser"].email
      this.photoURL = this.$store.getters["user/authUser"].photoURL
    }
  },
  beforeMount() {
    this.initializeForm()
  }
}
</script>

<style scoped>

</style>
