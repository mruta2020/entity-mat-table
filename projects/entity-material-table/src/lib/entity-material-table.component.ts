import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef, ViewChild
} from '@angular/core';
import {EntityMatTableOptions, EntityMatTablePaginationRes} from "./model/entity-mat-table-options";
import * as _ from "lodash";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'lib-entity-material-table',
  templateUrl: './entity-material-table.component.html',
  styles: []
})
export class EntityMaterialTableComponent<T> implements OnInit, AfterViewInit {

  @ContentChild('cellTemplate') cellTemplate!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() options: EntityMatTableOptions<T>;
  @Input() transcoder!: Function;

  @Output() selected = new EventEmitter<T>();

  totalCount : number = 1;
  paginationRes: EntityMatTablePaginationRes<T>;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<T[]>;

  constructor(private http: HttpClient) {
  }

  async ngAfterViewInit() {

    if (this.options?.paginator?.show) {

      await this.initAsyncTable();

      this.paginator.page.subscribe(async () => {
        await this.initAsyncTable();
      });
    }
  }

  async ngOnInit() {

    this.initOptionsDefaultValue();

    if (this.options?.actions?.length > 0) {
      const actionColumn = _.find(this.options?.columns, c => c.property == 'actions');
      if (!actionColumn) {
        this.options?.columns.push({
          label: 'Actions',
          property: 'actions'
        });
      }
    }

    if (!this.options.url) {
      let data: any = this.options.rows;
      this.dataSource.data = data;
      this.dataSource._updateChangeSubscription();
      this.initColumns();
    }

  }

  onSelect(row: T) {
    this.selected.emit(row);
  }

  isEntityMatTablePaginationRes(object: any) {
    return _.has(object, 'data') && _.has(object, 'perPage');
  }

  private initColumns() {

    this.displayedColumns = this.options?.columns.map(c => c.property);
    this.checkColumnsAreAvailable();
  }

  private async initAsyncTable() {

    // @ts-ignore
    const observable = this.http.get(this.options.url, {
      params: this.buildQueryParameters()
    }).pipe(map(res => this.transcoder(res)));
    const data = await observable.toPromise();

    //@ts-ignore
    this.paginationRes = data;

    // @ts-ignore
    if (!(this.isEntityMatTablePaginationRes(data))) {
      console.error('Non è un oggetto EntityMatTablePaginationRes<T>. Definire o rivedere il transcodere per la risposta!');
    }

    // @ts-ignore
    this.dataSource.data = data.data;
    this.dataSource._updateChangeSubscription();

    this.initColumns();
    this.checkPageConfigHaveSameResConfig();

    this.paginator.length = this.paginationRes.total;
  }

  private buildQueryParameters() {

    let params: any = {};
    for (let k of this.options.queryParameters.keys()) {
      params[k] = this.options.queryParameters.get(k);
    }

    const sizeAlias: any = this.options.paginator.queryParametersAlias.get('size');
    if (sizeAlias) {
      params[sizeAlias] = this.paginator?.pageSize;
    }

    const pageAlias: any = this.options.paginator.queryParametersAlias.get('page');
    if (pageAlias) {
      params[pageAlias] = this.paginator?.pageIndex + this.options.paginator.default;
    }

    return params;
  }

  private initOptionsDefaultValue() {

    const defaultOptionsValue = {
      columns: [],
      rows: [],
      pageConfig: {page: 1, size: 5},
      actions: [],
      paginator: {size: [5, 10, 20], default: 5, show: false}
    };

    this.options = _.merge(defaultOptionsValue, this.options);
  }

  private checkPageConfigHaveSameResConfig() {
    const isSame = this.paginationRes.perPage == this.paginator.pageSize;
    if (!isSame) {
      console.error("PageConfig pageSize has different configuration then server response!Their value have to be same!", "server response pageSize: " + this.paginationRes.perPage, "PageConfig pageSize: " + this.paginator.pageSize);
    }
  }

  private checkColumnsAreAvailable() {
    const firstObject = _.get(this.dataSource, 'data[0]');
    const keys = Object.keys(firstObject);
    const intersection = _.filter(_.cloneDeep(this.displayedColumns), item => _.indexOf(keys, item) == -1);

    if (intersection.length > 0) {
      console.error("One or more defined columns are not present in the first object keys! Check you data structure!", "displayedColumns not found: " + _.join(intersection, ', '));
    }

  }
}
