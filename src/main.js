import { createApp } from "vue";
import { VueQueryPlugin } from '@tanstack/vue-query'
// Components
import App from "./App.vue";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";

import "./style.css";
createApp(App).use(VueQueryPlugin).mount("#app");
