<script setup lang="ts">
import { onBeforeUnmount, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import type { Workcation } from "@/utils/type";

import FadeAnimationGroup from "@/components/FadeAnimationGroup.vue";
import { ArrowDownIcon, PencilSquareIcon } from "@heroicons/vue/16/solid";

const showEditNameForm = ref<boolean>(false);
const showEditAmountForm = ref<boolean>(false);
const showEditDescriptionForm = ref<boolean>(false);

const route = useRoute();
const id = route.params.id;

const workcationsList = () => {
  const storageKey = localStorage.getItem("workcations");
  return (storageKey ? JSON.parse(storageKey) : []) as Workcation[];
};

const getWorkcation = () => {
  return workcationsList().find((workcation) => {
    return workcation.id === id;
  });
};

const workcation = reactive({
  name: getWorkcation()?.name ?? "",
  price: getWorkcation()?.price ?? 0,
  description: getWorkcation()?.description ?? "",
  isAvailable: getWorkcation()?.isAvailable ?? false,
  id: getWorkcation()?.id ?? "",
  thumbnail: getWorkcation()?.thumbnail ?? "",
});

onBeforeUnmount(() => {
  const list = workcationsList().map((item) =>
    item.id === id ? workcation : item,
  );
  localStorage.setItem("workcations", JSON.stringify(list));
});
</script>

<template>
  <section class="w-[60%] m-auto p-10">
    <div class="relative w-full h-72 rounded-t-xl">
      <RouterLink
        class="absolute inset-4 flex justify-center items-center p-2 bg-slate-500/40 size-10 rounded-full"
        :to="{ name: 'home' }"
      >
        <ArrowDownIcon class="rotate-90 size-6 fill-white" />
      </RouterLink>
      <img
        :src="workcation.thumbnail"
        alt="image go here"
        class="w-full h-full rounded-t-xl"
      />
    </div>
    <section class="bg-slate-100/30 space-y-7 divide-y">
      <FadeAnimationGroup>
        <div v-if="showEditNameForm" class="flex gap-2 w-full items-center">
          <input
            v-model="workcation.name"
            type="text"
            class="grow rounded-lg p-2 border focus:border-blue-500"
          />
          <button
            @click="showEditNameForm = false"
            class="bg-blue-500 rounded-lg text-white py-1.5 px-4"
          >
            save
          </button>
        </div>
        <div v-else class="flex gap-2 items-start">
          <div class="flex flex-col gap-2">
            <h1 class="text-base font-bold">Name</h1>
            <span class="text-xs">{{ workcation.name }}</span>
          </div>
          <PencilSquareIcon
            @click="showEditNameForm = true"
            class="size-4 fill-blue-400"
          />
        </div>
      </FadeAnimationGroup>
      <FadeAnimationGroup>
        <div v-if="showEditAmountForm" class="flex gap-2 w-full items-center">
          <input
            v-model="workcation.price"
            type="text"
            class="grow rounded-lg p-2 border focus:border-blue-500"
          />
          <button
            @click="showEditAmountForm = false"
            class="bg-blue-500 rounded-lg text-white py-1.5 px-4"
          >
            save
          </button>
        </div>
        <div v-else class="flex gap-2 items-start">
          <div class="flex flex-col gap-2">
            <h1 class="text-base font-bold">Amount</h1>
            <span class="text-xs">${{ workcation.price }}</span>
          </div>
          <PencilSquareIcon
            @click="showEditAmountForm = true"
            class="size-4 fill-blue-400"
          />
        </div>
      </FadeAnimationGroup>
      <div class="flex gap-2 items-center px-10 pt-5">
        <label for="availability">Make as available</label>
        <input
          v-model="workcation.isAvailable"
          type="checkbox"
          id="availability"
        />
      </div>
      <FadeAnimationGroup>
        <div
          v-if="showEditDescriptionForm"
          class="flex gap-2 w-full items-start"
        >
          <textarea
            v-model="workcation.description"
            class="resize-none grow rounded-lg p-2 border focus:border-blue-500"
          ></textarea>
          <button
            @click="showEditDescriptionForm = false"
            class="bg-blue-500 rounded-lg text-white py-1.5 px-4"
          >
            save
          </button>
        </div>
        <div v-else class="flex gap-2 items-start">
          <div class="flex flex-col gap-2">
            <h1 class="text-base font-bold">Description</h1>
            <p class="text-xs">{{ workcation.description }}</p>
          </div>
          <PencilSquareIcon
            @click="showEditDescriptionForm = true"
            class="size-4 fill-blue-400"
          />
        </div>
      </FadeAnimationGroup>
    </section>
  </section>
</template>
