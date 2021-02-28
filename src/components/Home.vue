<template>
    <div :class="{'bg-green-800': active}" class="transition duration-1000 flex flex-col align-center bg-red-600 w-full h-screen text-white">
      <div class="flex self-center text-xl justify-between border-b border-black w-3/4 h-10">
          <div class="flex">
              <i class="fas fa-check-circle m-1"></i>
              <p class="font-bold col-span-3">Pomofocus</p>
          </div>
          <div>
              <button class="col">Report</button>
          </div>
          <div>
              <button class="col">Setting</button>
          </div>
          <div>
              <button class="col">Login</button>
          </div>
      </div>
      <div class="grid justify-items-center gap-4 mt-4">
          <div :class="{'bg-green-700': active}" class="transition duration-1000 bg-red-500 text-white size text-center rounded-xl">
              <div class="grid grid-cols-3 justify-center p-4">
                  <button class="text-lg" @click="seconds = 1500">Pomodoro</button>
                  <button class="text-lg" @click="seconds = 900">Long Break</button>
                  <button class="text-lg" @click="seconds = 300">Short Break</button>
              </div>
              <h1 class="text-4xl">Pomodoro </h1>
              <h1 class="text-5xl text-bold">{{ time }}</h1>
              <button class="text-xl text-red-500 w-1/2 py-3 m-4 font-bold bg-white rounded-md shadow-md" @click="active = !active">{{buttonLabel}}</button>
          </div>
          <p>Time to work!</p>
          <div class="border-b-2 size">
              <p class="text-lg text-bold">Todo List:</p>
          </div>
          <task v-for="item in list" :key="item.key" class="size" :todo="item" @todochange="update"/>
          <div v-if="!newTodo" class="size text-center p-2 text-lg text-white text-bold border-2 border-white border-dashed opacity-50 hover:opacity-75" @click="newTodo = true">
              + Add Task
          </div>
          <input v-model="value" v-else @keyup.enter="add(value)"/>

      </div>
  </div>
</template>

<script>
import Task from './task.vue';

let times = {
    short: 300,
    long: 900,
    pomo: 1500
};

export default {
  name: 'Home',
  components: {
      Task
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
                estimate: 1,
                selected: false
            },
            {
                id: 2,
                content: "Prueba 2",
                estimate: 2,
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
        update(value) {
            this.list[0] = value;
        },
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
        },
        padLeadingZeros(num, size) {
            var s = num+"";
            while (s.length < size) s = "0" + s;
            return s;
        }
    },
    computed: {
        time() {
            var minutes = parseInt(this.seconds /60)
            var seconds = this.seconds%60
            return this.padLeadingZeros(minutes,2) + ":" + this.padLeadingZeros(seconds, 2)
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
