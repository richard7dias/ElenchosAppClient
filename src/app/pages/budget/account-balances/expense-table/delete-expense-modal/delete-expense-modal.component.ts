import { HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiSourceExpenseService } from 'src/app/core/api/source-expense/api-source-expense.service';
import { SourceExpense } from 'src/app/core/interfaces/sourceExpenses/sourceExpense.interface';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { InternalExpensesService } from 'src/app/shared/internal-values/internal-expenses/internal-expenses.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-delete-expense-modal',
  templateUrl: './delete-expense-modal.component.html',
  styleUrls: ['./delete-expense-modal.component.css']
})
export class DeleteExpenseModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _alert: AlertService,
    private _modalRef: MatDialogRef<DeleteExpenseModalComponent>,
    private _loadingBar: LoadingService,
    private _apiExpense: ApiSourceExpenseService,
    private _internalExpense: InternalExpensesService
  ) { }

  deleteExpense() {
    this._loadingBar.setLoadingBar(true);
    this._apiExpense.deleteSourceExpense(this._data.id).subscribe(
      (response: HttpResponse<any>) => {
        this._alert.openSnackBar(response.body.message);
        this.updateExpenses();
        this._loadingBar.setLoadingBar(false);
      },
      (response) => {
        this._alert.openSnackBar(response.error.message);
        this._loadingBar.setLoadingBar(false);
      }
    );
    this._modalRef.close(true);
  }

  updateExpenses() {
    this._apiExpense.getSourceExpenses().subscribe(
      (response: HttpResponse<SourceExpense[]>) => {
        if (response.body) {
          this._internalExpense.setInternalExpenses(response.body);
        }
      }
    );
  }
}
