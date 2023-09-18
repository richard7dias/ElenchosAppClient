import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Balance } from 'src/app/core/interfaces/balance.interface';
import { NumberService } from 'src/app/shared/formatting/number.service';
import { ApiBalancesService } from 'src/app/core/api/balances/api-balances.service';
import { HttpResponse } from '@angular/common/http';
import { InternalBalancesService } from 'src/app/shared/internal-values/internal-balances/internal-balances.service';
import { MatDialog } from '@angular/material/dialog';
import { NewBalanceModalComponent } from './new-balance-modal/new-balance-modal.component';
import { EditBalanceModalComponent } from './edit-balance-modal/edit-balance-modal.component';
import { DeleteBalanceModalComponent } from './delete-balance-modal/delete-balance-modal.component';

@Component({
  selector: 'app-balances-table',
  templateUrl: './balances-table.component.html',
  styleUrls: ['./balances-table.component.css']
})
export class BalancesTableComponent implements AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;

  internalBalances!: Balance[];

  displayedColumns: string[] = ['account', 'valueBalance', 'itens'];
  dataSource = new MatTableDataSource(this.internalBalances);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public _numberFormat: NumberService,
    private _apiBalances: ApiBalancesService,
    private _internalBalances: InternalBalancesService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this._apiBalances.getBalances().subscribe(
      (response: HttpResponse<Balance[]>) => {
        if (response.body) {
          this._internalBalances.setInternalBalances(response.body);
        }
      }
    );

    this._internalBalances.getInternalBalances().subscribe(balances => {
      if (balances) {
        this.internalBalances = balances;
      }
    });
  }

  ngDoCheck() {
    this.dataSource.data = this.internalBalances;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  sortData(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getTotalValue() {
    if (this.internalBalances && this.internalBalances.length > 0) {
      return this._numberFormat.inPortToDuo(this.internalBalances
        .map(obj => obj.valueBalance)
        .reduce((acc, value) => acc + value, 0)
      );
    } else {
      return 0;
    }
  }

  openModalNewBalance() {
    this._dialog.open(NewBalanceModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
    });
  }

  openModalEditBalance(balance: Balance) {
    this._dialog.open(EditBalanceModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
      data: balance
    });
  }

  openModalDeleteBalance(balance: Balance) {
    this._dialog.open(DeleteBalanceModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
      data: balance
    });
  }
}
