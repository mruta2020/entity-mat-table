import {Component, OnInit, ViewChild} from '@angular/core';
import {
  EntityMatTableOptions,
  EntityMatTablePaginationRes
} from "../../../entity-material-table/src/lib/model/entity-mat-table-options";
import {HttpClient} from "@angular/common/http";
import {EntityMaterialTableComponent} from "entity-material-table";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('libEntityMaterialTable') appFoo: EntityMaterialTableComponent<Ex>;

  //@ts-ignore
  tableOptions: EntityMatTableOptions = {};

  constructor(private http: HttpClient) {
  }

  async ngOnInit() {

    this._initAsyncData();
    //this._initSyncData();

  }

  getString(elem: any) {
    console.log(elem);
  }

  onDelete(row: Element) {
    console.log(row);
  }

  onSelected(row: Element) {
    console.log(row);
  }

  private _initAsyncData() {

    this.tableOptions.url = 'https://reqres.in/api/users';

    let queryParameters = new Map<string, any>;
    this.tableOptions.queryParameters = queryParameters;

    let queryParametersAlias = new Map<string, any>;
    queryParametersAlias.set('page', 'page');
    queryParametersAlias.set('size', 'per_page');

    this.tableOptions.rows;
    this.tableOptions.paginator = {
      show: true,
      size: [1, 2, 3],
      default: 1,
      queryParametersAlias
    };

    this.tableOptions.columns = [
      {
        property: 'id',
        label: 'Id'
      },
      {
        property: 'email',
        label: 'Email'
      },
      {
        property: 'first_name',
        label: 'Nome'
      },
      {
        property: 'last_name',
        label: 'Cognome'
      },
      {
        property: 'avatar',
        label: 'Avatar'
      }
    ]

  }

  public transcoder(res: any) {

    const paginationRes: EntityMatTablePaginationRes<Ex> = new EntityMatTablePaginationRes<Ex>();
    paginationRes.totalPages = res.total_pages;
    paginationRes.data = res.data;
    paginationRes.perPage = res.per_page;
    paginationRes.page = res.page;
    paginationRes.total = res.total;

    return paginationRes;
  }

  private _initSyncData() {

    this.tableOptions.columns = [
      {property: 'position', label: 'Posizione'},
      {property: 'name', label: 'Nome'},
      {property: 'weight', label: 'Peso'},
      {property: 'symbol', label: 'Simbolo'},
      {property: 'actions', label: 'Azioni'}
    ];

    const elements: Element[] = [
      {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
      {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
      {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
      {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
      {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
      {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
      {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
      {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
      {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
      {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
      {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
      {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
      {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
      {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
      {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
      {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
      {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
      {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
      {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
      {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
    ];

    this.tableOptions.rows = elements;

    this.tableOptions.actions = [
      {
        label: 'cancella',
        icon: '<p style="color:red;">prova</p>',
        callback(row: Element) {
          console.log(row);
        }
      }
    ];

  }
}

export interface Element {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

export interface Ex {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}
