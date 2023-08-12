<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Simple Task Manager</h1>
      </v-col>
    </v-row>

    <!-- Input Form -->
    <v-row>
      <v-col cols="12" md="6">
        <TaskInputForm @submit-task="addTask" :initialTask="selectedTask" />
      </v-col>
    </v-row>

    <!-- Display Tasks -->
    <TaskList :tasks="tasks" @delete-task="deleteTask" @edit-task="editTask" />
  </v-container>
</template>

<script>
import { ref } from "vue";
import TaskInputForm from "./components/TaskInputForm";
import TaskList from "./components/TaskList.vue";

export default {
  name: "App",
  components: {
    TaskInputForm,
    TaskList,
  },
  setup() {
    const tasks = ref([
      { id: 1, title: "asdf", description: "aaaa" },
      { id: 2, title: "ddd", description: "ddd" },
    ]);
    const selectedTask = ref({ title: "", description: "" }); // New ref for the selected task

    const addTask = (task) => {
      if (task.title && task.description) {
        const taskToAdd = {
          id: Date.now(),
          title: task.title,
          description: task.description,
        };
        tasks.value.push(taskToAdd);
      }
    };

    const deleteTask = (taskToDelete) => {
      tasks.value = tasks.value.filter((task) => task.id !== taskToDelete.id);
    };

    const editTask = (taskToEdit) => {
      selectedTask.value = { ...taskToEdit }; // Update the selectedTask ref
      tasks.value = tasks.value.filter((task) => task.id !== taskToEdit.id);
    };

    return {
      tasks,
      selectedTask, // Include selectedTask in the return
      addTask,
      deleteTask,
      editTask,
    };
  },
};
</script>
