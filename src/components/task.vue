<template>
    <div @keydown.esc="task.selected = false">
        <div v-if="task.selected" class="rounded-xl bg-white text-black space-y-2 p-1">
            <input class="focus:outline-none w-full p-2" v-model="task.content" placeholder="What are you working on?"/>
            <p class="font-bold text-black">Est Pomodoros</p>
            <div class="m-2 flex flex-row space-x-2 justify-items-between">
                <input type="number" class="w-10 h-8" v-model="task.estimate"/>
                <button @click="task.estimate = task.estimate + 1">up</button>
                <button @click="task.estimate = Math.max(task.estimate - 1,1)">down</button>
            </div>
            <div class="flex flex-row p-2 bg-gray-300">
                <button class="flex-grow text-left">Delete</button>
                <button class="flex-none m-2">Cancel</button>
                <button class="flex-none m-2 bg-black text-white rounded-lg p-2" @click="task.selected = false">Save</button>
            </div>
        </div>
        <div v-else class="flex align-center justify-between bg-white text-black  p-3 rounded-md" :class="{'border-l-8 border-black': task.selected }"  >
            <i class="fas fa-check-circle fa-x m-1 " :class="isSelected"></i>
              <p class="" v-if="!task.selected">
                {{ task.content }}
              </p>
            <i class="fa fa-ellipsis-v" aria-hidden="true" @click="task.selected = true"></i>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        todo: Object,
        selected: Boolean
    },
    data() {
        return {
            title: '',
            estimate: 1
        }
    },
    mounted() {
        console.log(this.selected);
        window.addEventListener("keyup",function(e) {
            if(e.keyCode === 27) {
                this.$emit('todochange', false)
            }
        })
    },
    computed : {
        task: function() {
            return this.todo;
        },
        set: function (value) {
            return this.$emit('todochange', value)
        },
        isSelected() {
            console.log(this.selected);
            if(this.selected) {
                return "text-black";
            } else {
                return "text-grey-300";
            }
        }
    },
}
</script>
