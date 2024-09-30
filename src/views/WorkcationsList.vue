<script setup lang="ts">
import { ref, onBeforeMount, watch } from "vue";
import type { Workcation } from "@/utils/type";

import {
  HomeModernIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import BusyIndicator from "@/components/BusyIndicator.vue";
import AddWorkcationModal from "@/components/AddWorkcationModal.vue";

const text = ref<string>("");
const queryText = ref<string>("");

const clear = () => {
  text.value = "";
  queryText.value = "";
};

const cloneWorkcations = ref<Workcation[]>([]);
const workcations = ref<Workcation[]>([]);

const isLoading = ref<boolean>(false);
const showAddModalForm = ref<boolean>(false);

onBeforeMount(() => {
  isLoading.value = true;
  setTimeout(async () => {
    let list: Workcation[] = [];
    const storageKey = localStorage.getItem("workcations");
    if (storageKey) {
      list = JSON.parse(storageKey);
    } else {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos",
      );
      const data = await response.json();

      list = data.map((item: { [id: string]: string }) => ({
        id: item.id.toString(),
        name: item.title,
        description: `${item.url} ${item.title}`,
        thumbnail: item.thumbnailUrl,
        isAvailable: true,
        price: Math.floor(Math.random() * 4000),
      })) as Workcation[];

      localStorage.setItem("workcations", JSON.stringify(list));
    }
    cloneWorkcations.value = list.filter(
      (workcation) => workcation.isAvailable,
    );
    workcations.value = Array.from(cloneWorkcations.value);
    isLoading.value = false;
  });
});

watch(
  () => queryText.value,
  (value) => {
    isLoading.value = true;
    setTimeout(() => {
      if (value) {
        workcations.value = cloneWorkcations.value.filter(
          (workcation) =>
            workcation.name
              .toLowerCase()
              .includes(queryText.value.toLowerCase()) ||
            workcation.description
              .toLowerCase()
              .includes(queryText.value.toLowerCase()) ||
            workcation.price.toString() === queryText.value,
        );
      } else {
        workcations.value = Array.from(cloneWorkcations.value);
      }
      isLoading.value = false;
    });
  },
);
</script>

<template>
  <main>
    <AddWorkcationModal
      @cancel="showAddModalForm = false"
      v-if="showAddModalForm"
    />
    <header
      class="sticky z-10 inset-0 flex justify-between items-baseline px-10 py-6 shadow-sm bg-slate-100"
    >
      <h1 class="flex flex-col gap-0.5 min-w-[34%]">
        <HomeModernIcon class="size-6 stroke-blue-600" />
        <span class="text-sm text-blue-500">Workcation</span>
      </h1>
      <div class="flex gap-2 items-center grow">
        <div class="relative px-4 text-xs grow">
          <input
            v-model="text"
            @keydown.enter="queryText = text"
            class="w-full rounded-lg py-2 pl-8 border focus:border-blue-500"
            type="text"
            placeholder="search over 200 workcations"
          />
          <MagnifyingGlassIcon class="size-5 absolute inset-y-2 inset-x-6" />
        </div>
        <button
          class="bg-blue-500 rounded-lg text-white py-1.5 px-4"
          @click="showAddModalForm = true"
        >
          + Add
        </button>
      </div>
    </header>
    <section class="flex flex-col gap-4 p-10">
      <div
        v-if="queryText"
        class="border w-fit px-2 py-1 rounded-lg flex gap-2.5 items-center text-xs"
      >
        <span>{{ queryText }}</span>
        <XMarkIcon class="size-3 cursor-pointer" @click="clear" />
      </div>
      <BusyIndicator v-if="isLoading" />
      <section v-else class="grid grid-cols-5 gap-6">
        <RouterLink
          v-for="workcation in workcations"
          :key="workcation.id"
          :to="{ name: 'workcation', params: { id: workcation.id } }"
        >
          <div class="rounded-lg w-full h-36 overflow-hidden">
            <img
              :src="workcation.thumbnail"
              :alt="workcation.thumbnail"
              class="rounded-lg w-full h-full object-cover"
            />
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-sm">{{ workcation.name }}</span>
            <div class="flex justify-between items-center">
              <span class="text-xs">${{ workcation.price }}</span>
              <span class="size-2 rounded-full bg-cyan-500"></span>
            </div>
          </div>
        </RouterLink>
      </section>
    </section>
  </main>
</template>
