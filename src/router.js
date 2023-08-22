import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Webgl from "./views/Webgl.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/webgl",
            name: "WebGL",
            component: Webgl,
        },
    ],
});
