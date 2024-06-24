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

  navigateToMovieDetail(id: string) {
    console.log('ID', id)
    this.router.navigate([`/movie/${id}`]);
  }
}