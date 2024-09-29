<template>
  <div class="flex flex-col gap-2">
    <label :for="name">{{ label }}</label>
    <input
      class="p-2 rounded-lg border focus:border-blue-500"
      v-model="model"
      :type="type"
      :name="name"
      :id="name"
    />
  </div>
</template>

<script setup lang="ts">
const model = defineModel();
withDefaults(
  defineProps<{
    name: string;
    label: string;
    type?: string;
  }>(),
  {
    type: "text",
  },
);
</script>
