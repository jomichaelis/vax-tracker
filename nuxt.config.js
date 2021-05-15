import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'vax.tracker',
    title: 'vax.tracker',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/fireauth.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
    'vuetify-dialog/nuxt'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/firebase',
    'vue-toastification/nuxt'
  ],

  router: {
    middleware: ['router-auth']
  },

  moment: {
    defaultLocale: 'de',
    locales: ['de']
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#0D518C',
        },
        dark: {
          primary: '#0D518C',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  firebase: {
    config: {
      apiKey: "AIzaSyBBgqa-WqUkXyUKj8PPm0GYzR_YSB0Kzgg",
      authDomain: "jomichaelis-vax-tracker.firebaseapp.com",
      projectId: "jomichaelis-vax-tracker",
      storageBucket: "jomichaelis-vax-tracker.appspot.com",
      messagingSenderId: "862738423573",
      appId: "1:862738423573:web:891c8ddff7c3e2a6d3d31c",
      measurementId: "G-SM11211SYM"
    },
    services: {
      auth: true,
      firestore: true,
      storage: true,
      performance: true,
      analytics: true
    }
  },

  vuetifyDialog: {
    property: '$dialog',
    confirm: {
      actions: {
        false: 'Nein',
        true: {
          text: 'Ja',
          color: 'primary'
        }
      }
    },
    warning: {},
    error: {},
    prompt: {}
  },

  toast: {
    timeout: 3000,
    closeOnClick: false,
    position: 'bottom-right'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
