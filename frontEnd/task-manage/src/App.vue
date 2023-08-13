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
import { ref, onMounted } from "vue";
import axios from "axios";
import TaskInputForm from "./components/TaskInputForm";
import TaskList from "./components/TaskList.vue";

//const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
const API_BASE_URL = "http://localhost:3000";

export default {
  name: "App",
  components: {
    TaskInputForm,
    TaskList,
  },
  setup() {
    const tasks = ref([]);
    const selectedTask = ref({ title: "", description: "" });

    const addTask = async (task) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        title: "Task3",
        description: "Description 3",
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:3000/tasks", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      //  try {
      //    const response = await axios.post(`http://localhost:3000/tasks`, task);
      //    tasks.value.push(response.data);
      //    selectedTask.value = { title: "", description: "" };
      //  } catch (error) {
      //    console.error("Error adding task:", error);
      //  }
    };

    const deleteTask = async (taskToDelete) => {
      try {
        await axios.delete(`${API_BASE_URL}/tasks/${taskToDelete.id}`);
        tasks.value = tasks.value.filter((task) => task.id !== taskToDelete.id);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    };

    const editTask = async (taskToEdit) => {
      selectedTask.value = { ...taskToEdit };
      try {
        const response = await axios.put(
          `${API_BASE_URL}/tasks/${taskToEdit.id}`,
          taskToEdit
        );
        const index = tasks.value.findIndex(
          (task) => task.id === taskToEdit.id
        );
        tasks.value[index] = response.data;
      } catch (error) {
        console.error("Error editing task:", error);
      }
    };

    // Fetch tasks when the component is mounted
    onMounted(async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tasks`);
        tasks.value = response.data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    });

    return {
      tasks,
      selectedTask,
      addTask,
      deleteTask,
      editTask,
    };
  },
};
</script>
