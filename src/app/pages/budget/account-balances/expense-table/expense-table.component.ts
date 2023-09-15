import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SourceExpense } from 'src/app/core/interfaces/sourceExpense.interface';

import { NumberService } from 'src/app/shared/formatting/number.service';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css']
})
export class ExpenseTableComponent implements AfterViewInit {

  tableDataApi: SourceExpense[] = [
    { description: 'Cartão de crédito', valueExpense: 1000, idOwner: '', id: '' },
    { description: 'Mês', valueExpense: 203, idOwner: '', id: '' },
    { description: 'Dívidas', valueExpense: 2102, idOwner: '', id: '' }
  ];

  displayedColumns: string[] = ['description', 'valueExpense', 'itens'];
  dataSource = new MatTableDataSource(this.tableDataApi);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public _numberFormat: NumberService
  ) { }

  @ViewChild(MatSort) sort!: MatSort;

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
      .map(obj => obj.valueExpense)
      .reduce((acc, value) => acc + value, 0
      )
    );
  }

  editElement(element: SourceExpense) {
    console.log(element)
  }

  deleteElement(element: SourceExpense) {
    console.log(element)
  }
}