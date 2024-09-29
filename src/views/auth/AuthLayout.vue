<template>
  <section class="min-h-screen box-border wrapper">
    <RouterView></RouterView>
  </section>
</template>

<script setup lang="ts">
const url = `
linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
url(${new URL("@/assets/login-font.png", import.meta.url).href})
`;
</script>

<style scoped>
.wrapper {
  background-image: v-bind(url);
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
