<template>
  <div>
    <v-layout row wrap justify-center class="my-5">
      <h1 class="heading primary--text">
        Einstellungen
      </h1>
    </v-layout>
    <v-layout
      column
      justify-center
      align-center
    >
      <v-container fluid>
        <v-row align="center">
          <v-col
            cols="12"
            sm="6"
          >
            <v-subheader v-text="'Eingesetzte Impfstoffe'"></v-subheader>
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <v-select
              v-model="e6"
              :items="impfstoffe"
              label="Auswählen"
              multiple
              chips
              persistent-hint
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "einstellungen",
  data() {
    return {
      e6: [],
      impfstoffe: [
        'BioNTech-Pfizer', 'Johnson & Johnson', 'Moderna', 'AstraZeneca'
      ],
    }
  }
}
</script>

<style scoped>

</style>
