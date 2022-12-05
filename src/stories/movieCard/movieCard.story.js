import MovieCard from "../../shared/MovieCard.vue";
import mockedMovies from "../../data/movies.json";

export default [
  "MovieCard",
  () => ({
    components: { MovieCard },
    data: () => ({
      movie: mockedMovies.movies[0],
    }),
    template: `
      <MovieCard
        :movie="movie"
      />
    `,
  }),
];
