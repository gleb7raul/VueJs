import MovieCard from "../../shared/MovieCard.vue";
import mockedMovies from "../../data/movies.json";

export default {
  title: "MovieCard",
};

const ControlledMovieCard = (args) => ({
  components: { MovieCard },
  setup() {
    return { args };
  },
  template: `
      <MovieCard
        :movie="movie"
        v-bind="args"
      />
    `,
});

export const MovieCardComponent = ControlledMovieCard.bind({});

MovieCardComponent.args = {
  movie: mockedMovies.movies[0],
};
