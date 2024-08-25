import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreItemType } from 'src/app/types/store';

@Injectable({
  providedIn: 'root',
})
export class SnackServiceService {
  private apiUrl = "assets/db-mock/snacks.json";

  constructor(private http: HttpClient) {}

  getSnacks(): Observable<StoreItemType[]> {
    return this.http.get<StoreItemType[]>(this.apiUrl);
  }
}
