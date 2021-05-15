<template>
  <div>
    <v-layout row wrap justify-center class="my-5">
      <h1 class="heading primary--text">
        Impfungen
      </h1>
    </v-layout>
    <v-layout
      column
      justify-center
      align-center
    >
      <v-data-table
        :headers="headers"
        :items="impfungen"
        :items-per-page="15"
        class="elevation-1"
        sort-desc
        sort-by="date"
        :loading="impfungen.length === 0"
      >
        <template v-slot:item.date="{ item }">
          {{ $moment(item.date).format("dddd, DD. MMMM YYYY") }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-layout>
    <ImpfungEditDialog new-record />
  </div>
</template>

<script>
import ImpfungEditDialog from "../components/ImpfungEditDialog";
export default {
  name: "Impfungen",
  components: {ImpfungEditDialog},
  data () {
    return {
      headers: [
        { text: 'Datum', align: 'start', sortable: true, value: 'date' },
        { text: 'BioNTech-Pfizer', align: 'center', sortable: false, value: 'biontech' },
        { text: 'Johnson & Johnson', align: 'center', sortable: false, value: 'jandj' },
        { text: 'Modern', align: 'center', sortable: false, value: 'moderna' },
        { text: 'AstraZeneca', align: 'center', sortable: false, value: 'astrazeneca' },
        { text: '', align: 'center', sortable: false, value: 'actions' }
      ]
    }
  },
  computed: {
    impfungen () {
      return this.$store.getters["impfungen/all"]
    }
  }
}
</script>

<style scoped>

</style>
