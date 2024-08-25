export type IMovies = {
  image: string;
  title: string;
  release: string;
  id: string | number;
  overview: string;
  originalLanguage: string;
  voteAverage: number;
  genre?: string[];
  timesheet?: string[];
}