<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue";
import type { Workcation } from "@/utils/type";

import { HomeModernIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const text = ref<string>("");
const queryText = ref<string>("");

const clear = () => {
  text.value = "";
  queryText.value = "";
};

const store = ref<Workcation[]>([]);
onBeforeMount(async () => {
  const storageKey = localStorage.getItem("workcations");
  if (storageKey) {
    store.value = JSON.parse(storageKey);
  } else {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    const data = await response.json();
    console.log(data);

    store.value = data.map((item: {[id: string]: string}) => ({
      id: item.id,
      name: item.title,
      description: `${item.url} ${item.title}`,
      thumbnail: item.thumbnailUrl,
      isAvailable: true,
      price: Math.floor(Math.random()*4000),
    }));
    localStorage.setItem("workcations", JSON.stringify(store.value));
  }
});

const workcations = computed<Workcation[]>(() => {
  let list = store.value;  
  if (queryText.value) {
    list = list.filter(
      (workcation) =>
        workcation.name === queryText.value || 
        workcation.price.toString() === queryText.value);
  }
  return list.filter((workcation) => workcation.isAvailable);
});


</script>

<template>
    <main>
        <header class="sticky z-10 inset-0 flex justify-between items-baseline px-10 py-6 shadow-sm bg-slate-100">
            <h1 class="flex flex-col gap-0.5 min-w-[34%]">
                <HomeModernIcon class="size-6 stroke-blue-600" />
                <span class="text-sm text-blue-500">Workcation</span>
            </h1>
            <div class="relative px-4 text-xs grow">
                <input v-model="text" @keydown.enter="queryText = text" class="w-full rounded-lg py-2 pl-8 border focus:border-blue-500" type="text" placeholder="search over 200 workcations" />
                <MagnifyingGlassIcon class="size-5 absolute inset-y-2 inset-x-6" />
            </div>
        </header>
        <section class="flex flex-col gap-4 p-10">
            <div v-if="queryText" class="flex gap-2.5 items-center text-xs">
                <span>{{ queryText }}</span>
                <XMarkIcon class="size-6" @click="clear" />
            </div>
            <section class="grid grid-cols-5 gap-6">
                <div v-for="workcation in workcations" :key="workcation.id">
                    <div class="rounded-lg w-full h-36 overflow-hidden">
                        <img :src="workcation.thumbnail" :alt="workcation.thumbnail" class="rounded-lg w-full h-full object-cover">
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="text-sm">{{ workcation.name }}</span>
                        <div class="flex justify-between items-center">
                            <span class="text-xs">${{ workcation.price }}</span>
                            <span class="size-2 rounded-full bg-cyan-500"></span>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </main>
</template>