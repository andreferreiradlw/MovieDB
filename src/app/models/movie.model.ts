export class Movie {
  votecount: number;
  id: number;
  video: boolean;
  voteaverage: number;
  title: string;
  popularity: number;
  posterpath: string;
  originallanguage: string;
  originaltitle: string;
  genreids: [];
  backdroppath: string;
  adult: boolean;
  overview: string;
  releasedate: Date;
  genres: [];
  imdbid: string;
  productioncompanies: [];

  constructor() {}

  getBackdrop = () => `https://image.tmdb.org/t/p/original/${this.backdroppath}`;
  shortOverview = () => `${this.overview.substring(0, 230)} ${this.overview.length > 230 ? '(...)' : ''}`;
  getYear = () => this.releasedate.getFullYear();
}
