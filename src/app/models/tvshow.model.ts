import { overrideComponentView } from '@angular/core/src/view';

export class TvShow {
  originalname: string;
  genreids: [];
  name: string;
  popularity: number;
  origincountry: [];
  votecount: number;
  firstairdate: Date;
  backdroppath: string;
  originallanguage: string;
  id: number;
  voteaverage: number;
  overview: string;
  posterpath: string;

  constructor() {}

  getBackdrop = () => `https://image.tmdb.org/t/p/original/${this.backdroppath}`;

  shortOverview = () => `${this.overview.substring(0, 230)} ${this.overview.length > 230 ? '(...)' : ''}`;
}
