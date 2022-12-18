<template>
  <div class="main">
    <div class="header">
      <p>
        <span class="text_netflix">netflix</span>
        <span class="text_routlette">roulette</span>
      </p>
      <button id="search" @click="onHomePaget"></button>
    </div>
    <div class="movie-card">
      <div class="movie-card__header">
        <img class="movie-card__img" :src="movie?.poster_path" height="400" />
      </div>
      <div class="movie-card__body">
        <div class="movie-card__line">
          <h2 class="movie-card__title">
            {{ movie?.title }}
          </h2>
          <span class="movie-card__vote_average">
            {{ movie?.vote_average }}
          </span>
        </div>
        <p class="subTitle">{{ movie?.tagline }}</p>
        <div class="info">
          <span class="release_date">{{ movie?.release_date }}</span>
          <span>{{ duration }}</span>
        </div>
        <p class="movie-card__overview">{{ movie?.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IMovie } from "../interfaces/movie.interface";

export default defineComponent({
  name: "DetailMovieInfo",
  components: {},
  props: { movie: Object as () => IMovie },
  data: function () {
    return {};
  },
  methods: {
    onHomePaget: function () {
      this.$emit("clicked");
    },
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    duration: function (): string {
      if (this.movie) {
        let hours = Math.trunc(this.movie.runtime / 60);
        let minutes = this.movie.runtime % 60;
        return `${hours}h ${minutes}min`;
      }
      return "";
    },
  },
});
</script>

<style lang="scss" scoped>
.main {
  background-image: url("../assets/intro2_blur2.jpg");
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 48px;

  p {
    span {
      color: #f65261;
      font-size: large;
    }

    .text_netflix {
      font-weight: bold;
    }
  }

  #search {
    background: url("../assets/1.png");
    width: 32px;
    height: 32px;
    cursor: pointer;
    border: none;

    &:hover {
      scale: 150%;
    }
  }
}
.movie-card {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 30px 48px;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }

  .subTitle {
    font-size: 18px;
    color: white;
    margin-top: 0px;
  }

  .info {
    display: flex;
    color: #ff3648;
    font-size: 24px;
    margin-top: 30px;

    .release_date {
      margin-right: 24px;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: 40px;

    @media screen and (max-width: 800px) {
      width: 100%;
    }
  }

  &__subline {
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    border-bottom: 1px solid #7488ab;
  }

  &__title {
    font-size: 1.6em;
    line-height: 1.6em;
    color: white;
    margin-right: 48px;
  }

  &__line {
    display: flex;
    align-items: center;
  }

  &__vote_average {
    color: greenyellow;
    font-size: 20px;
    padding: 8px;
    border: greenyellow 1px solid;
    border-radius: 50%;
  }

  .movie-card__overview {
    color: white;
    font-size: 20px;
  }
}
</style>
