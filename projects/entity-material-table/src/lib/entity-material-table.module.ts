import { NgModule } from '@angular/core';
import { EntityMaterialTableComponent } from './entity-material-table.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {EntityMatTableActionComponent} from "./entity-mat-table-action/entity-mat-table-action.component";

@NgModule({
  declarations: [
    EntityMaterialTableComponent,
    EntityMatTableActionComponent
  ],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    CommonModule
  ],
  exports: [
    EntityMaterialTableComponent,
    EntityMatTableActionComponent
  ]
})
export class EntityMaterialTableModule { }
