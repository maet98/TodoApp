<template>
  <div class="hello">
      <h1>Timer </h1>
      <h1>{{ time }}</h1>
      <h1>Todo List:</h1>
      <div v-for="todo in list" :key="todo.id" @blur="todo.selected = false">
          <p class="letter" @click="todo.selected = true" v-if="!todo.selected">
            {{ todo.content }}
          </p>
          <input v-model="todo.content" @keypress.enter="todo.selected = false" v-else/>
      </div>
      <div v-if="!newTodo" @click="newTodo = true">
          +
      </div>
      <input v-model="value" v-else @keyup.enter="add(value)"/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
    data() {
        return {
            newTodo: false,
            value: "",
            seconds: 1500,
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
         this.interval = setInterval(() => this.seconds--, 1000);
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
        }
    },
    computed: {
        time() {
            return parseInt(this.seconds/60) + ":" + this.seconds%60
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
    text-decoration: none;
    transition-duration: 0.5s;
}

p:hover {
    font-weight: 900;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
