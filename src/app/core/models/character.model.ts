import { Generic } from './generic.model';

export type Character = {
  id: number;
  name: string;
  status: StatusEnum;
  species: string;
  type: string;
  gender: GenderEnum;
  origin: Generic;
  location: Generic;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type CharacterFilter = {
  name?: string | null;
  status?: string | null;
  species?: string | null;
  type?: string | null;
  gender?: string | null;
  page?: number | null;
};

export enum StatusEnum {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'unknown',
}

export enum StatusFilterEnum {
  ALIVE,
  DEAD,
  UNKNOWN,
}

export enum GenderEnum {
  FEMALE = 'Female',
  MALE = 'Male',
  GENDERLESS = 'Genderless',
  UNKNOWN = 'unknown',
}

export enum GenderFilterEnum {
  FEMALE,
  MALE,
  GENDERLESS,
  UNKNOWN,
}
