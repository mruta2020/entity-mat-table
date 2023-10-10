import {Observable} from "rxjs";
import {Pipe, PipeTransform} from "@angular/core";

export class EntityMatTableOptions<T> {
  queryParameters?: Map<string, any>;
  showSelection?: boolean;
  rows?: T[];
  excelConfig?: EntityMatTableExcelConfig;
  serverHttp?: Function;
  transcoder?: Function;
  paginator?: EntityMatTablePaginator;
  actions?: EntityMatTableAction[];
  columns: EntityTableColumn[];
}

export interface EntityMatTableAction {
  icon?: string;
  label?: string;
  callback(): void
}

export interface EntityMatTablePaginator {
  size: number[];
  sizePage: number;
  default: number;
  show: boolean,
  queryParametersAlias?: Map<string, string>
}

export interface EntityMatTableExcelConfig {
  extension: '.csv' | '.xlsx';
  sheetName: string;
  fileName: string;
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
