<template>
  <v-dialog v-model="display" width="340">
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="dateForShow"
        v-bind="textFieldProps"
        :label="label"
        :value="formattedDatetime"
        :prepend-icon="icon"
        readonly
        v-on="on"
      />
    </template>

    <v-card>
      <v-card-text class="px-0 py-0">
        <v-tabs v-model="activeTab" fixed-tabs>
          <v-tab key="calendar">
            <slot name="dateIcon">
              <v-icon>
                mdi-calendar
              </v-icon>
            </slot>
          </v-tab>
          <v-tab key="timer" :disabled="dateSelected">
            <slot name="timeIcon">
              <v-icon>
                mdi-clock
              </v-icon>
            </slot>
          </v-tab>
          <v-tab-item key="calendar">
            <v-date-picker
              v-model="date"
              v-bind="datePickerProps"
              full-width
              locale="de"
              first-day-of-week="1"
              @input="showTimePicker"
            />
          </v-tab-item>
          <v-tab-item key="timer">
            <v-time-picker
              ref="timer"
              v-model="time"
              class="v-time-picker-custom"
              v-bind="timePickerProps"
              full-width
              format="24hr"
              locale="de"
            />
          </v-tab-item>
        </v-tabs>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <slot name="actions" :parent="this">
          <v-btn text @click.native="clearHandler">
            {{ clearText }}
          </v-btn>
          <v-btn color="primary" text @click="okHandler">
            {{ okText }}
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'

const DEFAULT_DATE = moment(new Date()).format('YYYY-MM-DD')
const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'
const DEFAULT_CLEAR_TEXT = 'Schließen'
const DEFAULT_OK_TEXT = 'OK'

export default {
  name: "DatePicker",
  model: {
    prop: 'date',
    event: 'input'
  },
  props: {
    date: {
      type: [Date, String],
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'mdi-calendar'
    },
    dateFormat: {
      type: String,
      default: DEFAULT_DATE_FORMAT
    },
    clearText: {
      type: String,
      default: DEFAULT_CLEAR_TEXT
    },
    okText: {
      type: String,
      default: DEFAULT_OK_TEXT
    },
    textFieldProps: {
      type: Object,
      default: null
    },
    datePickerProps: {
      type: Object,
      default: null
    },
  },
  data () {
    return {
      display: false,
      date: DEFAULT_DATE
    }
  },
  computed: {
    formattedDatetime () {
      return this.selectedDate ? moment(this.selectedDate).format(this.dateFormat) : ''
    },
    selectedDate () {
      if (this.date) {
        let dateString = this.date
        return moment(dateString).format(DEFAULT_DATE_FORMAT)
      } else {
        return null
      }
    },
    dateSelected () {
      return !this.date
    },
    dateForShow () {
      return this.formatForShow()
    }
  },
  watch: {
    date: () => {
      // this.init()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (!this.date) {
        return
      }
      let initDate
      if (typeof this.date === 'string' || this.date instanceof String) {
        initDate = moment(this.date)
      }
      this.date = moment(initDate).format(DEFAULT_DATE_FORMAT)
    },
    okHandler () {
      this.resetPicker()
      this.$emit('input', this.selectedDate)
    },
    clearHandler () {
      this.resetPicker()
      this.date = DEFAULT_DATE
      this.$emit('input', null)
    },
    resetPicker () {
      this.display = false
      this.activeTab = 0
      if (this.$refs.timer) {
        this.$refs.timer.selectingHour = true
      }
    },
    showTimePicker () {
      this.activeTab = 1
    },
    formatForShow () {
      return moment(this.date).format('dddd, DD. MMMM YYYY')
    }
  }
}
</script>
