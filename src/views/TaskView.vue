<script setup>
import TaskForm from "@/components/TaskForm.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import ListComponent from "@/components/ListComponent.vue";

const store = useStore();
const todoTasks = computed(() =>
  store.getters.tasks.filter((el) => el.status === "new")
);
const doneTasks = computed(() =>
  store.getters.tasks.filter((el) => el.status === "done")
);

const emptyTask = {
  name: "",
  descriptions: "",
  status: "new",
  priority: "low",
};
const task = ref({ ...emptyTask });

const create = (event) => {
  store.dispatch("addTask", { ...event });
  taskDialog.value = false;
};

const taskDialog = ref(false);
const addTask = () => {
  task.value = { ...emptyTask };
  taskDialog.value = true;
};
</script>
<template>
  <el-container>
    <el-dialog v-model="taskDialog">
      <TaskForm v-model:task="task" @create="create" />
    </el-dialog>
    <div style="width: 100%">
      <div style="width: 100%; display: flex; justify-content: center">
        <el-button type="primary" @click="addTask">Добавить задачу</el-button>
      </div>
      <div v-if="store.getters.tasks.length" class="task">
        <el-row>
          <el-col :md="24" :lg="12" class="task-col border">
            <ListComponent title="Сделать" :items="todoTasks" />
          </el-col>
          <el-col :md="24" :lg="12" class="task-col">
            <ListComponent title="Сделано" :items="doneTasks" />
          </el-col>
        </el-row>
      </div>
      <div class="no-task" v-else>
        У вас нет задач.
        <el-button type="text" @click="addTask"> Добавить задачу</el-button>
      </div>
    </div>
  </el-container>
</template>

<style scoped>
.task {
  width: 100%;
  margin-top: 25px;
}
.border {
  border-right: 3px solid gray;
}
.task-col {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.no-task {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 600px) {
  .border {
    border: none;
  }
}
</style>
