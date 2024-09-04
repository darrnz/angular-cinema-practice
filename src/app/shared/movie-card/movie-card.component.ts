import { Component, Input } from '@angular/core';
import { IMovies } from 'src/app/types/movies';
import { NavigationService } from 'src/app/utils/navigation-utils';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  constructor(private navigationService: NavigationService) { }

  goToMovieDetails(id: string | number) {
    this.navigationService.navigateToMovieDetail(id);
  }
  @Input() movieData: IMovies | undefined = undefined

  goToTickets() {
    this.navigationService.navigateToTickets();
  }
  
}
