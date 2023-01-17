import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";
import { API } from "@/modules/APImodule";
import { IApiMovie } from "../interfaces/apiMovie.interface";
import { IMovie } from "../interfaces/movie.interface";

const GENRES = "genres";

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
  async [ActionTypes.GetMovies]({ commit, state }) {
    const { data } = await API.get(
      getValueSortForAPI(state.sortBy),
      state.search,
      getValueSearchTypeForAPI(state.searchType)
    );
    commit(MutationType.SetMovies, externalizeAPiData(data));
  },
  async [ActionTypes.SetSearch]({ commit, state }, search) {
    await commit(MutationType.SetSearch, search);

    const { data } = await API.get(
      state.sortBy,
      search,
      getValueSearchTypeForAPI(state.searchType)
    );

    commit(MutationType.SetMovies, externalizeAPiData(data));
  },
  async [ActionTypes.SetSearchType]({ commit }, searchType) {
    commit(MutationType.SetSearchType, searchType);
  },
  async [ActionTypes.SetSortBy]({ commit, state }, sortBy) {
    await commit(MutationType.SetSortBy, sortBy);

    const { data } = await API.get(
      getValueSortForAPI(sortBy),
      state.search,
      getValueSearchTypeForAPI(state.searchType)
    );

    commit(MutationType.SetMovies, externalizeAPiData(data));
  },
  async [ActionTypes.SetSelectedMovie]({ commit }, id) {
    commit(MutationType.SetSelectedMovie, id);
  },
  async [ActionTypes.SetMovieListByGenres]({ commit, state }, genres) {
    await commit(MutationType.SetMovieListByGenres, genres);

    const { data } = await API.get(
      getValueSortForAPI(state.sortBy),
      genres[0],
      GENRES
    );
    commit(MutationType.SetMovies, externalizeAPiData(data));
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

const getValueSortForAPI = (value: string): string =>
  value === "RATING" ? "imdbRating" : "year";

const getValueSearchTypeForAPI = (value: string): string =>
  value === "TITLE" ? "title" : "genres";
