import { createApp } from "vue";
import App from "./App.vue";
import { store, key } from "./store/store";
import commonPlugin from "./plugins/commonPlugin";

const app = createApp(App);

app.use(store, key);
app.use(commonPlugin);

app.mount("#app");
