import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Webgl from "./views/Webgl.vue"

const routes = [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/webgl",
      name: "WebGL",
      component: Webgl
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
