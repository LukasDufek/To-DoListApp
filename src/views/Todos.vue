<template>
  <div class="container" v-if="this.$store.state.userLogged" style="max-width: 1000px">
    <!-- Heading -->
      <h3>Welcome Admin</h3>
    <button class="btn btn-secondary" @click=logout()>Logout</button>
    <h1 class="text-center">ToDo list</h1>

    <!-- Input -->
    <div class="d-flex mt-5">
      <input
          type="text"
          v-model="task"
          placeholder="Enter task"
          class="w-100 form-control"
      />
      <button class="btn btn-warning rounded-0" @click="submitTask">
        SUBMIT
      </button>
    </div>

    <!-- Task table -->
   <!-- https://getbootstrap.com/docs/4.0/content/tables/ -->
    <table class="table table-bordered mt-5">
      <thead>
      <tr>
        <th scope="col">Task</th>
        <th scope="col" style="width: 120px">Status</th>
        <th scope="col" class="text-center">Creation date</th>
        <th scope="col" class="text-center">Remove</th>
        <th scope="col" class="text-center">Edit</th>
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
                @click="changeStatus(index)"
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

        <td class="text-center">
          <div @click="deleteTask(index)">
            <span class="fa fa-trash pointer"></span>
          </div>
        </td>
        <td class="text-center">
          <div @click="editTask(index)">
            <p class="fa fa-pen pointer"></p>
          </div>
        </td>
      </tr>


      </tbody>
    </table>
    <button class="btn btn-primary" @click="displayComplete()">
      Complete
    </button>
    <button class="btn btn-primary" @click="displayInComplete()">
      InComplete
    </button>
    <button class="btn btn-primary" @click="displayAllTasks()">
      AllTask
    </button>
    <button class="btn btn-primary" @click="saveFile()">
      Export
    </button>
  </div>
  <div class="else" v-else>
    <h1 class="logggout">You are not logged in</h1>
    <button class="button-back" @click="logout()">
      Back
    </button>
  </div>


</template>

<script>

export default {
  name: "Todos",
  props: {
    msg: String,
  },


  data() {
    return {
      task: "",
      editedTask: null,
      /* Status could be:  'in-progress' / 'finished' */
      statuses: ["in-progress", "finished"],
      creation_date : Date,
      completeTasks : [],
      InCompleteTasks :[],
      tmpArray :[],
      tasks: [
        {
          name: "Default task #1.",
          status: "in-progress",
        },
        {
          name: "Default task #2.",
          status: "in-progress",
        },
        {
          name: "Default task #3.",
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


    /**
     * Change status of task by index
     */
    changeStatus(index) {

      let newIndex = this.statuses.indexOf(this.tasks[index].status);
      if (++newIndex > 1) newIndex = 0;
      this.tasks[index].status = this.statuses[newIndex];
    },

    /**
     * Deletes task by index
     */
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },

    /**
     * Edit task
     */
    editTask(index) {
      this.task = this.tasks[index].name;
      this.editedTask = index;
    },

    /**
     * Add / Update task
     */
    submitTask() {
      if (this.task.length === 0) return;

      /* We need to update the task */
      if (this.editedTask != null) {
        this.tasks[this.editedTask].name = this.task;
        this.editedTask = null;
      } else {
        /* We need to add new task */
        const today = new Date();
        const date = today.getDate()+'.'+(today.getMonth()+1)+'.'+ today.getFullYear();

        this.tasks.push({
          name: this.task,
          status: "in-progress",
          creation_date : date
        });
      }

      this.task = "";
    },

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
      }else if(this.completeTasks.length !==0 && this.tasks !== this.completeTasks){
        this.tasks= this.tasks.concat(this.completeTasks);
        this.completeTasks = [];
      }else if(this.InCompleteTasks.length !==0 && this.tasks !==this.InCompleteTasks){
        this.tasks= this.tasks.concat(this.InCompleteTasks);
        this.InCompleteTasks = [];
      }

    },
    displayAllTasks(){
      /*
      this.tasks[0]={
        name: "Steal bananas from the supermarket.",
        status: "in-progress",
      };
      */
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
    },

  },
};

</script>

<style scoped>
/* npm install --save-dev @fortawesome/fontawesome-free */






.line-through {
  text-decoration: line-through;
}
.control-button{
  margin-right: 10px;
}
.else{
  /*text-align: center;  */
  border-width: 5px; border-style: solid; border-color: black;
  position: fixed;
  top: 15%;
  left: 15%;
  padding-left: 10px;
  padding-right: 10px;
}
.logggout{
  font-size: 100px;
}
.button-back{
  font-size: 50px;
  margin-bottom: 30px;
  margin-top: 100px;
  margin-left: 400px;
}
.btn-primary{
  margin-right: 40px;
}

</style>