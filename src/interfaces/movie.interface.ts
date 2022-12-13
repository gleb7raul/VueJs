export interface IMovie {
  id: number;
  tagline: string;
  title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  poster_path: string;
  genres: Array<string>;
  runtime: number;
}
