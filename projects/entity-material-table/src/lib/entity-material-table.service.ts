import {Injectable} from '@angular/core';
import {EntityMatTableOptions} from "./model/entity-mat-table-options";
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class EntityMaterialTableService<T> {

  constructor() {
  }

  exportDataTableToExcel(data: T[], options: EntityMatTableOptions<T>){

    /* table id is passed over here */
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data.map((item: any) => {
      let j: any = {};
      for(let c of options.columns){
        j[c.label] = item[c.property];
      }
      return j;
    }));

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, options?.excelConfig?.sheetName || 'Sheet1');

    const fileName = options?.excelConfig?.fileName|| 'test';
    const extension = options?.excelConfig?.extension || 'xlsx';

    /* save to file */
    XLSX.writeFile(wb, [fileName, extension].join('.') );
  }

}
