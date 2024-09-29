<template>
    <div>
      <p>Logging in with LinkedIn...</p>
    </div>
  </template>
  
<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useSessionStore } from "@/stores/session";

const router = useRouter();
const sessionStore = useSessionStore();

const isLoading = ref<Boolean>(false);

onBeforeMount(async () => {
  isLoading.value = true;
  const { error } = await sessionStore.doLoginWithLinkedinCredentials();
  if (error) {
    await router.push({ name: "auth.login" });
  } else {
    router.push({ name: "welcome" });
  }
  isLoading.value = false;
});
</script>
  