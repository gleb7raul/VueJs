<template>
  <section class="container">
    <header>
      <SearchForm v-if="!isMovieCardClicked"></SearchForm>
      <DetailMovieInfo v-if="isMovieCardClicked" @clicked="onHomePaget" />
    </header>
    <main>
      <MovieList :isDetail="isMovieCardClicked" @clicked="onDetailPage" />
    </main>
    <FooterComponent class="footer"></FooterComponent>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";

import SearchForm from "./components/SearchForm.vue";
import DetailMovieInfo from "./components/DetailMovieInfo.vue";
import MovieList from "./components/MovieList.vue";

import { useStore } from "./store/store";
import { ActionTypes } from "./store/actions";

export default defineComponent({
  name: "App",
  components: { SearchForm, MovieList, DetailMovieInfo },
  setup() {
    const store = useStore();
    onMounted(() => store.dispatch(ActionTypes.GetMovies));
    const totalCount = computed(() => store.getters.totalCount);
    console.log(totalCount);
    return { totalCount, store };
  },
  data: function () {
    return {
      isMovieCardClicked: false,
    };
  },
  methods: {
    onDetailPage(): void {
      this.isMovieCardClicked = true;
    },
    onHomePaget(): void {
      this.isMovieCardClicked = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  height: 99vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
</style>
