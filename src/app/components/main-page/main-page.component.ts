import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiServiceService } from 'src/app/services/movie-service/api-service.service';
import { IMovies } from 'src/app/types/movies';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  private unsuscribe$ = new Subject<void>();
  movies: IMovies[] = [];
  constructor(
    private apiServiceService: ApiServiceService,
  ) {}

  ngOnInit() {
    this.apiServiceService
      .getMovies()
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe({
        next: (movies) => {
          console.log(movies);
          const { results } = movies;
          this.movies = results.slice(0, 6).map((movie: any) => {
            return {
              image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
              title: movie.title,
              release: movie.release_date,
              id: movie.id,
              overview: movie.overview,
              originalLanguage: movie.original_language,
              voteAverage: movie.vote_average,
            };
          });
        },
      });
  }

  ngOnDestroy() {
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }
  // console.log(movies);
}
