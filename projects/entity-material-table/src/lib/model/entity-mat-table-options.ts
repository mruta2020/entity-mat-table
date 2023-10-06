import {Observable} from "rxjs";

export class EntityMatTableOptions<T> {
  url: string;
  queryParameters: Map<string,any>;
  rows: T[];
  paginator: {size: number[];default: number;show:boolean,queryParametersAlias: Map<string,string>}
  actions: { icon?: string; label?: string; callback(): void }[];
  columns: { label: string; property: string; }[];
}

export class EntityMatTablePaginationRes<T> {
  data: Observable<T>;
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}
