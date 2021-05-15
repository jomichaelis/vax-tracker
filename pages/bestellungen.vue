<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-row>
      <v-col v-for="i in 4" :key="i" cols="12" sm="6" lg="3">
        <Card/>
      </v-col>
    </v-row>
  </v-layout>
</template>
<script>
import Card from "../components/Card";
export default {
  name: "Bestellungen",
  components: {Card}
}
</script>
