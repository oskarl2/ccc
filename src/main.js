import Vue from 'vue'
import App from './App.vue'
import components from './components/components.js'

Object.keys(components).forEach(k => {
  Vue.component(k, components[k]);
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
