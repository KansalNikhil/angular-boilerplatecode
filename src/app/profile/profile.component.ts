import { Component, signal, inject, AfterViewInit, ViewChild, OnInit, AfterContentInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {Sort, MatSortModule, MatSort} from '@angular/material/sort';
import { Dessert } from '../models/api-response';
import * as XLSX from 'xlsx';
import saveAs from 'file-saver';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LoadingService } from '../loading.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { filter, timeout } from 'rxjs';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

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
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements AfterViewInit {
  readonly panelOpenState = signal(false);
  value:string|null = null;
  private _snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['fat', 'name', 'carbs', 'calories'];
  dataSource: MatTableDataSource<Dessert>;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  async openSnackBar(message: string, action: string) {
    this._snackBar.open("message", "action", {
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

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
  ];

  lastPage(){
    this.paginator.lastPage();
  }

  firstPage(){
    this.paginator.firstPage();
  }

  // sortedData: Dessert[];

  constructor(private loadingService: LoadingService) {
    // this.sortedData = this.desserts.slice();

    this.dataSource = new MatTableDataSource(this.desserts);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log("start");
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }, 100);
    // console.log("start");
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  // ngAfterContentInit() {
  //   console.log("start");
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  // ngOnInit(): void {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  toggleLoading() {
    var cur = this.loadingService.toggleLoading();
    // console.log(cur);
    if(cur){
      this.loadingService.setLoading(false); // Change state from Profile
    }
    else{
      this.loadingService.setLoading(true);
    }
  }
  // sortData(sort: Sort) {
  //   this.loadingService.setLoading(true);
  //   const data = this.desserts.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.sortedData = data;
  //     this.loadingService.setLoading(false);
  //     return;
  //   }

  //   this.sortedData = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'name':
  //         return compare(a.name, b.name, isAsc);
  //       case 'calories':
  //         return compare(a.calories, b.calories, isAsc);
  //       case 'fat':
  //         return compare(a.fat, b.fat, isAsc);
  //       case 'carbs':
  //         return compare(a.carbs, b.carbs, isAsc);
  //       case 'protein':
  //         return compare(a.protein, b.protein, isAsc);
  //       default:
  //         return 0;
  //     }
  //   });
  //   this.loadingService.setLoading(false);
  // }

  downloadExcel() {
    console.log(this.dataSource);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.filteredData);
    // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.desserts);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write file and trigger download
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'table_data.xlsx');
    // FileSaver.saveAs(data, 'table_data.xlsx');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearSearch(){
    const filterValue = "";
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}