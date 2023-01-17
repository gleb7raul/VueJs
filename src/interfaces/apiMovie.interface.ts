export interface IApiMovie {
  id: number;
  duration: string;
  title: string;
  releaseDate: string;
  averageRating: number;
  storyline: string;
  posterurl: string;
  genres: Array<string>;
  poster: string;
  ratings: Array<number>;
  contentRating: "15";
  actors: Array<string>;
  imdbRating: number;
  year: string;
}
