import { createApp } from "vue";
import App from "./App.vue";
import { store, key } from "./store/store";
import commonPlugin from "./plugins/commonPlugin";
import { MoviesApi } from "./modules/APImodule";
import router from "./router/router";

const app = createApp(App);

app.use(store, key);
app.use(commonPlugin);
app.use(MoviesApi);
app.use(router);

app.mount("#app");
