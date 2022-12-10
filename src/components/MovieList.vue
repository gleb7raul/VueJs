<template>
  <div>
    <SortingComponent :movieCount="movies?.length" />
    <div v-if="movies && movies.length" class="movie-list">
      <MovieCard
        v-for="movie in movies"
        :movie="movie"
        :key="movie.title + movie.id"
      />
    </div>
    <div v-else class="movie-list">
      <span class="movie-list__message"> No movies that match your query </span>
    </div>
  </div>
</template>

<script lang="ts">
import SortingComponent from "./SortingComponent.vue";
import MovieCard from "../shared/MovieCard.vue";
import { IMovie } from "../interfaces/movie.interface";

export default {
  name: "MovieList",
  components: { MovieCard, SortingComponent },
  props: {
    movies: Array as () => IMovie[],
  },
};
</script>

<style lang="scss" scoped>
.movie-list {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: space-around;
  background-color: #232323;

  &__message {
    font-size: 2.5em;
    color: #7488ab;
    opacity: 0.3;
    margin-bottom: 30px;
  }
}
</style>
