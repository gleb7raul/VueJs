import { IMovie } from "../interfaces/movie.interface";

export type State = {
  movies: IMovie[];
  count: number;
  search: string;
  searchType: string;
  sortBy: string;
};

export const state: State = {
  movies: [],
  count: 0,
  search: "",
  searchType: "",
  sortBy: "",
};
