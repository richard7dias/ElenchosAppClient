import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiSourceExpenseService } from 'src/app/core/api/source-expense/api-source-expense.service';
import { SourceExpense } from 'src/app/core/interfaces/sourceExpenses/sourceExpense.interface';
import { User } from 'src/app/core/interfaces/users/user.interface';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { InternalExpensesService } from 'src/app/shared/internal-values/internal-expenses/internal-expenses.service';
import { InternalUserService } from 'src/app/shared/internal-values/internal-user/internal-user.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-new-expense-modal',
  templateUrl: './new-expense-modal.component.html',
  styleUrls: ['./new-expense-modal.component.css']
})
export class NewExpenseModalComponent implements OnDestroy {

  private _destroy$ = new Subject<void>();

  internalUser!: User;
  internalExpenses!: SourceExpense[];

  expenseDescriptionInput!: string;
  expenseValueInput!: number;

  constructor(
    private _internalExpenses: InternalExpensesService,
    private _apiExpenses: ApiSourceExpenseService,
    private _loadingBar: LoadingService,
    private _alert: AlertService,
    private _internalUser: InternalUserService,
    private _modalRef: MatDialogRef<NewExpenseModalComponent>,
  ) { }

  ngOnInit() {
    this._internalUser.getInternalUser().pipe(takeUntil(this._destroy$)).subscribe(internalUser => {
      if (internalUser) {
        this.internalUser = internalUser;
      }
    });

    this._internalExpenses.getInternalExpenses().pipe(takeUntil(this._destroy$)).subscribe(internalExpenses => {
      if (internalExpenses) {
        this.internalExpenses = internalExpenses;
      }
    }
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  submitForm(): void {
    if (this.expenseDescriptionInput && this.expenseValueInput) {
      let newExpense: SourceExpense = {
        id: 'Feito na API',
        idOwner: this.internalUser.id,
        description: this.expenseDescriptionInput,
        valueExpense: this.expenseValueInput
      }

      this._loadingBar.setLoadingBar(true);
      this._apiExpenses.postSourceExpense(newExpense).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 201) {
            this._alert.openSnackBar(response.body.message);
            this._modalRef.close(true);

            this._apiExpenses.getSourceExpenses().subscribe(
              (expensesResponse: HttpResponse<SourceExpense[]>) => {
                this._internalExpenses.setInternalExpenses(expensesResponse.body);
                this._loadingBar.setLoadingBar(false);
              }
            );
          }
        },
        (response) => {
          this._alert.openSnackBar(response.error);
          this._loadingBar.setLoadingBar(false);
        }
      );

    } else {
      this._alert.openSnackBar('Preencha todos os campos necessários!')
    }
  }
}
