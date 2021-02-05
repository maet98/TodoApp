<template>
  <div class="bg-red-600 w-full h-screen text-white">
      <div class="flex size border-b border-black">
          <h3 class="col-span-3">Pomofocus</h3>
          <button class="col">Report</button>
          <button class="col">Setting</button>
          <button class="col">Login</button>
      </div>
      <div class="grid justify-items-center gap-4 mt-4">
          <div class="bg-red-500 text-white size text-center rounded-xl">
              <div class="grid grid-cols-3 justify-center p-4">
                  <button class="text-lg">Pomodoro</button>
                  <button class="text-lg">Long Break</button>
                  <button class="text-lg">Short Break</button>
              </div>
              <h1 class="text-4xl">Pomodoro </h1>
              <h1 class="text-5xl text-bold">{{ time }}</h1>
              <button class="text-xl text-red-500 w-1/2 py-3 m-4 font-bold bg-white rounded-md shadow-md" @click="active = !active">{{buttonLabel}}</button>
          </div>
          <p>Time to work!</p>
          <div class="border-b-2 size">
              <p class="text-lg text-bold">Todo List:</p>
          </div>
          <div v-for="todo in list" class="size bg-white text-black border-l-8 border-black p-3 rounded-md" :key="todo.id" @blur="todo.selected = false">
              <p class="" @click="todo.selected = true" v-if="!todo.selected">
                {{ todo.content }}
              </p>
              <input v-model="todo.content" @mouseleave="todo.selected = false" @keypress.enter="todo.selected = false" v-else/>
          </div>
          <div v-if="!newTodo" class="size text-center p-2 text-lg text-white text-bold border-2 border-white border-dashed opacity-50 hover:opacity-75" @click="newTodo = true">
              + Add Task
          </div>
          <input v-model="value" v-else @keyup.enter="add(value)"/>
      </div>
  </div>
</template>

<script>
let times = {
    short: 300,
    long: 900,
    pomo: 1500
};

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
    data() {
        return {
            newTodo: false,
            active: false,
            value: "",
            seconds: times.pomo,
            list : [
            {
                id: 1,
                content: "Prueba 1",
                selected: false
            },
            {
                id: 2,
                content: "Prueba 2",
                selected: false
            }
            ]
        }
    },
    created() {
        this.interval = setInterval(() =>{
            if(this.active) {
                this.seconds--
            }
        }, 1000);
    },
    methods: {
        add(todo) {
            this.list.push({
                id: this.list.length + 1,
                content: todo,
                selected: false
            });
            this.value = "";
            this.newTodo = false;
        },
        restart() {
            this.seconds = times.pomo;
            this.active = false;
        },
        notify() {
            new Notification("hi there").show()
        }
    },
    computed: {
        time() {
            return parseInt(this.seconds/60) + ":" + this.seconds%60
        },
        buttonLabel() {
            return this.active ? 'Stop' : 'Start';
        }
    }
}
</script>

<style scoped>
.size {
    width: 480px;
}

@media only screen and (max-width: 600px) {
    .size {
        width: 350;
    }
}
</style>
