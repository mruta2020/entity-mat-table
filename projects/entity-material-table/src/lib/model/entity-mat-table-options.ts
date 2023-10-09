import {Observable} from "rxjs";
import {Pipe, PipeTransform} from "@angular/core";

export class EntityMatTableOptions<T> {
  queryParameters: Map<string, any>;
  showSelection: boolean;
  rows: T[];
  serverHttp: Function;
  transcoder: Function;
  paginator: { size: number[]; default: number; show: boolean, queryParametersAlias: Map<string, string> }
  actions: { icon?: string; label?: string; callback(): void }[];
  columns: EntityTableColumn[];
}

export interface EntityTableColumn {
  label: string;
  property: string;
  pipe?: {
    ref: PipeTransform
    args: any[];
  }

}

export class EntityMatTablePaginationRes<T> {
  data: Observable<T>;
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}
