import WorkcationsList from "@/views/WorkcationsList.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      path: "/",
      component: WorkcationsList,
    },
    {
      name: "workcation",
      path: "/workcation/:id",
      component: () => import("@/views/WorkcationDetails.vue"),
    },
  ],
});

export default router;
