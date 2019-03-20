export class Person {
  popularity: number;
  id: number;
  profilepath: string;
  name: string;
  knownfor: [];
  adult: boolean;

  constructor() {}

  getBackdrop = () => `https://image.tmdb.org/t/p/original/${this.profilepath}`;
}
