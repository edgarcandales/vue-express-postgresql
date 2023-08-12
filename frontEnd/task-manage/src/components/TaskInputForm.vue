<!-- TaskInputForm.vue -->
<template>
  <div>
    <v-text-field
      v-model="task.title"
      label="Task"
      :rules="[requiredField]"
      required
    ></v-text-field>
    <v-text-field
      v-model="task.description"
      label="Description"
      :rules="[requiredField]"
      required
    ></v-text-field>
    <v-btn @click="submitForm">Add Task</v-btn>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "TaskInputForm",
  props: {
    initialTask: {
      type: Object,
      default: () => ({ title: "", description: "" }),
    },
  },
  setup(props, { emit }) {
    const task = ref({ ...props.initialTask });

    // Validation rule for required fields
    const requiredField = (value) => !!value || "Field is required";

    // Watch for changes in initialTask prop and update the local task ref
    watch(
      () => props.initialTask,
      (newTask) => {
        task.value = { ...newTask };
      }
    );

    const submitForm = () => {
      if (task.value.title && task.value.description) {
        emit("submit-task", { ...task.value });
        task.value = { title: "", description: "" };
      }
    };

    return {
      task,
      submitForm,
      requiredField,
    };
  },
};
</script>
