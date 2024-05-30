import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    component: () => import('@/pages/index/index.vue'),
    children: [],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
