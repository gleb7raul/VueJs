import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";
import { API } from "@/modules/APImodule";
import { IApiMovie } from "../interfaces/apiMovie.interface";
import { IMovie } from "../interfaces/movie.interface";

export enum ActionTypes {
  GetMovies = "GET_MOVIES",
  SetSearch = "SET_SEARCH",
  SetSearchType = "SET_SEARCH_TYPE",
  SetSortBy = "SET_SORT_BY",
  SetSelectedMovie = "SET_SELECTED_MOVIE",
  SetMovieListByGenres = "SET_MOVIE_LIST_BY_GENRES",
}

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionTypes.GetMovies](context: ActionAugments): void;
  [ActionTypes.SetSearch](context: ActionAugments, search: string): void;
  [ActionTypes.SetSearchType](
    context: ActionAugments,
    searchType: string
  ): void;
  [ActionTypes.SetSortBy](context: ActionAugments, sortBy: string): void;
  [ActionTypes.SetSelectedMovie](context: ActionAugments, id: number): void;
  [ActionTypes.SetMovieListByGenres](
    context: ActionAugments,
    genres: Array<string>
  ): void;
};

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetMovies]({ commit }) {
    const { data } = await API.get();
    commit(MutationType.SetMovies, externalizeAPiData(data));
  },
  async [ActionTypes.SetSearch]({ commit }, search) {
    commit(MutationType.SetSearch, search);
  },
  async [ActionTypes.SetSearchType]({ commit }, searchType) {
    commit(MutationType.SetSearchType, searchType);
  },
  async [ActionTypes.SetSortBy]({ commit }, sortBy) {
    commit(MutationType.SetSortBy, sortBy);
  },
  async [ActionTypes.SetSelectedMovie]({ commit }, id) {
    commit(MutationType.SetSelectedMovie, id);
  },
  async [ActionTypes.SetMovieListByGenres]({ commit }, genres) {
    commit(MutationType.SetMovieListByGenres, genres);
  },
};

const externalizeAPiData = (data: IApiMovie[]): IMovie[] => {
  return data.map((item: IApiMovie): IMovie => {
    const {
      id,
      title,
      genres,
      storyline,
      imdbRating,
      year,
      duration,
      posterurl,
    } = item;
    return {
      id,
      title,
      genres,
      tagline: storyline.slice(0, 15),
      vote_average: imdbRating,
      release_date: year,
      poster_path: posterurl,
      overview: storyline,
      runtime: Number(duration.slice(2, duration.length - 1)),
    };
  });
};
