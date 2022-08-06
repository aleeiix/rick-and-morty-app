import { Injectable } from '@angular/core';
import { CharacterApiService } from '../../api/character/character-api.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private characterApiService: CharacterApiService) {}

  getCharacters(filters: any, pagination: any) {
    return this.characterApiService.getCharacters();
  }
}
