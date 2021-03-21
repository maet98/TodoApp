<template>
    <div :class="getColors" class="transition duration-1000 flex flex-col align-center w-full h-full text-white">
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
      <button @click="notification">Notify</button>
      <div class="grid justify-items-center gap-4 mt-4">
          <div :class="getLightColor" class="transition duration-1000  text-white size text-center rounded-xl">
              <div class="grid grid-cols-3 justify-center p-4">
                  <button class="text-lg" @click="changeTimer('pomo')">Pomodoro</button>
                  <button class="text-lg" @click="changeTimer('long')">Long Break</button>
                  <button class="text-lg" @click="changeTimer('short')">Short Break</button>
              </div>
              <h1 class="text-4xl">Pomodoro </h1>
              <h1 class="text-5xl text-bold">{{ time }}</h1>
              <button class="text-xl text-red-500 w-1/2 py-3 m-4 font-bold bg-white rounded-md shadow-md" @click="active = !active">{{buttonLabel}}</button>
          </div>
          <div>{{ getSelectedText }}</div>
          <div class="border-b-2 size">
              <p class="text-lg text-bold">Todo List:</p>
          </div>
          <div class="size" v-for="(item, index) in list" @click="selected = index" :key="item.key">
              <task :selected="index === selected" :todo="item" @todochange="update"/>
          </div>
          <div v-if="!newTodo" class="size text-center p-2 text-lg text-white text-bold border-2 border-white border-dashed opacity-50 hover:opacity-75" @click="newTodo = true">
              + Add Task
          </div>
          <task :selected="true" v-model="todo" v-else @keyup.enter="add(value)"/>
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
            active: false,
            selected: -1,
            todo: {
                id: 1,
                content: "",
                estimate: 0,
                selected: true
            },
            newTodo: false,
            actual_timer: "pomo",
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
            }]
        }
    },
    created() {
        this.interval = setInterval(() =>{
            if(this.active && this.seconds > 0) {
                this.seconds--
                document.title = this.getTitle
                if(this.seconds == 0) {
                    this.notification()
                }
            }
        }, 1000);
        document.title = this.getTitle
    },
    methods: {
        notification () {
          this.$notification.show('Hello World', {
            body: 'This is an example!'
          }, {});
        },
        update(value) {
            this.list[0] = value;
        },
        changeTimer(value) {
            if(value === "pomo") {
                this.seconds = times.pomo
                this.actual_timer = "pomo"
            } else if( value === "long") {
                this.seconds = times.long
                this.actual_timer = "long"
            } else {
                this.seconds = times.short
                this.actual_timer = "short"
            }
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
        },
        getColors() {
            if(this.actual_timer === "short") {
                return "bg-green-800";
            } else if(this.actual_timer === "long") {
                return "bg-blue-800";
            } else {
                return "bg-red-800";
            }
        },
        getTitle() {
            if(this.active) {
                return this.time +"-" + this.getSelectedText;
            } else {
                return "PomoMiguel"
            }
        },
        getLightColor() {
            if(this.actual_timer === "short") {
                return "bg-green-700";
            } else if(this.actual_timer === "long") {
                return "bg-blue-700";
            } else {
                return "bg-red-700";
            }
        },
        getSelectedText() {
            if(this.selected === -1) {
                return "Time to work!"
            } else {
                return this.list[this.selected].content;
            }
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
