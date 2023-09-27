import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Balance } from 'src/app/core/interfaces/balance.interface';
import { NumberService } from 'src/app/shared/formatting/number/number.service';
import { ApiBalancesService } from 'src/app/core/api/balances/api-balances.service';
import { HttpResponse } from '@angular/common/http';
import { InternalBalancesService } from 'src/app/shared/internal-values/internal-balances/internal-balances.service';
import { MatDialog } from '@angular/material/dialog';
import { NewBalanceModalComponent } from './new-balance-modal/new-balance-modal.component';
import { EditBalanceModalComponent } from './edit-balance-modal/edit-balance-modal.component';
import { DeleteBalanceModalComponent } from './delete-balance-modal/delete-balance-modal.component';
import { LoadingService } from 'src/app/shared/loading/loading.service';

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
    public _numberFormat: NumberService,
    private _apiBalances: ApiBalancesService,
    private _internalBalances: InternalBalancesService,
    private _dialog: MatDialog,
    private _loadingBar: LoadingService
  ) { }

  ngOnInit() {
    this._internalBalances.getInternalBalances().subscribe(balances => {
      if (balances) {
        this.internalBalances = balances;
      } else {
        this._loadingBar.setLoadingBar(true);
        this._apiBalances.getBalances().subscribe(
          (response: HttpResponse<Balance[]>) => {
            if (response.body) {
              this._internalBalances.setInternalBalances(response.body);
              this.internalBalances = response.body;
            }
          }
        );
        this._loadingBar.setLoadingBar(false);
      }
    });
  }

  ngDoCheck() {
    this.dataSource.data = this.internalBalances;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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
