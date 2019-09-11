<template>
  <div id="app">
    <workers-container></workers-container>
  </div>
</template>
<script>
import WorkersContainer from './containers/Workers/App.vue'

export default {
  name: 'app',
  components: {
    WorkersContainer,
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
