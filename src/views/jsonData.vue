<template>
  <div class="container" style="max-width: 1000px">
  </div>
</template>

<script>
export default {
  name: "jsonData",
  data() {
    return {

    };
  },


  methods:{

    myFunctionOnLoad: function() {
        document.write(JSON.stringify(JSON.parse(localStorage.getItem("tasks"))));
        console.log(localStorage.getItem("tasks"));

    }
  },
  created: function(){
    //this.myFunctionOnLoad()
    document.write(JSON.stringify(JSON.parse(localStorage.getItem("tasks"))));
    console.log(localStorage.getItem("tasks"));
  }

};

/*
const data = JSON.stringify(this.tasks);
window.localStorage.setItem('tasks', data);
console.log(JSON.parse(window.localStorage.getItem('tasks')));
document.write('heelo');
 */

</script>

<style scoped>

</style>