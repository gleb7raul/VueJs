import { IMovie } from "../interfaces/movie.interface";

export type State = {
  movies: IMovie[];
  count: number;
  search: string;
  searchType: string;
  sortBy: string;
  selectedMovie: IMovie | undefined;
};

export const state: State = {
  movies: [],
  count: 0,
  search: "",
  searchType: "",
  sortBy: "",
  selectedMovie: undefined,
};
