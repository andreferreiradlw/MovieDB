import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../models/movie.model';
import { TvShow } from '../models/tvshow.model';
import { Person } from '../models/person.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  // movies
  top20Movies: Movie[];
  private movieSub: Subscription;
  showMovies = false;

  // series
  top20Shows: TvShow[];
  private tvshowSub: Subscription;
  showTvShows = false;

  // people
  top20Persons: Person[];
  private personSub: Subscription;
  showPersons = false;

  // details
  private detailsSub: Subscription;
  currentDetails: any;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getTopMovies();
  }
  getTopMovies() {
    this.showMovies = !this.showMovies;
    this.showTvShows = false;
    this.showPersons = false;
    if (!this.top20Movies) {
      this.movieService.getMovies();
      // will get initial array of movies from server
      this.movieSub = this.movieService.getMovieUpdateListener()
        .subscribe(movieData => this.top20Movies = movieData);
    }
  }
  getTopShows() {
    this.showTvShows = !this.showTvShows;
    this.showMovies = false;
    this.showPersons = false;
    if (!this.top20Shows) {
      this.movieService.getTvShows();
      // will get initial array of tv shows from server
      this.tvshowSub = this.movieService.getShowUpdateListener()
        .subscribe(showsData => this.top20Shows = showsData);
    }
  }
  getTopPersons() {
    this.showPersons = !this.showPersons;
    this.showMovies = false;
    this.showTvShows = false;
    if (!this.top20Persons) {
      this.movieService.getPersons();
      // will get initial array of persons from server
      this.personSub = this.movieService.getPersonUpdateListener()
        .subscribe(personsData => this.top20Persons = personsData);
    }
  }
  getDetails(id: string, type: string) {
    this.movieService.getSingleDetails(id, type);
    this.detailsSub = this.movieService.getSingleDetailsUpdateListener()
        .subscribe(currentData => this.currentDetails = currentData);
  }
  onSearch(event: any) {
    console.log(event);
    console.log(event.target.value);
  }

}
