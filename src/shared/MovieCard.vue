<template>
  <div class="movie-card">
    <div class="movie-card__header">
      <img class="movie-card__img" :src="movie?.poster_path" height="500" />
    </div>
    <div class="movie-card__body">
      <div class="movie-card__line">
        <div class="movie-card__title">
          {{ movie?.title }}
        </div>
        <span class="movie-card__release_date">
          {{ movie?.release_date }}
        </span>
      </div>
      <p class="movie-card__genres">{{ movie?.genres.join(" & ") }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { IMovie } from "../interfaces/movie.interface";

export default defineComponent({
  name: "MovieCard",
  props: {
    movie: Object as () => IMovie,
  },
});
</script>

<style lang="scss" scoped>
.movie-card {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  padding: 30px;
  width: 300px;
  color: #a3a2a2;

  .movie-card__line {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }

  &__body {
    display: flex;
    flex-direction: column;
    width: 83%;
    margin-top: 16px;

    @media screen and (max-width: 800px) {
      width: 100%;
    }
  }

  &__title {
    font-size: 18px;
  }

  &__genres {
    margin-top: 5px;
  }

  &__release_date {
    padding: 4px;
    border: 1px solid #a3a2a2;
    border-radius: 15%;
  }
}
</style>
