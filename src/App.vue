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
        :movies="movies"
        :isDetail="isMovieCardClicked"
        :genres="genres"
        @clicked="onDetailPage"
      />
    </main>
    <FooterComponent class="footer"></FooterComponent>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import FooterComponent from "./shared/FooterComponent.vue";
import SearchForm from "./components/SearchForm.vue";
import DetailMovieInfo from "./components/DetailMovieInfo.vue";
import MovieList from "./components/MovieList.vue";

import { IMovie } from "./interfaces/movie.interface";

import mockedMovies from "./data/movies.json";

export default defineComponent({
  name: "App",
  components: { FooterComponent, SearchForm, MovieList, DetailMovieInfo },
  data: function () {
    return {
      movies: mockedMovies.movies,
      isMovieCardClicked: false,
      targetMovie: {},
      targetMovieCardIndex: 0,
      genres: new Array<string>(),
    };
  },
  methods: {
    onDetailPage(id: string): void {
      this.isMovieCardClicked = true;

      const cloneMovies = JSON.parse(JSON.stringify(this.movies));

      this.targetMovie = cloneMovies.find(
        (movie: IMovie) => movie.id === Number(id)
      );
      this.targetMovieCardIndex = this.movies.findIndex(
        (movie: IMovie) => movie.id === Number(id)
      );
      this.genres = this.movies[this.targetMovieCardIndex]?.genres;

      this.movies = cloneMovies.filter((movie: IMovie) => {
        const overlap = movie.genres.filter((i) => {
          return this.genres.indexOf(i) > 0;
        });
        return !!overlap.length;
      });
    },
    onHomePaget(): void {
      this.isMovieCardClicked = false;
      this.movies = mockedMovies.movies;
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
