<template>
  <div>
    <SortingComponent
      :movieCount="movies.length"
      :defaultSortType="defaultSortType"
      :isDetail="isDetail"
    />
    <div v-if="movies && movies.length" class="movie-list">
      <MovieCard
        v-for="movie in movies"
        :movie="movie"
        :key="movie?.id"
        @onDetail="onClickChild"
      />
    </div>
    <div v-else class="movie-list not-found">
      <span class="movie-list__message"> No movies that match your query </span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import SortingComponent from "./SortingComponent.vue";

import { useStore } from "../store/store";
import { ActionTypes } from "../store/actions";

const DEFAULT_TYPE = "RATING";

export default defineComponent({
  name: "MovieList",
  components: { SortingComponent },
  props: {
    isDetail: Boolean,
  },
  setup() {
    const store = useStore();
    store.dispatch(ActionTypes.GetMovies);
    const movies = computed(() => store.getters.getMovies);
    const selectedMovie = computed(() => store.getters.getSelectedMovie);
    return { movies, selectedMovie };
  },
  data: function () {
    return {
      defaultSortType: DEFAULT_TYPE,
    };
  },
  methods: {
    onClickChild(id: string): void {
      this.$store.dispatch(
        ActionTypes.SetMovieListByGenres,
        this.selectedMovie?.genres
      );
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
}

.not-found {
  height: 550px;
  align-items: center;

  .movie-list__message {
    color: white;
    font-size: x-large;
  }
}
</style>
