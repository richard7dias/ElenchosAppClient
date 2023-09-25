import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';

import { ApiCategoriesService } from 'src/app/core/api/categories/api-categories.service';
import { ApiLaunchesService } from 'src/app/core/api/launches/api-launches.service';
import { Category } from 'src/app/core/interfaces/category.interface';
import { Launch } from 'src/app/core/interfaces/launch.interface';
import { User } from 'src/app/core/interfaces/user.interface';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { InternalCategoriesService } from 'src/app/shared/internal-values/internal-categories/internal-categories.service';
import { InternalLaunchesService } from 'src/app/shared/internal-values/internal-launches/internal-launches.service';
import { InternalUserService } from 'src/app/shared/internal-values/internal-user/internal-user.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent {

  internalUser!: User;
  internalCategories!: Category[];

  dateInput: string = new Date().toISOString();
  descriptionInput!: string;
  categoryInput!: Category;
  valueInput!: number;

  constructor(
    private _internalUser: InternalUserService,
    private _apiCategories: ApiCategoriesService,
    private _internalCategories: InternalCategoriesService,
    private _apiLaunches: ApiLaunchesService,
    private _internalLaunches: InternalLaunchesService,
    private _loadingBar: LoadingService,
    private _alert: AlertService,
    private _renderer: Renderer2
  ) { }

  ngOnInit() {
    this.searchInternalCategories();

    this._internalUser.getInternalUser().subscribe(user => {
      if (user) {
        this.internalUser = user;
      }
    });

    this._renderer.selectRootElement('#descriptionInput').focus();
  }

  searchInternalCategories() {
    this._internalCategories.getInternalCategories().subscribe(categories => {
      if (categories) {
        this.internalCategories = categories;
      } else {
        this.callApiCategories();
      }
    });
  }

  callApiCategories() {
    this._apiCategories.getCategories().subscribe(
      (response: HttpResponse<Category[]>) => {
        this._internalCategories.setInternalCategories(response.body);
        this.searchInternalCategories();
      }
    );
  }

  newExpense() {
    if (this.dateInput && this.descriptionInput && this.categoryInput && this.valueInput) {
      let newLaunch: Launch = {
        idOwner: this.internalUser.id,
        id: 'Feito na API',
        date: this.dateInput,
        description: this.descriptionInput,
        categoryName: this.categoryInput.name,
        categoryId: this.categoryInput.id,
        value: this.valueInput
      }

      this._loadingBar.setLoadingBar(true);
      this._apiLaunches.postLaunch(newLaunch).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 201) {
            this._alert.openSnackBar(response.body.message);
            this.clearInputs();
          }
        },
        (response) => {
          this._alert.openSnackBar(response.error);
        }
      );
      this._loadingBar.setLoadingBar(false);

      this._apiLaunches.getLaunches().subscribe(
        (response: HttpResponse<Launch[]>) => {
          this._internalLaunches.setInternalLaunches(response.body);
        }
      );
    } else {
      this._alert.openSnackBar('Preencha todos os campos necessários!')
    }
  }

  clearInputs() {
    this.dateInput = new Date().toISOString();
    this.descriptionInput = '';
    this.categoryInput = null as any;
    this.valueInput = null as any;

    this._renderer.selectRootElement('#descriptionInput').focus();
  }
}
