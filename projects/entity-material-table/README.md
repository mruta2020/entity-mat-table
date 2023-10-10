# Entity Material Table

"entity-material-table" is an Angular custom component that simplify table creation based on entity data, with pagination.

## Installation

To install the library use:

```shell
npm install entity-material-table
```

# Usage

To use the library in your project, follow these steps:

1. Import EntityMaterialTableModule module into your module:

```typescript
import { EntityMaterialTableModule } from 'entity-material-table';

@NgModule({
  imports: [
    // ...
    EntityMaterialTableModule
  ],
  // ...
})
export class AppModule { }
```
2. In your component, use the entity-material-table component in your HTML template

```typescript
<entity-material-table [options]="tableOptions" (selected)="onRowSelected($event)"></entity-material-table>
```
3. Define the table options in your component

```typescript
import { EntityMatTableOptions } from 'entity-material-table';

@Component({
  // ...
})
export class YourComponent {
  tableOptions: EntityMatTableOptions<any> = {
    // Configura le opzioni della tabella qui
  };

  onRowSelected(row: any) {
    // Gestisci l'evento di selezione della riga qui
  }
}
```

EntityMatTableOptions

| Field             | Type                | Description                                                                                                                                   |
|-------------------|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `queryParameters` | `Map<string, any>`  | A map of parameters to pass in the HTTP request to the server.                                                                                |
| `showSelection`   | `boolean`           | Indicates whether the row selection column should be displayed in the table.(default false)                                                   |
| `rows`            | `T[]`               | An array of data (rows) to display in the table.                                                                                              |
| `serverHttp`      | `Function`          | A function that performs the HTTP request to the server to fetch table data.                                                                  |
| `transcoder`      | `Function`          | A function that converts the server's HTTP response into table data.                                                                          |
| `paginator`       | `EntityMatTablePaginator` | Pagination options, including possible values for the number of rows per page, the default value, and whether pagination should be displayed. |
| `actions`         | `EntityMatTableAction[]` | An array of custom actions to display in the "Actions" column of the table. Each action can have an icon, a label, and a callback function.   |
| `columns`         | `EntityTableColumn[]` | An array of objects defining the columns of the table. Each object contains information such as a label and property to display.              |
| `excelConfig`     | `EntityMatTableExcelConfig` | Configure options to export data in xlsx or csv                                                                                               |

EntityMatTablePaginator

| Field        | Type                                                                                            | Description                                                                                                                                                                                        |
|--------------|-------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `size`       | `number[]`                                                                                      | Paginator range size                                                                                                                                                                               |
| `default`    | `number`                                                                                        | Page index default. Some servers have the value 0 setted as first index page, other 1                                                                                                              |
| `show`       | `boolean`                                                                                       | Display validator (default false).                                                                                                                                                                 |
| `queryParametersAlias` | `Map<string, any>`                                                                                      | A map that defines how replace the paginator pageSize and pageIndex parameters. Their name are replaced before call the function passed to serverHttp. the necessary parameters are `page` and `size` |

EntityMatTableAction

| Field         | Type               | Description |
|---------------|--------------------|----------|
| `templateRef` | `string`           | Template |

EntityMatTableExcelConfig

| Field         | Type     | Description                   |
|---------------|----------|-------------------------------|
| `extension` | `string` | File extension (default xlsx) |
| `sheetName` | `string` | Generated sheet name          |
| `fileName` | `string` | Generated file name           |


# Component attributes

| Field     | Type                             | Description                                                                                          |
|-----------|----------------------------------|------------------------------------------------------------------------------------------------------|
| `options` | `@Input<EntityMatTableOptions>`  | Options to configure component                                                                       |
| `selected` | `@Output<EntityMatTableOptions>` | Emit the table selected row                                                                          |
| `onSelection` | `@Output<EntityMatTableOptions>`   | Emit the rows selected by checkbox in selection column. It works with options.showSelection setted true. |

# Example usage

See Test project to learn how use library with async or sync data. Here a small recap for async data usage

```typescript
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
```

After you define call http with httpClient, you can pass the returned observable to serverHttp. This is an example of tableOptions config

```typescript
get httpTableOptionsConfig() {

  let queryParameters = new Map<string, any>;
  let queryParametersAlias = new Map<string, any>;

  queryParametersAlias.set('size', 'per_page');
  queryParametersAlias.set('page', 'page');

  //With serverHttp value, rows property doesn't need
  let tableOptions: EntityMatTableOptions<Element> = {
    queryParameters: queryParameters,
    serverHttp: this.buildHttpCall,
    showSelection: true,
    transcoder: this.transcoder,
    paginator: {
      show: true,
      size: [1, 2, 3],
      default: 1,
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
```

# Angular Theme CSS

To display Angular theme style you need to import stylesheet inside your application.
Normally the style is added inside `angular.json`

```json
   "styles": [
      ...,
      "node_modules/@angular/material/prebuilt-themes/indigo-pink.css"
   ]
```

# Export excel

Excel export functionality need a templateRef to work, through the @ViewChild usage.

Define your HTML with button, icon or what do you want. The main purpose is call the function onExportExcel.

HTML

```html
<div>
    <button (click)="entityMaterialTableComponent.onExportExcel()">Export csv</button>
</div>
<entity-material-table [options]="tableOptions" (onSelection)="onSelectionChange($event)"></entity-material-table>
```

TS
```javascript
@ViewChild(EntityMaterialTableComponent) entityMaterialTableComponent: EntityMaterialTableComponent<Ex>;
```



# Cell template
The Table renders cells as string value. You could pass a Pipe to transform the value for single cell.
If you want to customize cell template, you must define a cellTemplate inside your code.

Pipe usage

```typescript
config.columns = [
  {
    label: 'Id',
    property: 'objectId'
  },
  {
    label: 'Amount ($)',
    property: 'amount',
    pipe: {
      ref: new CurrencyPipe('en-US'),
      args: ['EUR']
    }
  }
];
```

Custom template

```html
<entity-material-table [options]="tableOptions" (onSelection)="onSelectionChange($event)">
    <ng-template #cellTemplate let-element let-property="property">
        <div *ngIf="property != 'actions'">{{element[property]}}</div>
        <div *ngIf="property == 'actions'">
            <div>
                <button (click)="onDelete(element)">cancella</button>
            </div>
        </div>
    </ng-template>
</entity-material-table>
```

# Demo App
For more example explore my [demo app](https://github.com/mruta2020/entity-mat-table/tree/master/projects/entity-material-table-test/src/app)

# Contribute
If you wish to contribute to this library, please fork the repository and submit your pull requests. We welcome contributions from the community!

# Licenza
Please make sure to customize this README with specific information about your library, including installation instructions, usage, and any other necessary documentation.



