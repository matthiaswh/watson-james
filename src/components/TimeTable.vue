<template>
  <div class='container'>
    <h1 class='title is-1'>Watson</h1>
    <h2></h2>

    <p class="control">
      <a
        class="button is-primary"
        @click='loadSampleData()'
      >Load sample data</a>
    </p>

    <p class="control">
      <input
        class='input'
        v-model='filterKey'
        placeholder='filter'
      >
    </p>

    <p class="control">
      <flatpickr v-model='startDate' @update='updateStartDate'></flatpickr>
    </p>

    <p class="control">
      <flatpickr v-model='endDate' @update='updateEndDate'></flatpickr>
    </p>
    
    <table class='table is-bordered is-striped'>
      <thead>
        <tr>
          <th
            v-for='c in columns'
            @click="sortBy(c)"
            :class="{ active: sortKey == c }"
          >
            {{ c }}
            <span class="arrow" :class="sortOrders[c] > 0 ? 'asc' : 'dsc'">
          </th>
        </tr>
      </thead>
      <tbody>
        <time-entry
          v-for='entry in filteredData'
          :entry='entry'
        ></time-entry>
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td></td>
          <td>Total time:</td>
          <td>{{ totalTime }} hours</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'
import Flatpickr from 'vue-flatpickr/vue-flatpickr-default.vue'

import TimeEntry from './TimeEntry.vue'
import rawData from '../../sample-data/data'

export default {
  name: 'time_table',
  data () {
    let columns = [
      'Date',
      'Start time',
      'End time',
      'Run time',
      'Projects',
      'Tags'
    ]
    let searchColumns = [
      'Projects', 'Tags'
    ]
    let sortOrders = {}
    columns.forEach(function (key) {
      sortOrders[key] = 1
    })

    return {
      data: [],
      columns: columns,
      searchColumns: searchColumns,
      sortOrders: sortOrders,
      sortKey: '',
      filterKey: '',
      startDate: null, // null
      endDate: null
    }
  },

  components: {
    'time-entry': TimeEntry,
    'flatpickr': Flatpickr
  },

  computed: {

    filteredData () {
      let data = this.data
      let sortKey = this.sortKey
      let searchColumns = this.searchColumns
      let filterKey = this.filterKey && this.filterKey.toLowerCase()
      let order = this.sortOrders[sortKey] || 1

      if (filterKey) {
        data = data.filter((row) => {
          return _.keys(row).some((key) => {
            return _.includes(searchColumns, key) && String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }

      if (sortKey) {
        data = data.slice().sort((a, b) => {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }

      if (this.startDate) {
        let startDate = this.startDate
        data = _.filter(data, (o) => {
          return o['Date'] > startDate
        })
      }

      if (this.endDate) {
        let endDate = this.endDate
        data = _.filter(data, (o) => {
          return o['Date'] <= moment(endDate).add(1, 'd').toDate() // set to midnight, so move to midnight the next day
        })
      }

      return data
    },

    totalTime () {
      if (!this.filteredData) return 0

      let t = 0
      for (let i = 0; i < this.filteredData.length; i++) {
        t += this.filteredData[i]['Run time']
      }
      return (t / 60).toFixed(1)
    },

    showDate (d) {
      return moment(d).format('YYYY-MM-DD')
    },

    showTime (t) {
      return moment(t).format('HH:mm')
    }
  },

  methods: {
    sortBy (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },

    processData (data) {
      let processedData = []

      for (let i = 0; i < data.length; i++) {
        processedData.push({
          'Date': new Date(data[i][0] * 1000),
          'Start time': new Date(data[i][0] * 1000),
          'End time': new Date(data[i][1] * 1000),
          'Run time': Math.round((data[i][1] - data[i][0]) / 60),
          'Projects': data[i][2],
          'Id': data[i][3],
          'Tags': data[i][4]
        })
      }

      return processedData
    },

    loadSampleData () {
      this.data = this.processData(rawData)
    },

    updateStartDate (val) {
      this.startDate = moment(val).toDate()
    },

    updateEndDate (val) {
      this.endDate = moment(val).toDate()
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
th.active {
  background: #ff0000;
}
.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>