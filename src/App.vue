<template>
  <div id="app">
    
    <time-table></time-table>
  </div>
</template>

<script>
import Hello from './components/Hello'
import TimeTable from './components/TimeTable.vue'

export default {
  name: 'app',
  components: {
    Hello,
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
