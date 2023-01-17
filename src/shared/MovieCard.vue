<template>
  <div class="movie-card" @click="onDetail">
    <div class="movie-card__header">
      <img
        v-lazyload
        :data-src="movie?.poster_path"
        class="movie-card__img"
        @error="imgNotFound"
        height="500"
      />
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

import { ActionTypes } from "../store/actions";

import lazyload from "../directives/lazyload";

import { IMovie } from "../interfaces/movie.interface";

export default defineComponent({
  name: "MovieCard",
  props: {
    movie: Object as () => IMovie,
  },
  directives: {
    lazyload,
  },
  methods: {
    onDetail: function (): void {
      this.$store.dispatch(ActionTypes.SetSelectedMovie, this.movie?.id);
      this.$emit("onDetail", this.movie?.id);
    },
    imgNotFound: function (e: any): void {
      e.target.src = require("../assets/default-movie.png");
    },
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
  width: 325px;
  color: #a3a2a2;
  cursor: pointer;

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
    width: 100%;
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
