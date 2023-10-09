# Entity Material Table

"entity-material-table" is an Angular custom component that simplify table creation based on entity data, with pagination.

## Installazione

To install the library use:

```shell
npm install entity-material-table
```

# Usage

To use the library in your project, follow these steps:

1. Importa il modulo EntityMaterialTableModule nella tua applicazione:

```shell
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

```shell
<entity-material-table [options]="tableOptions" (selected)="onRowSelected($event)"></entity-material-table>
```
3. Define the table options in your component

```shell
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

| Field              | Type                  | Description                                                                                             |
|--------------------|-----------------------|---------------------------------------------------------------------------------------------------------|
| `queryParameters`  | `Map<string, any>`    | A map of parameters to pass in the HTTP request to the server.                                          |
| `showSelection`    | `boolean`             | Indicates whether the row selection column should be displayed in the table.                           |
| `rows`             | `T[]`                 | An array of data (rows) to display in the table.                                                        |
| `serverHttp`       | `Function`            | A function that performs the HTTP request to the server to fetch table data.                             |
| `transcoder`       | `Function`            | A function that converts the server's HTTP response into table data.                                      |
| `paginator`        | `{ size: number[]; default: number; show: boolean, queryParametersAlias: Map<string, string> }` | Pagination options, including possible values for the number of rows per page, the default value, and whether pagination should be displayed. |
| `actions`          | `{ icon?: string; label?: string; callback(): void }[]` | An array of custom actions to display in the "Actions" column of the table. Each action can have an icon, a label, and a callback function. |
| `columns`          | `EntityTableColumn[]` | An array of objects defining the columns of the table. Each object contains information such as a label and property to display. |

# Contribute
If you wish to contribute to this library, please fork the repository and submit your pull requests. We welcome contributions from the community!

# Licenza
Please make sure to customize this README with specific information about your library, including installation instructions, usage, and any other necessary documentation.



