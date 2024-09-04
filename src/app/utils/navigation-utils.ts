import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class NavigationService {
  constructor (private router: Router) {} 

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToMovieDetail(id: string | number) {
    this.router.navigate([`/movie/${id}`]);
  }
  navigateToTickets() {
    this.router.navigate(['/tickets']);
  }
}