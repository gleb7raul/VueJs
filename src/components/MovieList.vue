<template>
  <div>
    <SortingComponent
      :movieCount="movieCount"
      :defaultSortType="defaultSortType"
      :isDetail="isDetail"
      :genres="genres"
      @sortBy="handleSort"
    />
    <div v-if="list && list.length" class="movie-list">
      <MovieCard
        v-for="movie in list"
        :movie="movie"
        :key="movie.title + movie.id"
        @onDetail="onClickChild"
      />
    </div>
    <div v-else class="movie-list">
      <span class="movie-list__message"> No movies that match your query </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SortingComponent from "./SortingComponent.vue";
import { IMovie } from "../interfaces/movie.interface";
import { ISearch } from "../interfaces/search.interface";
import useEventBus from "../hooks/useEventBus";

export default defineComponent({
  name: "MovieList",
  components: { SortingComponent },
  props: {
    movies: Array as () => IMovie[],
    isDetail: Boolean,
    genres: Array,
  },
  data: function () {
    return {
      list: this.movies,
      defaultSortType: "RATING",
      movieCount: this.movies?.length,
      isSearch: false,
    };
  },
  updated: function () {
    if (!this.isSearch) {
      this.list = this.movies;
    } else {
      this.isSearch = false;
    }
  },
  created: function () {
    const { onEvent } = useEventBus();
    onEvent("search", (payload: ISearch) => {
      this.search(payload);
    });
    this.listPreparation();
  },
  methods: {
    listPreparation(): void {
      this.list = this.list?.sort((a, b) => a.vote_average - b.vote_average);
    },
    search(data: ISearch): void {
      this.isSearch = true;
      const type = data.searchType;
      const value = data.searchValue;
      if (value) {
        switch (type) {
          case "TITLE":
            this.searchByTitle(data);
            break;
          case "GENGRE":
            this.searchByGengre(data);
            break;
        }
      } else {
        this.list = this.movies;
      }
      this.movieCount = this.list?.length;
    },
    searchByTitle(data: ISearch): void {
      this.list = this.movies?.filter((movie) => {
        const currentTitle = movie.title.toLowerCase();
        const searchTitle = data.searchValue.toLowerCase();
        return currentTitle.includes(searchTitle);
      });
    },
    searchByGengre(data: ISearch): void {
      this.list = this.movies?.filter((movie) => {
        const currentGeners = movie.genres.map((gener) => gener.toLowerCase());
        const searchGener = data.searchValue.toLowerCase();
        return currentGeners.includes(searchGener);
      });
    },
    handleSort(data: string): void {
      switch (data) {
        case "RELEASE DATE":
          this.list = this.list?.sort(
            (a, b) => Number(a.release_date) - Number(b.release_date)
          );
          break;
        case "RATING":
          this.list = this.list?.sort(
            (a, b) => a.vote_average - b.vote_average
          );
          break;
      }
    },
    onClickChild(id: string): void {
      this.$emit("clicked", id);
    },
  },
});
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
