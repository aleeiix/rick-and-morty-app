import { environment } from './../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../endpoints';

@Injectable({
  providedIn: 'root',
})
export class CharacterApiService {
  constructor(private httpClient: HttpClient) {}

  getCharacters() {
    const endpoint = environment.apiUrl + Endpoints.CHARACTER;

    return this.httpClient.get(endpoint);
  }
}
