<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      elevate-on-scroll
      clipped-left
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-img
        class="mx-2"
        src="/Vaccine-Icon.png"
        max-height="35"
        max-width="35"
        contain
      />
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <span class="title ml-3 mr-5">vax<span class="font-weight-light">.tracker</span></span>
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-menu
        bottom
        min-width="230px"
        rounded
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            small
            v-on="on"
            class="mr-1"
          >
            <v-avatar color="primary" size="35">
              <img v-if="currentUser.photoURL" :src="currentUser.photoURL" alt="profile"/>
              <span v-else class="white--text headline">{{ currentUser.displayName[0] }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="primary" class="mb-2">
                <img v-if="currentUser.photoURL" :src="currentUser.photoURL" alt="profile"/>
                <span v-else class="white--text headline">{{ currentUser.displayName[0] }}</span>
              </v-avatar>
              <h3>{{ currentUser.displayName }}</h3>
              <p class="caption mt-1">
                {{ sanitizedMail }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                to="/account"
              >
                Account
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                @click="signUserOut"
              >
                Abmelden
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-needle',
          title: 'Impfungen',
          to: '/impfungen'
        },
        {
          icon: 'mdi-package-variant-closed',
          title: 'Bestellungen',
          to: '/bestellungen'
        },
        {
          icon: 'mdi-cog',
          title: 'Einstellungen',
          to: '/einstellungen'
        }
      ],
      title: 'vax.tracker'
    }
  },
  computed: {
    currentUser() {
      return this.$fire.auth.currentUser
    },
    sanitizedMail() {
      return this.currentUser.email.length < 30 ? this.currentUser.email : (this.currentUser.email.slice(0,29) + '...')
    }
  },
  methods: {
    async signUserOut () {
      await this.$store.dispatch('user/signUserOut')
        .then(() => {
          this.$router.push('/login')
        })
    },
    editAccount () {
      console.log(this.$fire.auth.currentUser)
    }
  }
}
</script>
