import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, debounceTime, map, Observable, of, tap } from 'rxjs';
import {
  Character,
  CharacterFilter,
  GenderEnum,
  GenderFilterEnum,
  StatusFilterEnum,
} from 'src/app/core/models/character.model';
import {
  Pagination,
  PaginationResponse,
} from 'src/app/core/models/generic.model';
import { CharacterService } from 'src/app/core/services/character/character.service';

const DEBOUNCE_TIME = 700;

const PAGINATION_INITIAL = {
  actualPage: 1,
  totalPages: 1,
  pages: [],
};

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

  pagination: Pagination = PAGINATION_INITIAL;

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
        this.pagination = PAGINATION_INITIAL;

        this.getCharacters();
      });
  }

  changePage(newPage: number) {
    const pagination = {
      actualPage: newPage,
      totalPages: this.pagination.totalPages,
      pages: this.pagination.pages,
    };

    this.pagination = pagination;

    this.getCharacters();
  }

  private getCharacters() {
    const filters = this.prepareFilters();

    this.characters$ = this.characterService.getCharacters(filters).pipe(
      tap((res: PaginationResponse<Character>) => {
        this.pagination = this.preparePagination(res);
      }),
      map((res: PaginationResponse<Character>) => res.results),
      catchError(() => {
        this.pagination = {
          actualPage: 1,
          totalPages: 1,
          pages: [],
        };
        return of([]);
      })
    );
  }

  private getStatuses() {
    this.statuses$ = this.characterService.getStatuses();
  }

  private getGenders() {
    this.genders$ = this.characterService.getGenders();
  }

  private prepareFilters(): CharacterFilter {
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
      page: this.pagination.actualPage || 1,
    };

    return filters;
  }

  private preparePagination(res: PaginationResponse<Character>) {
    const pages = [];

    pages.push({ name: '1', value: 1 });

    for (let index = 5; index >= 1; index--) {
      const prevPage = this.pagination.actualPage - index;

      if (index === 5 && prevPage - 1 > 1) {
        pages.push({ name: '...', value: prevPage - 1 });
      }

      if (prevPage > 1) {
        pages.push({ name: prevPage.toString(), value: prevPage });
      }
    }

    if (
      this.pagination.actualPage !== 1 &&
      this.pagination.actualPage !== res.info.pages
    ) {
      pages.push({
        name: this.pagination.actualPage.toString(),
        value: this.pagination.actualPage,
      });
    }

    for (let index = 1; index <= 5; index++) {
      const nextPage = this.pagination.actualPage + index;
      if (nextPage < res.info.pages) {
        pages.push({ name: nextPage.toString(), value: nextPage });
      }
      if (index === 5 && nextPage + 1 < res.info.pages) {
        pages.push({ name: '...', value: nextPage + 1 });
      }
    }

    pages.push({ name: res.info.pages.toString(), value: res.info.pages });

    const pagination = {
      actualPage: this.pagination.actualPage,
      totalPages: res.info.pages,
      pages,
    };

    return pagination;
  }
}
