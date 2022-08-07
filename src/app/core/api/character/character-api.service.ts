import { environment } from './../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Endpoints } from '../endpoints';
import { PaginationResponse } from '../../models/generic.model';
import { Character, CharacterFilter } from '../../models/character.model';
import { Observable } from 'rxjs';
import { ApiHelper } from '../../helpers/api.helper';

@Injectable({
  providedIn: 'root',
})
export class CharacterApiService {
  constructor(private httpClient: HttpClient) {}

  getCharacters(
    filters: CharacterFilter
  ): Observable<PaginationResponse<Character>> {
    const endpoint = environment.rickAndMortyApiUrl + Endpoints.CHARACTER;

    const params = ApiHelper.buildParams(filters);

    return this.httpClient.get<PaginationResponse<Character>>(endpoint, {
      params,
    });
  }

  getStatuses(): Observable<any> {
    const endpoint = environment.masterDataApiUrl + Endpoints.STATUSES;

    return this.httpClient.get<any>(endpoint);
  }

  getGenders(): Observable<any> {
    const endpoint = environment.masterDataApiUrl + Endpoints.GENDERS;

    return this.httpClient.get<any>(endpoint);
  }
}
