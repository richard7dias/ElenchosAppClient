import { HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { NumberService } from 'src/app/shared/formatting/number/number.service';
import { InternalDateService } from 'src/app/shared/internal-values/internal-date/internal-date.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { EditEntriesModalComponent } from '../edit-entries-modal/edit-entries-modal.component';
import { DeleteEntriesModalComponent } from '../delete-entries-modal/delete-entries-modal.component';
import { Entry } from 'src/app/core/interfaces/entries/entry.interface';
import { ApiEntriesService } from 'src/app/core/api/entries/api-entries.service';
import { InternalEntriesService } from 'src/app/shared/internal-values/internal-entries/internal-entries.service';
import { PayedEntryModalComponent } from '../payed-entry-modal/payed-entry-modal.component';


@Component({
  selector: 'app-entries-launches-table',
  templateUrl: './entries-launches-table.component.html',
  styleUrls: ['./entries-launches-table.component.css']
})
export class EntriesLaunchesTableComponent {

  @ViewChild(MatSort) sort!: MatSort;

  internalEntries!: Entry[];

  displayedColumns: string[] = ['date', 'description', 'payer', 'value', 'itens'];
  dataSource = new MatTableDataSource(this.internalEntries);

  constructor(
    public _numberFormat: NumberService,
    private _apiEntries: ApiEntriesService,
    private _internalEntries: InternalEntriesService,
    private _dialog: MatDialog,
    public _internalDate: InternalDateService,
    private _loadingBar: LoadingService
  ) { }

  ngOnInit() {
    this._internalEntries.getInternalEntries().subscribe(entries => {
      if (!entries) {
        this.callApiEntries();
      }
    });

    this.updateInternalEntriesReloadPage();
  }

  ngDoCheck() {
    if (this.internalEntries) {
      this.dataSource.data = this.internalEntries.filter(entry => entry.payed === false);
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  callApiEntries() {
    this._loadingBar.setLoadingBar(true);
    this._apiEntries.getEntries().subscribe(
      (response: HttpResponse<Entry[]>) => {
        if (response.body) {
          this._internalEntries.setInternalEntries(response.body);
        }
      }
    );
    this._loadingBar.setLoadingBar(false);
  }

  updateInternalEntriesReloadPage() {
    this._internalEntries.getInternalEntries().subscribe(entries => {
      if (entries) {
        this.internalEntries = entries;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModalPayedEntry(entry: Entry) {
    this._dialog.open(PayedEntryModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
      data: entry
    });
  }

  openModalEditEntry(entry: Entry) {
    this._dialog.open(EditEntriesModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
      data: entry
    });
  }

  openModalDeleteEntry(entry: Entry) {
    this._dialog.open(DeleteEntriesModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
      data: entry
    });
  }
}