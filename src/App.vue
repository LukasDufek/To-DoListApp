<template>
  <div id="app">
    <main><router-view /></main>

    <myFooter></myFooter>
  </div>
</template>

<script>
import myFooter from './components/myFooter.vue'

export default {
  name: 'App',
  components: {
    myFooter,

  }
}
</script>


