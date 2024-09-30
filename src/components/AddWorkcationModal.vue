<script setup lang="ts">
import { useRouter } from "vue-router";
import type { Workcation } from "@/utils/type";
import { onMounted, onUnmounted, reactive } from "vue";
import { XCircleIcon } from "@heroicons/vue/24/outline";

onMounted(() => {
  document.querySelector("body")?.classList.add("overflow-hidden");
});

onUnmounted(() => {
  document.querySelector("body")?.classList.remove("overflow-hidden");
});

defineEmits(["cancel"]);

const workcation = reactive({
  name: "",
  price: "",
  description: "",
});

const router = useRouter();

const save = async (): Promise<void> => {
  const storageKey = localStorage.getItem("workcations");
  const workcations: Workcation[] = storageKey ? JSON.parse(storageKey) : [];

  const thumbnail =
    workcations[Math.floor(Math.random() * workcations.length - 1)].thumbnail;

  const id = `${workcations.length + 1}`;

  workcations.push({
    ...workcation,
    id,
    price: Number(workcation.price),
    isAvailable: false,
    thumbnail,
  });

  localStorage.setItem("workcations", JSON.stringify(workcations));
  await router.push({
    name: "workcation",
    params: { id },
  });
};
</script>

<template>
  <section
    class="fixed inset-0 backdrop-blur bg-gray-950/50 flex justify-center items-center z-30"
  >
    <section class="min-w-[520px] bg-white rounded-lg space-y-4 p-8 relative">
      <XCircleIcon @click="$emit('cancel')" class="size-6 absolute inset-y-4 right-4 cursor-pointer" />  
      <div class="flex flex-col gap-2">
        <label for="name">Name</label>
        <input
          v-model="workcation.name"
          type="text"
          class="grow rounded-lg p-2 border focus:border-blue-500"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="name">Price</label>
        <input
          v-model="workcation.price"
          type="text"
          class="grow rounded-lg p-2 border focus:border-blue-500"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="name">Description</label>
        <textarea
          v-model="workcation.description"
          class="resize-none min-h-36 grow rounded-lg p-2 border focus:border-blue-500"
        ></textarea>
      </div>
      <div class="flex justify-end py-3">
        <button
          @click="save"
          class="bg-blue-500 rounded-lg text-white py-1.5 px-4"
        >
          save
        </button>
      </div>
    </section>
  </section>
</template>
