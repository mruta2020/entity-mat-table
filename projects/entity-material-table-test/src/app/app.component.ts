import {Component, OnInit, ViewChild} from '@angular/core';
import {
  EntityMatTableOptions, EntityTableColumn
} from "../../../entity-material-table/src/lib/model/entity-mat-table-options";
import {HttpClient} from "@angular/common/http";
import {EntityMaterialTableComponent} from "entity-material-table";
import {DataService} from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('libEntityMaterialTable') appFoo: EntityMaterialTableComponent<Ex>;
  @ViewChild(EntityMaterialTableComponent) entityMaterialTableComponent: EntityMaterialTableComponent<Ex>;

  //@ts-ignore
  tableOptions: EntityMatTableOptions = {};
  type: 'SYNC' | 'ASYNC' = 'SYNC';
  asyncSource: 'HTTP' | 'SDK' = 'HTTP';

  constructor(private dataService: DataService) {
    this.dataService.initParseSdk();
  }

  ngOnInit(): void {
    this.onInitOptions();
  }

  onExport() {
    this.entityMaterialTableComponent.onExportExcel();
  }

  onInitOptions() {
    switch (this.type) {
      case 'SYNC':
        this.tableOptions = this.dataService.syncDataConfig;
        break;
      case 'ASYNC':
        this.tableOptions = this.dataService.geFactoryAsyncData(this.asyncSource);
        break;
    }
  }

  onDelete(row: any) {
    console.log(row);
  }

  onSelected(row: any) {
    console.log(row);
  }

  onSelectionChange(selection: any) {
    console.log(selection);
  }

}


export interface Ex {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export enum SERVER_TYPE {
  HTTP = "HTTP",
  PARSE_SDK = "PARSE_SDK"
}

export interface ServerConfig {
  http: Function;
  transcoder: Function;
  aliasParameters: Map<string, string>;
  pageDefaultIndex: number;
  columns: EntityTableColumn[]
}
