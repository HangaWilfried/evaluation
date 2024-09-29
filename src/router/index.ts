import GettingStartedPage from "@/views/GettingStartedPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing.page",
      component: GettingStartedPage,
    },
    {
      path: "/auth",
      component: () => import("@/views/auth/AuthLayout.vue"),
      children: [
        {
          path: "login",
          name: "auth.login",
          component: () => import("@/views/auth/LoginPage.vue"),
        },
        {
          path: "register",
          name: "auth.register",
          component: () => import("@/views/auth/SignupPage.vue"),
        },
        {
          path: "callback/google",
          name: "auth.google.login",
          component: () => import("@/views/auth/GoogleProcessingLogin.vue"),
        },
        {
          path: "callback/linkedin",
          name: "auth.linkedin.login",
          component: () => import("@/views/auth/LinkedinProcessingLogin.vue"),
        },
      ]
    }
  ]
});

export default router;
