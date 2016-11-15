<template>
  <tr>
    <td>{{ entry['Entries']  }}</td>
    <td>{{ entry['Run time'] }}</td>
    <td>
        {{ entry['Tags'] }}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'tag-entry',
  props: ['entry'],

  computed: {
    runTime () {
      return Math.round((this.entry[1] - this.entry[0]) / 60)
    }
  },

  methods: {
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
