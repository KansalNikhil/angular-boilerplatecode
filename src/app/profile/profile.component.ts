import { Component, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {Sort, MatSortModule} from '@angular/material/sort';
import { Dessert } from '../models/api-response';
import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import * as FileSaver from 'file-saver';
import saveAs from 'file-saver';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-profile',
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatCardModule,
    MatSortModule,
    MatTooltipModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  readonly panelOpenState = signal(false);
  value:string|null = null;


  desserts: Dessert[] = [
    {name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4, chestfat: 3, bodyfat: 3, height: 3, weight: 3, fatperc: 3},
    {name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4, chestfat: 3, bodyfat: 3, height: 3, weight: 3, fatperc: 3},
    {name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6, chestfat: 3, bodyfat: 3, height: 3, weight: 3, fatperc: 3},
    {name: 'Cupcake', calories: 305, fat: 4, carbs: 67, protein: 4, chestfat: 3, bodyfat: 3, height: 3, weight: 3, fatperc: 3},
    {name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 4, chestfat: 3, bodyfat: 3, height: 3, weight: 3, fatperc: 3},
    {name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4, chestfat: 3, bodyfat: 3, height: 3, weight: 3, fatperc: 3},
    {name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4, chestfat: 3, bodyfat: 3, height: 3, weight: 3, fatperc: 3},
    {name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6, chestfat: 3, bodyfat: 3, height: 3, weight: 3, fatperc: 3},
    {name: 'Cupcake', calories: 305, fat: 4, carbs: 67, protein: 4, chestfat: 3, bodyfat: 3, height: 3, weight: 3, fatperc: 3},
    {name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 4, chestfat: 3, bodyfat: 3, height: 3, weight: 3, fatperc: 3},
    {name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4, chestfat: 3, bodyfat: 3, height: 3, weight: 3, fatperc: 3},
    {name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4, chestfat: 3, bodyfat: 3, height: 3, weight: 3, fatperc: 3},
    {name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6, chestfat: 3, bodyfat: 3, height: 3, weight: 3, fatperc: 3},
    {name: 'Cupcake', calories: 305, fat: 4, carbs: 67, protein: 4, chestfat: 3, bodyfat: 3, height: 3, weight: 3, fatperc: 3},
    {name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 4, chestfat: 3, bodyfat: 3, height: 3, weight: 3, fatperc: 3},
  ];

  sortedData: Dessert[];

  constructor() {
    this.sortedData = this.desserts.slice();
  }

  sortData(sort: Sort) {
    const data = this.desserts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'calories':
          return compare(a.calories, b.calories, isAsc);
        case 'fat':
          return compare(a.fat, b.fat, isAsc);
        case 'carbs':
          return compare(a.carbs, b.carbs, isAsc);
        case 'protein':
          return compare(a.protein, b.protein, isAsc);
        default:
          return 0;
      }
    });
  }

  downloadExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.desserts);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write file and trigger download
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'table_data.xlsx');
    // FileSaver.saveAs(data, 'table_data.xlsx');
  }

}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}