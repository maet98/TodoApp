<template>
    <div>
        <div v-if="selected" class="rounded-xl bg-white text-black space-y-2 p-1">
            <input class="focus:outline-none w-full p-2" v-model="title" placeholder="What are you working on?"/>
            <p class="font-bold text-black">Est Pomodoros</p>
            <div class="m-2 flex flex-row space-x-2 justify-items-between">
                <input type="number" class="w-10 h-8" v-model="estimate"/>
                <button @click="estimate = estimate + 1">up</button>
                <button @click="estimate = Math.max(estimate - 1,1)">down</button>
            </div>
            <div class="flex flex-row p-2 bg-gray-300">
                <button class="flex-grow text-left">Delete</button>
                <button class="flex-none m-2">Cancel</button>
                <button class="flex-none m-2 bg-black text-white rounded-lg p-2">Save</button>
            </div>
        </div>
          <div v-else class="bg-white text-black border-l-8 border-black p-3 rounded-md" :key="todo.id" @blur="todo.selected = false">
              <p class="" @click="todo.selected = true" v-if="!todo.selected">
                {{ todo.content }}
              </p>
          </div>
    </div>
</template>

<script>
export default {
    props: {
        task: Object
    },
    data() {
        return {
            title: '',
            estimate: 1
        }
    }
}
</script>
