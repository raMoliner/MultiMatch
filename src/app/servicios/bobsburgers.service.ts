import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BobsBurgersService {
  private apiUrl = 'https://bobsburgers-api.herokuapp.com/characters';

  constructor(private http: HttpClient) {}

  getCharacters(ids: number[]): Observable<any[]> {
    const requests = ids.map(id => this.http.get<any>(`${this.apiUrl}/${id}`));
    return forkJoin(requests);
  }
}
