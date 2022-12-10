<template>
  <section class="container">
    <header>
      <SearchForm></SearchForm>
    </header>
    <main>
      <MovieList :movies="movies" />
    </main>
    <FooterComponent class="footer"></FooterComponent>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import FooterComponent from "./shared/FooterComponent.vue";
import SearchForm from "./components/SearchForm.vue";
import MovieList from "./components/MovieList.vue";

import mockedMovies from "./data/movies.json";

export default defineComponent({
  name: "App",
  components: { FooterComponent, SearchForm, MovieList },
  data: () => ({
    movies: mockedMovies.movies,
  }),
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
