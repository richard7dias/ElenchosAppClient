import { HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ApiLaunchesService } from 'src/app/core/api/launches/api-launches.service';
import { Launch } from 'src/app/core/interfaces/launches/launch.interface';
import { NumberService } from 'src/app/shared/formatting/number/number.service';
import { InternalLaunchesService } from 'src/app/shared/internal-values/internal-launches/internal-launches.service';
import { EditLaunchModalComponent } from '../edit-launch-modal/edit-launch-modal.component';
import { DeleteLaunchModalComponent } from '../delete-launch-modal/delete-launch-modal.component';
import { InternalDateService } from 'src/app/shared/internal-values/internal-date/internal-date.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';


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
    public _numberFormat: NumberService,
    private _apiLaunches: ApiLaunchesService,
    private _internalLaunches: InternalLaunchesService,
    private _dialog: MatDialog,
    public _internalDate: InternalDateService,
    private _loadingBar: LoadingService
  ) { }

  ngOnInit() {
    this._internalLaunches.getInternalLaunchesByCurrentMonth().subscribe(launches => {
      if (!launches) {
        this.callApiLaunches();
      }
    });

    this.updateInternalLaunchesReloadPage();
  }

  ngDoCheck() {
    this.dataSource.data = this.internalLaunches;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  callApiLaunches() {
    this._loadingBar.setLoadingBar(true);
    this._apiLaunches.getLaunches().subscribe(
      (response: HttpResponse<Launch[]>) => {
        if (response.body) {
          this._internalLaunches.setInternalLaunches(response.body);
          this._loadingBar.setLoadingBar(false);
        }
      }
    );
  }

  updateInternalLaunchesReloadPage() {
    this._internalLaunches.getInternalLaunchesByCurrentMonth().subscribe(launches => {
      if (launches) {
        this.internalLaunches = launches;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModalEditLaunch(launch: Launch) {
    this._dialog.open(EditLaunchModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
      data: launch
    });
  }

  openModalDeleteLaunch(launch: Launch) {
    this._dialog.open(DeleteLaunchModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
      data: launch
    });
  }
}