import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISnack } from 'src/app/types/store';

@Injectable({
  providedIn: 'root',
})
export class SnackServiceService {
  private apiUrl = "assets/db-mock/snacks.json";

  constructor(private http: HttpClient) {}

  getSnacks(): Observable<ISnack[]> {
    return this.http.get<ISnack[]>(this.apiUrl);
  }
}
