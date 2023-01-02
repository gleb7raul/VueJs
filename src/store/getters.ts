import { GetterTree } from "vuex";
import { State } from "./state";
import { IMovie } from "../interfaces/movie.interface";

export type Getters = {
  getMovies(state: State): Array<IMovie>;
  totalCount(state: State): number;
};

export const getters: GetterTree<State, State> & Getters = {
  getMovies(state) {
    return state.movies;
  },
  totalCount(state) {
    return state.movies.length;
  },
  getSelectedMovie(state) {
    return state.selectedMovie;
  },
  getSearchValue(state) {
    return state.search;
  },
  getSortValue(state) {
    return state.sortBy;
  },
  getSearchType(state) {
    return state.searchType;
  },
};
