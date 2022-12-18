import { createApp } from "vue";
import App from "./App.vue";
import commonPlugin from "./plugins/commonPlugin";

const app = createApp(App);
app.use(commonPlugin);
app.mount("#app");

// createApp(App).mount("#app");
