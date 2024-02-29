<script setup>
import { computed, ref } from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  task: {
    type: Object,
    default: () => ({
      name: "",
      descriptions: "",
      status: "new",
      priority: "",
    }),
  },
  edit: {
    type: Boolean,
    default: false,
  },
});
// eslint-disable-next-line no-undef
const emit = defineEmits(["update:task", "save", "create"]);
const task = computed({
  get() {
    return props.task;
  },
  set(newValue) {
    emit("update:task", newValue);
  },
});

const formRef = ref();
const createTask = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      emit(props.edit ? "save" : "create", task.value);
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<template>
  <el-form ref="formRef" :model="task" label-width="120px">
    <el-form-item
      prop="name"
      label="Название"
      :rules="{
        required: true,
        message: 'Обязательное поле',
        trigger: 'blur',
      }"
    >
      <el-input v-model="task.name" />
    </el-form-item>
    <el-form-item prop="descriptions" label="Описание">
      <el-input :rows="2" type="textarea" v-model="task.descriptions" />
    </el-form-item>
    <el-form-item prop="status" label="Статус">
      <el-select v-model="task.status">
        <el-option value="new" label="Новый" />
        <el-option value="done" label="Готов" />
      </el-select>
    </el-form-item>
    <el-form-item prop="priority" label="Приоритет">
      <el-select v-model="task.priority">
        <el-option value="low" label="Низкий" />
        <el-option value="medium" label="Средный" />
        <el-option value="hing" label="Высокий" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="createTask(formRef)"
        >Сохранить</el-button
      >
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
