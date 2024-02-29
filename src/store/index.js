import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    tasks: [
      {
        id: 1,
        name: "Сделать тестовое задание",
        descriptions: "Нужно создать таск менежер",
        status: "done",
        priority: "hing",
      },
      {
        id: 2,
        name: "Загрузить на гит",
        descriptions: "",
        status: "new",
        priority: "low",
      },
      {
        id: 3,
        name: "Сделать тестовое задание",
        descriptions:
          "композиционная форма, которую используют в литературоведении и лингвистике для подробной характеристики предметов или явлений",
        status: "new",
        priority: "medium",
      },
    ],
    currentId: 3,
  },
  getters: {
    tasks: (state) => state.tasks,
  },
  mutations: {
    ADD_TASK(state, task) {
      task["id"] = state.currentId;
      state.tasks.push(task);
      state.currentId++;
    },
    UPDATE_TASK(state, task) {
      let stateTask = state.tasks.find((el) => el.id === task.id);
      // eslint-disable-next-line no-unused-vars
      stateTask = task;
      // stateTask.name = task.name
    },
    DELETE_TASK(state, id) {
      state.tasks = state.tasks.filter((el) => el.id !== id);
    },
  },
  actions: {
    addTask({ commit }, task) {
      commit("ADD_TASK", task);
    },
    updateTask({ commit }, task) {
      commit("UPDATE_TASK", task);
    },
    deleteTask({ commit }, task) {
      commit("DELETE_TASK", task);
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      key: "frog-admin",
    }),
  ],
});
