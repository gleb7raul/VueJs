import { createWebHistory, createRouter } from "vue-router";
import NotFound from "../views//NotFound.vue";
import SearchForm from "../components/SearchForm.vue";
import MovieList from "../components/MovieList.vue";
import DetailMovieInfo from "../components/DetailMovieInfo.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    components: {
      default: MovieList,
      headerRouter: SearchForm,
    },
  },
  {
    path: "/home/detail/:id",
    name: "detail",
    components: {
      default: MovieList,
      headerRouter: DetailMovieInfo,
    },
  },
  { path: "/:NotFound(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
