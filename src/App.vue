<template>
  <div id="app">
    
    <time-table></time-table>
  </div>
</template>

<script>
import TimeTable from './components/TimeTable.vue'

export default {
  name: 'app',
  components: {
    TimeTable
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
