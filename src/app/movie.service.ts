import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { Movie } from './models/movie.model';
import { TvShow } from './models/tvshow.model';
import { Person } from './models/person.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'd0aea524bd07ed49cbc26dff63f357dd';
  // subjects
  private topMoviesUpdated = new Subject<Movie[]>();
  private topShowsUpdated = new Subject<TvShow[]>();
  private topPersonsUpdated = new Subject<Person[]>();
  private singleDetailsUpdated = new Subject<any[]>();

  constructor(private http: HttpClient) { }

  /** GET top 20 movies from the server */
  getMovies() {
// tslint:disable-next-line: max-line-length
    this.http.get<{page: number, total_results: number, total_pages: number, results: []}>(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`)
    .subscribe(moviesData => {
      const finalMovies = [];
      moviesData.results.forEach((entry: any) => {
        const movie = new Movie();
        movie.votecount = entry.vote_count;
        movie.id = entry.id;
        movie.video = entry.video;
        movie.voteaverage = entry.vote_average;
        movie.title = entry.title;
        movie.popularity = entry.popularity;
        movie.posterpath = entry.poster_path;
        movie.originallanguage = entry.original_language;
        movie.originaltitle = entry.original_title;
        movie.genreids = entry.genre_ids;
        movie.backdroppath = entry.backdrop_path;
        movie.adult = entry.adult;
        movie.overview = entry.overview;
        movie.releasedate = entry.release_date;
        finalMovies.push(movie);
      });
      console.log(finalMovies);
      this.topMoviesUpdated.next(finalMovies);
    });
  }
  getMovieUpdateListener() {
    return this.topMoviesUpdated.asObservable();
    // listen to the subject
  }
  /** GET top 20 tv shows from the server */
  getTvShows() {
    // tslint:disable-next-line: max-line-length
    this.http.get<{page: number, total_results: number, total_pages: number, results: []}>(`${this.apiUrl}/tv/popular?api_key=${this.apiKey}&language=en-US&page=1`)
    .subscribe(tvData => {
      const finalShows = [];
      tvData.results.forEach((entry: any) => {
        const show = new TvShow();
        show.originalname = entry.original_name;
        show.genreids = entry.genre_ids;
        show.name = entry.name;
        show.popularity = entry.popularity;
        show.origincountry = entry.origin_country;
        show.votecount = entry.vote_count;
        show.firstairdate = entry.first_air_date;
        show.backdroppath = entry.backdrop_path;
        show.originallanguage = entry.original_language;
        show.id = entry.id;
        show.voteaverage = entry.vote_average;
        show.overview = entry.overview;
        show.posterpath = entry.poster_path;
        finalShows.push(show);
      });
      console.log(finalShows);
      this.topShowsUpdated.next(finalShows);
    });
  }
  getShowUpdateListener() {
    return this.topShowsUpdated.asObservable();
    // listen to the subject
  }

  getPersons() {
    // tslint:disable-next-line: max-line-length
    this.http.get<{page: number, total_results: number, total_pages: number, results: []}>(`${this.apiUrl}/person/popular?api_key=${this.apiKey}&language=en-US&page=1`)
    .subscribe(personData => {
      const finalPersons: Person[] = [];
      personData.results.forEach((entry: any) => {
        const person = new Person();
        person.id = entry.id;
        person.profilepath = entry.profile_path;
        person.name = entry.name;
        person.popularity = entry.popularity;
        person.adult = entry.adult;
        person.knownfor = entry.known_for;
        finalPersons.push(person);
      });
      console.log(finalPersons);
      this.topPersonsUpdated.next(finalPersons);
    });
  }
  getPersonUpdateListener() {
    return this.topPersonsUpdated.asObservable();
    // listen to the subject
  }
  getSingleDetails(currentId: string, currentType: string) {
    this.http.get<any>(`${this.apiUrl}/${currentType}/${currentId}?api_key=${this.apiKey}&language=en-US&page=1`)
      .subscribe(currentData => {
        console.log(currentData);
        this.singleDetailsUpdated.next(currentData);
      });
  }
  getSingleDetailsUpdateListener() {
    return this.singleDetailsUpdated.asObservable();
    // listen to the subject
  }
}
