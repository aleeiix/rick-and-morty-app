import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { CharacterService } from 'src/app/core/services/character/character.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
  filters = {};

  pagination = {
    actualPage: 1,
    totalPages: null,
  };

  characters$?: Observable<any[]> = undefined;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.characters$ = this.characterService
      .getCharacters(this.filters, this.pagination)
      .pipe(
        tap((res: any) => {
          console.log(
            '🚀 ~ file: characters-list.component.ts ~ line 28 ~ CharactersListComponent ~ tap ~ res',
            res
          );
        }),
        map((res: any) => res.results)
      );
  }
}
