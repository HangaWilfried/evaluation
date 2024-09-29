<template>
  <section class="flex min-h-screen items-center justify-center gap-[10%]">
    <div class="text-white font-bold flex gap-2 items-end">
      <span class="rounded-lg px-1 py-1.5 bg-blue-500 text-xs">WM</span>
      <h1 class="text-base">Workman</h1>
    </div>
    <section
      class="bg-white w-[525px] rounded-xl p-6 py-10 flex flex-col gap-4"
    >
      <div class="flex items-center justify-center gap-4 pb-7">
        <button
          class="flex gap-2 items-center border border-slate-300 rounded-full px-2 py-1 size-10"
          @click="loginUsingGoogleAuthProvider"
        >
          <IconGoogle />
        </button>
        <button
          class="flex gap-2 items-center border border-slate-300 rounded-full px-2 py-1 size-10"
          @click="session.loginUsingLinkedinAuthProvider"
        >
          <IconLinkedin />
        </button>
      </div>
      <div class="relative border h-0.5">
        <span
          class="absolute bg-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border p-1 rounded-lg"
        >
          or signing with
        </span>
      </div>
      <TextField type="email" name="email" label="Email address" />
      <TextField type="text" name="password" label="Password" />
      <div class="flex gap-2 items-center">
        <input type="checkbox" name="mask" id="mask" />
        <label for="mask">Hide password</label>
      </div>
      <button
        class="h-8 text-white border border-blue-500 rounded-md bg-blue-500"
      >
        Continue
      </button>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useSessionStore } from "@/stores/session";

import { googleSdkLoaded } from "vue3-google-login";

import TextField from "@/components/TextField.vue";
import IconGoogle from "@/components/icons/IconGoogle.vue";
import IconLinkedin from "@/components/icons/IconLinkedin.vue";

const session = useSessionStore();
const router = useRouter();

const loginUsingGoogleAuthProvider = () => {
  googleSdkLoaded((google) => {
    google.accounts.oauth2
      .initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: import.meta.env.VITE_GOOGLE_SCOOPES,
        callback: async (response) => {
          localStorage.setItem("google_token_ref", response.access_token);
          await router.push({ name: "auth.google.login" });
        },
      })
      .requestAccessToken();
  });
};
</script>
