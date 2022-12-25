<template>
  <section class="container">
    <header>
      <SearchForm v-if="!isMovieCardClicked"></SearchForm>
      <DetailMovieInfo
        v-if="isMovieCardClicked"
        :movie="targetMovie"
        @clicked="onHomePaget"
      />
    </header>
    <main>
      <MovieList
        :isDetail="isMovieCardClicked"
        :genres="genres"
        @clicked="onDetailPage"
      />
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

import { IMovie } from "./interfaces/movie.interface";

export default defineComponent({
  name: "App",
  components: { SearchForm, MovieList, DetailMovieInfo },
  setup() {
    const store = useStore();
    onMounted(() => store.dispatch(ActionTypes.GetMovies));
    const totalCount = computed(() => store.getters.totalCount);
    console.log(totalCount);
    return { totalCount };
  },
  data: function () {
    return {
      isMovieCardClicked: false,
      targetMovie: undefined,
      targetMovieCardIndex: 0,
      genres: new Array<string>(),
    };
  },
  methods: {
    onDetailPage(id: string): void {
      this.isMovieCardClicked = true;

      // const cloneMovies = JSON.parse(JSON.stringify(this.movies));

      // this.targetMovie = cloneMovies.find(
      //   (movie: IMovie) => movie.id === Number(id)
      // );
      // this.targetMovieCardIndex = this.movies.findIndex(
      //   (movie: IMovie) => movie.id === Number(id)
      // );
      // this.genres = this.movies[this.targetMovieCardIndex]?.genres;

      // this.movies = cloneMovies.filter((movie: IMovie) => {
      //   const overlap = movie.genres.filter((i) => {
      //     return this.genres.indexOf(i) > 0;
      //   });
      //   return !!overlap.length;
      // });
    },
    onHomePaget(): void {
      this.isMovieCardClicked = false;
      // this.movies = this.movies;
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
