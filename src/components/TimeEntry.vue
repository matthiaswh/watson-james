<template>
  <tr>
    <td>{{ showDate(entry['Date'])  }}</td>
    <td>{{ showTime(entry['Start time']) }}</td>
    <td>{{ showTime(entry['End time']) }}</td>
    <td>{{ entry['Run time'] }}</td>
    <td>{{ entry['Projects'] }}</td>
    <td v-if='entry["Tags"]'>
      <span v-for='(tag, index) in entry["Tags"]'>
        {{ tag }}
      </span>
    </td>
    <td style='width: 25%'>{{ entry['Message'] }}</td>
  </tr>
</template>

<script>
import moment from 'moment'

export default {
  name: 'time-entry',
  props: ['entry'],

  computed: {
    date () {
      let d = new Date(this.entry[0] * 1000)
      return moment(d).format('YYYY-MM-DD')
    },

    runTime () {
      return Math.round((this.entry[1] - this.entry[0]) / 60)
    }
  },

  methods: {
    dTime (t) {
      return moment(t * 1000).format('HH:mm')
    },

    showDate (d) {
      return moment(d).format('YYYY-MM-DD')
    },

    showTime (t) {
      return moment(t).format('HH:mm')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
