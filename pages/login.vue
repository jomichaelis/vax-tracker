<template>
  <v-app
    style="
    background: #0D518C;
    background: -webkit-linear-gradient(to top, #0D518C, #72CEF2);
    background: linear-gradient(to top, #0D518C, #72CEF2);"
  >
    <v-container
      class="fill-height "
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="6"
          lg="3"
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-img
              class="mx-2"
              src="/Vaccine-Icon.png"
              max-height="100"
              max-width="100"
              contain
            />
          </v-row>
          <v-container style="height: 50px;" />
          <v-row
            align="center"
            justify="center"
          >
            <span class="text-h3 white--text">vax<span class="font-weight-light">.tracker</span></span>
          </v-row>
          <v-container style="height: 50px;" />
          <v-card v-if="state==='login'" class="elevation-12 mb-5">
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>Anmelden</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="onSignin">
                <v-text-field
                  id="email"
                  v-model="email"
                  name="email"
                  label="E-Mail"
                  type="email"
                  required
                />
                <v-text-field
                  id="password"
                  v-model="password"
                  name="password"
                  label="Passwort"
                  type="password"
                  required
                />
                <v-row class="mb-1">
                  <v-col style="padding-bottom: 0;">
                    <v-btn color="primary" type="submit" :loading="loading">
                      Login
                    </v-btn>
                  </v-col>
                  <v-col style="padding-bottom: 0;" class="d-flex align-center justify-end">
                    <v-btn text color="primary" x-small @click="state='pw-reset'">
                      Passwort vergessen?
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
          <v-card v-if="state==='pw-reset'" class="elevation-12 mb-5">
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>Passwort zurücksetzen</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="onResetPW">
                <v-text-field
                  id="email"
                  v-model="email"
                  name="email"
                  label="E-Mail"
                  type="email"
                  required
                />
                <v-row class="mb-1">
                  <v-col style="padding-bottom: 0;">
                    <v-btn color="primary" type="submit" :loading="loading">
                      Zurücksetzen
                    </v-btn>
                  </v-col>
                  <v-col style="padding-bottom: 0;" class="d-flex align-center justify-end">
                    <v-btn text color="primary" x-small @click="state='login'">
                      Zurück zum Login
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
          <v-container style="height: 50px;" />
        </v-col>
      </v-row>
      <v-footer
        dark
        absolute
        color="#0D518C"
        style="border-top: 1px solid #c2c2c2"
      >
        <v-col
          class="text-center py-1"
          cols="12"
        >
          &copy; {{ new Date().getFullYear() }} — <a href="http://jomichaelis.de" target="_blank"> Impressum</a>
        </v-col>
      </v-footer>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'login',
  data () {
    return {
      email: '',
      password: '',
      state: 'login',
      loading: false
    }
  },
  computed: {
    errorMsg () {
      return this.$store.getters['user/loginError']
    },
    successMsg () {
      return this.$store.getters['user/loginSuccess']
    }
  },
  watch: {
    errorMsg (error) {
      this.$toast.error('Fehler bei der Anmeldung: ' + error, { position: 'bottom-center' })
      this.$store.commit('setLoginError', '')
    },
    successMsg (msg) {
      this.$toast.success(msg, { position: 'bottom-center' })
      this.$store.commit('setLoginSuccess', '')
    }
  },
  methods: {
    async onSignin () {
      this.loading = true
      await this.$store.dispatch('user/signUserIn', {
        email: this.email,
        password: this.password
      }).then(() => {
        this.loading = false
        this.$router.push('/')
      })
    },
    onResetPW () {
      this.$store.dispatch('user/resetPW', {
        email: this.email
      })
    }
  }
}
</script>

<style scoped>

a {
  color: white !important;
  text-decoration: none;
}

</style>
