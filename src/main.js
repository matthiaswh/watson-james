import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'

import App from './App'

Vue.use(VueLocalStorage)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
