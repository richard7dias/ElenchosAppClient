import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { BalancesTable } from '../table-interfaces/balances-table.interface';
import { Balance } from 'src/app/core/interfaces/balance.interface';
import { NumberService } from 'src/app/shared/formatting/number.service';
import { ApiBalancesService } from 'src/app/core/api/balances/api-balances.service';
import { HttpResponse } from '@angular/common/http';
import { InternalBalancesService } from 'src/app/shared/internal-values/internal-balances/internal-balances.service';

@Component({
  selector: 'app-balances-table',
  templateUrl: './balances-table.component.html',
  styleUrls: ['./balances-table.component.css']
})
export class BalancesTableComponent implements AfterViewInit {

  internalBalances!: Balance[];

  @ViewChild(MatSort) sort!: MatSort;

  tableDataApi: BalancesTable[] = [
    { account: 'Nubank', valueBalance: 3456.23 },
    { account: 'Itaú', valueBalance: 1231313 },
    { account: 'Santander', valueBalance: 23 },
    { account: 'Bradesco', valueBalance: 67 },
  ];

  displayedColumns: string[] = ['account', 'valueBalance'];
  dataSource = new MatTableDataSource(this.tableDataApi);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public _numberFormat: NumberService,
    private _apiBalances: ApiBalancesService,
    private _internalBalances: InternalBalancesService
  ) { }

  ngOnInit() {

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
    return this._numberFormat.inPortToDuo(this.tableDataApi
      .map(obj => obj.valueBalance)
      .reduce((acc, value) => acc + value, 0
      )
    );
  }
}
