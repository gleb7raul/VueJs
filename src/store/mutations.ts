import { MutationTree } from "vuex";
import { State } from "./state";
import mockedMovies from "../data/movies.json";

import { IMovie } from "../interfaces/movie.interface";

export enum MutationType {
  SetMovies = "SET_MOVIES",
  SetSearch = "SET_SEARCH",
  SetSearchType = "SET_SEARCH_TYPE",
  SetSortBy = "SET_SORT_BY",
  SetSelectedMovie = "SET_SELECTED_MOVIE",
  SetMovieListByGenres = "SET_MOVIE_LIST_BY_GENRES",
}

export type Mutations = {
  [MutationType.SetMovies](state: State, movies: IMovie[]): void;
  [MutationType.SetSearch](state: State, search: string): void;
  [MutationType.SetSearchType](state: State, searchType: string): void;
  [MutationType.SetSortBy](state: State, sortBy: string): void;
  [MutationType.SetSelectedMovie](state: State, id: number): void;
  [MutationType.SetMovieListByGenres](
    state: State,
    genres: Array<string>
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetMovies](state, movies) {
    state.movies = movies;

    const search = state.search;
    const searchType = state.searchType;

    if (search) {
      switch (searchType) {
        case "TITLE":
          state.movies = state.movies?.filter((movie) => {
            const currentTitle = movie.title.toLowerCase();
            const searchTitle = search.toLowerCase();
            return currentTitle.includes(searchTitle);
          });
          break;
        case "GENGRE":
          state.movies = state.movies?.filter((movie) => {
            const currentGeners = movie.genres.map((gener) =>
              gener.toLowerCase()
            );
            const searchGener = search.toLowerCase();
            return currentGeners.includes(searchGener);
          });
          break;
      }
    } else {
      state.movies = mockedMovies.movies;
    }
  },
  [MutationType.SetSearch](state, search) {
    state.search = search;
  },
  [MutationType.SetSearchType](state, searchType) {
    state.searchType = searchType;
  },
  [MutationType.SetSortBy](state, sortBy) {
    state.sortBy = sortBy;

    switch (sortBy) {
      case "RELEASE DATE":
        state.movies = state.movies?.sort(
          (a, b) => Number(a.release_date) - Number(b.release_date)
        );
        break;
      case "RATING":
        state.movies = state.movies?.sort(
          (a, b) => a.vote_average - b.vote_average
        );
        break;
    }
  },
  [MutationType.SetSelectedMovie](state, id) {
    state.selectedMovie = state.movies.find((movie) => movie.id === id);
  },
  [MutationType.SetMovieListByGenres](state, genres) {
    state.movies = state.movies.filter((movie: IMovie) => {
      const overlap = movie.genres.filter((i) => {
        return genres.indexOf(i) > 0;
      });
      return !!overlap.length;
    });
  },
};
