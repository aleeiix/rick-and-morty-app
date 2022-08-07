import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, map, Observable, tap } from 'rxjs';
import {
  Character,
  CharacterFilter,
  GenderEnum,
  GenderFilterEnum,
  StatusFilterEnum,
} from 'src/app/core/models/character.model';
import { PaginationResponse } from 'src/app/core/models/generic.model';
import { CharacterService } from 'src/app/core/services/character/character.service';

const DEBOUNCE_TIME = 700;

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
  GenderEnum = GenderEnum;

  filtersForm = new FormGroup({
    name: new FormControl(''),
    status: new FormControl(''),
    species: new FormControl(''),
    type: new FormControl(''),
    gender: new FormControl(''),
  });

  pagination: {
    actualPage: number;
    totalPages: number;
    pages: string[];
  } = {
    actualPage: 20,
    totalPages: 1,
    pages: [],
  };

  characters$?: Observable<Character[]> = undefined;
  statuses$?: Observable<any> = undefined;
  genders$?: Observable<any> = undefined;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.getCharacters();
    this.getStatuses();
    this.getGenders();

    this.filtersForm.valueChanges
      .pipe(debounceTime(DEBOUNCE_TIME))
      .subscribe(() => {
        this.getCharacters();
      });
  }

  private getCharacters() {
    const status = this.filtersForm.getRawValue().status
      ? StatusFilterEnum[Number(this.filtersForm.getRawValue().status) - 1]
      : null;

    const gender = this.filtersForm.getRawValue().gender
      ? GenderFilterEnum[Number(this.filtersForm.getRawValue().gender) - 1]
      : null;

    const filters: CharacterFilter = {
      name: this.filtersForm.getRawValue().name,
      status,
      species: this.filtersForm.getRawValue().species,
      type: this.filtersForm.getRawValue().type,
      gender,
    };

    this.characters$ = this.characterService
      .getCharacters(filters, this.pagination)
      .pipe(
        tap((res: PaginationResponse<Character>) => {
          const pages = [];

          pages.push('1');

          for (let index = 5; index >= 1; index--) {
            const prevPage = this.pagination.actualPage - index;

            if (index === 5 && prevPage - 1 > 1) {
              pages.push('...');
            }

            if (prevPage > 1) {
              pages.push(prevPage.toString());
            }
          }

          if (
            this.pagination.actualPage !== 1 &&
            this.pagination.actualPage !== res.info.pages
          ) {
            pages.push(this.pagination.actualPage.toString());
          }

          for (let index = 1; index <= 5; index++) {
            const nextPage = this.pagination.actualPage + index;
            if (nextPage < res.info.pages) {
              pages.push(nextPage.toString());
            }
            if (index === 5 && nextPage + 1 < res.info.pages) {
              pages.push('...');
            }
          }

          pages.push(res.info.pages.toString());

          const pagination = {
            actualPage: this.pagination.actualPage,
            totalPages: res.info.pages,
            pages,
          };

          this.pagination = pagination;
        }),
        map((res: PaginationResponse<Character>) => res.results)
      );
  }

  private getStatuses() {
    this.statuses$ = this.characterService.getStatuses();
  }

  private getGenders() {
    this.genders$ = this.characterService.getGenders();
  }
}
