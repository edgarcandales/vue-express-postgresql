<!-- TaskList.vue -->
<template>
  <div>
    <v-row v-for="task in tasks" :key="task.id">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="d-flex align-center">
            <div class="flex-grow-1">
              <strong>{{ task.title }}</strong>
            </div>
            <v-btn icon small @click="editTask(task)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon small color="red" @click="deleteTask(task)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>{{ task.description }}</v-card-text>
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

<style scoped>
.v-card-title {
  padding: 16px 16px 8px !important;
}
.v-card-text {
  padding: 8px 16px 16px !important;
}
.v-btn {
  margin-left: 18px;
}
</style>
