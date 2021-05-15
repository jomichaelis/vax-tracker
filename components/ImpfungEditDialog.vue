<template>
  <div class="impfungeditdialog">
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="editedRecord.date" label="Datum" />
              </v-col>
              <v-col cols="12">
                <v-text-field type="number" v-model="editedRecord.biontech" label="Biontech & Pfizer" />
              </v-col>
              <v-col cols="12">
                <v-text-field type="number" v-model="editedRecord.jandj" label="Johnson & Johnson" />
              </v-col>
              <v-col cols="12">
                <v-text-field type="number" v-model="editedRecord.moderna" label="Moderna" />
              </v-col>
              <v-col cols="12">
                <v-text-field type="number" v-model="editedRecord.astrazeneca" label="AstraZeneca" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="close">
            Abbrechen
          </v-btn>
          <v-btn color="primary" text @click="save">
            Speichern
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn
      v-if="newRecord"
      color="primary"
      fab
      dark
      fixed
      bottom
      right
      @click="dialog = !dialog"
    >
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
    <v-btn
      v-if="!newRecord"
      icon
      @click="dialog = !dialog"
    >
      <v-icon>
        mdi-pencil
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "ImpfungEditDialog",
  props: {
    newRecord: {
      type: Boolean,
      default: true
    },
    impfungID: {
      type: String,
      default: ''
    },
    record: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      dialog: false,
      editedRecord: {
        date: '',
        biontech: 0,
        jandj: 0,
        moderna: 0,
        astrazeneca: 0
      }
    }
  },
  computed: {
    formTitle () {
      return this.newRecord ? 'Neuer Eintrag' : 'Eintrag bearbeiten'
    },
    isValid () {
      return (this.editedRecord.date !== '')
    }
  },
  mounted () {
    if (!this.newRecord) {
      this.editedRecord.date = this.record.date
      this.editedRecord.biontech = this.record.biontech
      this.editedRecord.jandj = this.record.jandj
      this.editedRecord.moderna = this.record.moderna
      this.editedRecord.astrazeneca = this.record.astrazeneca
    }
  },
  methods: {
    close () {
      this.dialog = false
    },
    async save () {
      if (this.newRecord) {
        if (this.isValid) {
          // await this.$store.dispatch('brauaktionen/createBrauaktion', { id: this.idByDate(this.editedAktion.date), brauaktion: this.editedAktion })
          this.initForm()
        } else {
          // this.$toast.warning('Bitte fülle alle Felder aus.')
          return
        }
      } else {
        const confirmation = await this.$dialog.warning({
          text: 'Bist du sicher?',
          title: 'Eintrag bearbeiten',
          icon: 'mdi-pencil',
          actions: {
            false: 'Nein',
            true: {
              text: 'Ja',
              color: 'warning'
            }
          }
        })
        if (confirmation) {
          /*
          const newData = { title: this.editedEntry.title, description: this.editedEntry.description, date: this.editedEntry.date }
          db.collection('brauaktionen').doc(this.brauaktion).collection('ablauf').doc(this.entry.id).set(newData).then(() => {
            this.$toast.success('Eintrag wurde erstellt.')
          }).catch((error) => {
            this.$toast.error('Fehler beim Erstellen des Eintrags: ' + error)
          })
           */
        }
      }
      this.close()
    },
    initForm () {
      this.editedRecord.date = ''
      this.editedRecord.biontech = 0
      this.editedRecord.jandj = 0
      this.editedRecord.moderna = 0
      this.editedRecord.astrazeneca = 0
    },
    idByDate (date) {
      return date.substr(0, 10)
    }
  }
}
</script>
