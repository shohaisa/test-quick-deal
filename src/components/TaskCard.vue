<script setup>
import { useStore } from "vuex";

const store = useStore();
// eslint-disable-next-line no-undef
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});
// eslint-disable-next-line no-undef
const emit = defineEmits(["edit"]);

const editTask = (id) => {
  emit("edit", id);
};

const deleteTask = (id) => {
  store.dispatch("deleteTask", id);
};

const priorities = {
  low: "Низкий",
  medium: "Средний",
  hing: "Высокий",
};
</script>

<template>
  <el-card class="task">
    <template #header>
      <div class="task-header">
        <strong class="task-name">{{ props.task.name }}</strong>
        <div class="task-priority" :class="props.task.priority">
          <span>{{ priorities[props.task.priority] }}</span>
        </div>
      </div>
    </template>
    <span class="task-descriptions">{{
      props.task.descriptions
        ? props.task.descriptions
        : "Описание отсутствует..."
    }}</span>
    <template #footer>
      <div class="task-footer">
        <div class="task-buttons">
          <el-button @click="editTask(props.task.id)">Редактировать</el-button>
          <el-button @click="deleteTask(props.task.id)" type="danger"
            >Удалить</el-button
          >
        </div>
      </div>
    </template>
  </el-card>
</template>

<style scoped>
.task {
  width: 500px;
  min-width: 300px;
  max-width: 500px;
}
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.task-priority {
  width: 100px;
  height: 30px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
}
.low {
  background-color: #004d96;
}
.medium {
  background-color: #ffab00;
}
.hing {
  background-color: #962901;
}
@media screen and (max-width: 600px) {
  .task {
    width: 300px;
  }
}
</style>
