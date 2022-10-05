import PedidosViewVue from "@/views/PedidosView.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/pedidos",
      name: "pedidos",
      component: PedidosViewVue,
    },
  ],
});

export default router;
