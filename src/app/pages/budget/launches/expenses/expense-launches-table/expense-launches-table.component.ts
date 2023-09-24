import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ApiLaunchesService } from 'src/app/core/api/launches/api-launches.service';
import { Launch } from 'src/app/core/interfaces/launch.interface';
import { NumberService } from 'src/app/shared/formatting/number/number.service';
import { InternalLaunchesService } from 'src/app/shared/internal-values/internal-launches/internal-launches.service';
import { EditLaunchModalComponent } from '../edit-launch-modal/edit-launch-modal.component';
import { DeleteLaunchModalComponent } from '../delete-launch-modal/delete-launch-modal.component';
import { DateService } from 'src/app/shared/formatting/date/date.service';
import { InternalDateService } from 'src/app/shared/internal-values/internal-date/internal-date.service';


@Component({
  selector: 'app-expense-launches-table',
  templateUrl: './expense-launches-table.component.html',
  styleUrls: ['./expense-launches-table.component.css']
})
export class ExpenseLaunchesTableComponent {

  @ViewChild(MatSort) sort!: MatSort;

  internalLaunches!: Launch[];

  displayedColumns: string[] = ['date', 'description', 'categoryName', 'value', 'itens'];
  dataSource = new MatTableDataSource(this.internalLaunches);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public _numberFormat: NumberService,
    private _apiLaunches: ApiLaunchesService,
    private _internalLaunches: InternalLaunchesService,
    private _dialog: MatDialog,
    private _dateFormat: DateService,
    public _internalDate: InternalDateService
  ) { }

  ngOnInit() {
    this._apiLaunches.getLaunches().subscribe(
      (response: HttpResponse<Launch[]>) => {
        if (response.body) {
          this._internalLaunches.setinternalLaunches(response.body);
        }
      }
    );

    this._internalLaunches.getinternalLaunches().subscribe(launches => {
      if (launches) {
        this.internalLaunches = launches
          .reverse()
          .filter(launch => {
            const launchMonth = parseInt(this._dateFormat.datePtBr(launch.date).split('/')[1]);
            return launchMonth === this._internalDate.getCurrentMonthNumber();
          });

        this.internalLaunches.forEach(launch => {
          const newDate = this._dateFormat.datePtBr(launch.date);
          launch.date = newDate;
        });
      }
    });
  }

  ngDoCheck() {
    this.dataSource.data = this.internalLaunches;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openModalEditCategory(launch: Launch) {
    this._dialog.open(EditLaunchModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
      data: launch
    });
  }

  openModalDeleteCategory(launch: Launch) {
    this._dialog.open(DeleteLaunchModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
      data: launch
    });
  }
}


