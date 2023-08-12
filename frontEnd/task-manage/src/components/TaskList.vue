<!-- TaskList.vue -->
<template>
  <div>
    <v-row v-for="task in tasks" :key="task.id">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            {{ task.title }}
            <v-spacer></v-spacer>
            <v-btn small @click="editTask(task)">Edit</v-btn>
            <v-btn small color="red" @click="deleteTask(task)">Delete</v-btn>
          </v-card-title>
          <v-card-subtitle>{{ task.description }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "TaskList",
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    editTask(task) {
      this.$emit("edit-task", task);
    },
    deleteTask(task) {
      this.$emit("delete-task", task);
    },
  },
};
</script>
