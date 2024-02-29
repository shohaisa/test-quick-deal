<script setup>
import TaskCard from "@/components/TaskCard.vue";
import TaskForm from "@/components/TaskForm.vue";
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
// eslint-disable-next-line no-undef
const props = defineProps(["items", "title"]);

const task = ref({});
const taskDialog = ref(false);
const edit = (id) => {
  task.value = props.items.find((el) => el.id === id);
  taskDialog.value = true;
};
const save = (event) => {
  store.dispatch("updateTask", { ...event });
  taskDialog.value = false;
};
</script>

<template>
  <div>
    <el-dialog v-model="taskDialog">
      <TaskForm v-model:task="task" @save="save" :edit="true" />
    </el-dialog>
    <h4>{{ props.title }}</h4>
    <div class="task">
      <div v-for="task in props.items" :key="task.id" class="task-items">
        <TaskCard :task="task" @edit="edit(task.id)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-items {
  margin-bottom: 10px;
}
</style>
