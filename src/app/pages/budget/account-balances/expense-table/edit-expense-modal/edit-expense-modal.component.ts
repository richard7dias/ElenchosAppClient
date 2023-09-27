import { HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiSourceExpenseService } from 'src/app/core/api/source-expense/api-source-expense.service';
import { SourceExpense } from 'src/app/core/interfaces/sourceExpense.interface';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { InternalExpensesService } from 'src/app/shared/internal-values/internal-expenses/internal-expenses.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-edit-expense-modal',
  templateUrl: './edit-expense-modal.component.html',
  styleUrls: ['./edit-expense-modal.component.css']
})
export class EditExpenseModalComponent {

  expenseDescriptionInput!: string;
  expenseValueInput!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _internalExpenses: InternalExpensesService,
    private _apiExpenses: ApiSourceExpenseService,
    private _loadingBar: LoadingService,
    private _alert: AlertService,
    private _modalRef: MatDialogRef<EditExpenseModalComponent>,
  ) { }

  ngOnInit() {
    this.expenseDescriptionInput = this._data.description;
    this.expenseValueInput = this._data.valueExpense;
  }

  submitForm(): void {
    if (this.expenseDescriptionInput && this.expenseValueInput) {

      let expenseEdited: SourceExpense = {
        id: this._data.id,
        idOwner: this._data.idOwner,
        description: this.expenseDescriptionInput,
        valueExpense: this.expenseValueInput
      }

      this._loadingBar.setLoadingBar(true);
      this._apiExpenses.patchSourceExpense(this._data.id, expenseEdited).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 200) {
            this._alert.openSnackBar(response.body.message);
            this.updateExpenses();
            this._modalRef.close(true);
          }
        },
        (response) => {
          console.log(response)
          this._alert.openSnackBar(response.error.message);
        }
      );
      this._loadingBar.setLoadingBar(false);

    } else {
      this._alert.openSnackBar('Preencha todos os campos necessários!')
    }
  }

  updateExpenses() {
    this._apiExpenses.getSourceExpenses().subscribe(
      (response: HttpResponse<SourceExpense[]>) => {
        if (response.body) {
          this._internalExpenses.setInternalExpenses(response.body);
        }
      }
    );
  }
}
