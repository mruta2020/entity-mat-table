import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
  EntityMatTableOptions,
  EntityMatTablePaginationRes
} from "../../../entity-material-table/src/lib/model/entity-mat-table-options";
import {Element} from "./model/element.model";
import * as Parse from "parse";
import {Observable} from "rxjs";
import {Ex} from "./app.component";
import {CurrencyPipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  get syncDataConfig() {

    let tableOptions: EntityMatTableOptions<Element> = {
      columns: [
        {property: 'position', label: 'Posizione'},
        {property: 'name', label: 'Nome'},
        {property: 'weight', label: 'Peso'},
        {property: 'symbol', label: 'Simbolo'},
        {property: 'actions', label: 'Azioni'}
      ],
      rows: [
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
      ],
      paginator: {
        sizePage: 3,
        show: true,
        size: [3, 10, 12],
        default: 0
      }
    };

    return tableOptions;
  }

  geFactoryAsyncData(type: 'HTTP' | 'SDK'){
    switch (type){
      case 'HTTP':
        return this.httpTableOptionsConfig;
        break;
      case 'SDK':
        return this.sdkTableOptionsConfig;
        break;
      default:
        return this.httpTableOptionsConfig;
        break;
    }
  }

  get sdkTableOptionsConfig(){

    let queryParameters = new Map<string, any>;
    let queryParametersAlias = new Map<string, any>;

    queryParametersAlias.set('size', 'displayLimit');
    queryParametersAlias.set('page', 'page');

    let tableOptions: EntityMatTableOptions<Element> = {
      queryParameters,
      serverHttp: this.parseSdkCall,
      showSelection: true,
      transcoder: this.parseSdkTransconder,
      paginator: {
        show: true,
        size: [1, 2, 3],
        sizePage: 3,
        default: 1,
        queryParametersAlias
      },
      columns: [
        {
          label: 'Id',
          property: 'objectId'
        },
        {
          label: 'Importo',
          property: 'amount',
          pipe: {
            ref: new CurrencyPipe('en-US'),
            args: ['EUR']
          }
        }
      ]
    };

    return tableOptions;
  }

  get httpTableOptionsConfig() {

    let queryParameters = new Map<string, any>;
    let queryParametersAlias = new Map<string, any>;

    queryParametersAlias.set('size', 'per_page');
    queryParametersAlias.set('page', 'page');

    //With serverHttp value, rows property doesn't need
    let tableOptions: EntityMatTableOptions<Element> = {
      queryParameters: queryParameters,
      serverHttp: this.buildHttpCall.bind(this),
      showSelection: true,
      transcoder: this.transcoder.bind(this),
      paginator: {
        show: true,
        size: [1, 2, 3],
        default: 1,
        sizePage: 3,
        queryParametersAlias
      },
      columns: [
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
    };

    return tableOptions;
  }

  private parseSdkTransconder(res: any) {

    const paginationRes: EntityMatTablePaginationRes<Ex> = new EntityMatTablePaginationRes<Ex>();
    paginationRes.totalPages = res.totalPage;
    paginationRes.data = res.data;
    paginationRes.perPage = res.pageSize;
    paginationRes.page = res.currentPage;
    paginationRes.total = res.count;

    return paginationRes;
  }

  private transcoder(res: any) {

    const paginationRes: EntityMatTablePaginationRes<Ex> = new EntityMatTablePaginationRes<Ex>();
    paginationRes.totalPages = res.total_pages;
    paginationRes.data = res.data;
    paginationRes.perPage = res.per_page;
    paginationRes.page = res.page;
    paginationRes.total = res.total;

    return paginationRes;
  }

  /**
   * Function to construct an http call. This is the callback passed as a parameter to tableOptions in serverHttp.
   * If our server indicates the page size parameter with alias 'elementPerPage' then inside 'queryAliasParameter' we need to add aliasParameter page -> per_page
   * @param params
   */
  public buildHttpCall(params = {}) {
    return this.http.get('https://reqres.in/api/users', {
      params
    });
  }

  public parseSdkCall(params: any = {}) {

    //@ts-ignore
    return new Observable(async (observer) => {

      const query = new Parse.Query("Invoice");

      var page = params['page'];

      // How much you want on a page
      var displayLimit = params['displayLimit'];

      // Get the count on a collection
      var count: number = await query.count();

      const skip = page * displayLimit;

      query.descending('updatedAt');
      query.limit(displayLimit);
      query.skip(skip);

      // So with this above code, on page 0, you will get 50 results and skip 0 records.
      // If your page var is 1, you'll skip the first 50 and get 50 results starting at 51
      // So on so forth...

      query.find().then((res) => {

        let response = {
          totalPage: Math.ceil(count / displayLimit),
          data: res.map((item: any) => {
            let json = item.toJSON();
            json['ref'] = item;
            return json;
          }),
          pageSize: displayLimit,
          currentPage: Math.ceil(count / skip),
          count
        }

        observer.next(response);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  initParseSdk() {

    // @ts-ignore
    Parse.serverURL = 'XXXX';
    Parse.initialize('XXXX', 'XXXX');
    // @ts-ignore
    Parse.masterKey = 'XXXX';
  }
}
