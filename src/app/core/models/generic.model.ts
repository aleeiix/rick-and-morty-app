export type PaginationInfo = {
  count: number;
  pages: number;
  next?: string;
  prev?: string;
};

export type PaginationResponse<T> = {
  info: PaginationInfo;
  results: T[];
};

export type Generic = {
  name: string;
  url: string;
};

export type Pagination = {
  actualPage: number;
  totalPages: number;
  pages: Page[];
};

export type Page = {
  name: string;
  value: number;
};
