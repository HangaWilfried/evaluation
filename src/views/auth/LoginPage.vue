<template>
  <main>
    <section>
      <div class="flex items-center gap-4">
        <button
          class="flex gap-2 items-center border border-slate-300 rounded-full px-2 py-1 size-10"
          @click="loginUsingGoogleAuthProvider"
        >
          <IconGoogle />
        </button>
        <button
          class="flex gap-2 items-center border border-slate-300 rounded-full px-2 py-1 size-10"
          @click="loginUsingLinkedinAuthProvider"
        >
          <IconLinkedin />
        </button>
      </div>
      <div>
        <span>or signing with email</span>
      </div>
      <div>
        <label for="email">Email address</label>
        <input type="text" id="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="text" id="password" />
      </div>
      <div>
        <input type="checkbox" name="" id="mask">
        <label for="mask">Hide password</label>
      </div>
      <div>
        <button>Continue</button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { googleSdkLoaded } from "vue3-google-login";
import { GOOGLE_CLIENT_ID, SCOOPES } from "@/utils/constants";

import IconGoogle from "@/components/icons/IconGoogle.vue";
import IconLinkedin from "@/components/icons/IconLinkedin.vue";

const loginUsingGoogleAuthProvider = () => {
  googleSdkLoaded((google) => {
    google.accounts.oauth2
      .initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: SCOOPES,
        callback: (response) => {
          console.log("Handle the response", response.access_token);
        }
      })
      .requestAccessToken();
  });
};

const loginUsingLinkedinAuthProvider = () => {
  console.log("success");
};
</script>
