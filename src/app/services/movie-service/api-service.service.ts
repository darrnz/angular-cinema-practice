import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private apiUrl = 'https://api.themoviedb.org/3/';
  private apiKey = 'a9b1820ba1f9708d20a7744b7171e754'; //process.env['API_KEY']

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}movie/popular?api_key=${this.apiKey}&language`,
    );
  }
}
