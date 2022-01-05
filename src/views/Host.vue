<template>
  <div class="container" style="max-width: 1000px">
    <!-- Heading -->
    <button class="btn btn-secondary" @click=logout()>Back</button>
    <h1 class="text-center">ToDo list</h1>


    <!-- Task table -->
    <!-- https://getbootstrap.com/docs/4.0/content/tables/ -->
    <table class="table table-bordered mt-5">
      <thead>
      <tr>
        <th scope="col">Task</th>
        <th scope="col" style="width: 120px">Status</th>
        <th scope="col" class="text-center">Creation date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(task, index) in tasks" :key="index">
        <td>
            <span :class="{ 'line-through': task.status === 'finished' }">
              {{ task.name }}
            </span>
        </td>
        <td>
            <span
                class="pointer noselect"
                :class="{
                'text-success': task.status === 'finished',
                'text-danger': task.status === 'in-progress',
              }"
            >
              {{ (task.status) }}
            </span>
        </td>


        <td class="text-center">
            <span class="text-center"
            > {{ (task.creation_date) }}
            </span>
        </td>

      </tr>

      </tbody>
    </table>
    <button class="btn btn-primary"  @click="displayComplete()">
      Complete
    </button>
    <button class="btn btn-primary" @click="displayInComplete()">
      InComplete
    </button>
    <button class="btn btn-primary" @click="displayAllTasks()">
      AllTask
    </button>
    <button class="btn btn-primary" id="button-export" @click="saveFile()">
      Export
    </button>
  </div>
</template>

<script>



export default {
  name: "Host",
  props: {
    msg: String,
  },


  data() {
    return {
      task: "",
      editedTask: null,
      statuses: ["in-progress", "finished"],
      /* Status could be:  'in-progress' / 'finished' */
      creation_date : Date,
      completeTasks : [],
      InCompleteTasks :[],
      tmpArray :[],
      tasks: [
        {
          name: "Steal bananas from the supermarket.",
          status: "in-progress",
        },
        {
          name: "Eat 1 kg chocolate in 1 hour.",
          status: "in-progress",
        },
        {
          name: "Create YouTube video.",
          status: "finished",
        },
      ],
    };
  },

    mounted(){
      if (localStorage.getItem("tasks")){
        this.tasks = JSON.parse(localStorage.getItem("tasks"))
      }
    },
    watch: {
      tasks: {
        handler() {
          localStorage.setItem('tasks',JSON.stringify(this.tasks))
        },
        deep: true
      }
    },



  methods: {

    filterr(){

      this.uniteTasks();
      for (let i=0; i<this.tasks.length; i++){
        if(this.tasks[i].status === "finished" && this.tasks[i] !== null) {
          this.completeTasks.push(this.tasks[i]);
        }
        else if(this.tasks[i].status === "in-progress" && this.tasks[i] !== null) {
          this.InCompleteTasks.push(this.tasks[i]);
        }
      }

      if(this.completeTasks.length ===0){
        this.completeTasks =[];
      }
      if(this.InCompleteTasks.length ===0){
        this.InCompleteTasks =[];
      }
    },


    displayComplete(){
      //if(this.completeTasks.length === 0) {}
      this.filterr();
      this.tasks=this.completeTasks;

    },

    displayInComplete(){
      this.filterr();

      this.tasks=this.InCompleteTasks;
    },

    uniteTasks(){
      if(this.completeTasks.length !==0 && this.InCompleteTasks.length !==0 ){
        this.tasks=[];
        this.tasks= this.tasks.concat(this.completeTasks, this.InCompleteTasks);
        this.completeTasks = [];
        this.InCompleteTasks = [];
      }else if(this.completeTasks.length !==0){
        this.tasks= this.tasks.concat(this.completeTasks);
        this.completeTasks = [];
      }else if(this.InCompleteTasks.length !==0){
        this.tasks= this.tasks.concat(this.InCompleteTasks);
        this.InCompleteTasks = [];
      }
    },
    displayAllTasks(){
      this.uniteTasks();

    },

    saveFile: function() {


      const data = JSON.stringify(this.tasks)
      const blob = new Blob([data], {
        type: 'text/plain'
      })
      const e = document.createEvent('MouseEvents'),
          a = document.createElement('a');
      a.download = "tasks.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);

      let route = this.$router.resolve({ path: "/jsonData" });
      window.open(route.href);

    },
    logout(){
      this.$router.push('./Login');
      this.$store.state.userLogged = false;
    }

  },
};

</script>

<style scoped>
/* npm install --save-dev @fortawesome/fontawesome-free */

.line-through {
  text-decoration: line-through;
}
.btn-primary{
  margin-right: 40px;
}
</style>