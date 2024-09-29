<template>
    <main>
        <section>
            <h1>Workman</h1>
            <div>
                <nav></nav>
                <RouterLink :to="{ name: 'auth.login' }">
                    Getting started
                </RouterLink>
            </div>
        </section>
    </main>
</template>
<script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>