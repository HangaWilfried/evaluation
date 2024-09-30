<template>
  <div class="px-10 pt-5 last:pb-5">
    <TransitionGroup>
      <slot />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
