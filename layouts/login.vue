<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters['user/uid']
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.replace('/')
      }
    }
  }
}
</script>

<style scoped>
</style>
