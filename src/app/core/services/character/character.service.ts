import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterApiService } from '../../api/character/character-api.service';
import { Character, CharacterFilter } from '../../models/character.model';
import { PaginationResponse } from '../../models/generic.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private characterApiService: CharacterApiService) {}

  getCharacters(
    filters: CharacterFilter,
    pagination: any
  ): Observable<PaginationResponse<Character>> {
    return this.characterApiService.getCharacters(filters);
  }

  getStatuses(): Observable<any> {
    return this.characterApiService.getStatuses();
  }

  getGenders(): Observable<any> {
    return this.characterApiService.getGenders();
  }
}
