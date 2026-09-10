import { Component, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NumberService } from 'src/app/shared/formatting/number/number.service';
import { InternalDateService } from 'src/app/shared/internal-values/internal-date/internal-date.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

import { Category } from 'src/app/core/interfaces/categories/category.interface';
import { Launch } from 'src/app/core/interfaces/launches/launch.interface';
import { Entry } from 'src/app/core/interfaces/entries/entry.interface';

import { ApiCategoriesService } from 'src/app/core/api/categories/api-categories.service';
import { ApiLaunchesService } from 'src/app/core/api/launches/api-launches.service';
import { ApiEntriesService } from 'src/app/core/api/entries/api-entries.service';

import { InternalCategoriesService } from 'src/app/shared/internal-values/internal-categories/internal-categories.service';
import { InternalLaunchesService } from 'src/app/shared/internal-values/internal-launches/internal-launches.service';
import { InternalEntriesService } from 'src/app/shared/internal-values/internal-entries/internal-entries.service';

interface CategorySpend {
  name: string;
  value: number;
}

const MAX_CATEGORY_BARS = 6;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {

  private _destroy$ = new Subject<void>();

  hasCategories = false;
  budgetTotal = 0;
  expenseTotal = 0;
  availableTotal = 0;
  budgetUsedPercent = 0;
  isOverBudget = false;
  overBudgetValue = 0;

  hasCashFlowData = false;
  entriesTotal = 0;
  launchesTotal = 0;
  monthBalance = 0;
  cashFlowMaxValue = 0;

  hasCategorySpend = false;
  categorySpend: CategorySpend[] = [];
  categorySpendMax = 0;

  private pendingRequests = 0;

  constructor(
    public _numberFormat: NumberService,
    public _internalDate: InternalDateService,
    private _loadingBar: LoadingService,
    private _apiCategories: ApiCategoriesService,
    private _apiLaunches: ApiLaunchesService,
    private _apiEntries: ApiEntriesService,
    private _internalCategories: InternalCategoriesService,
    private _internalLaunches: InternalLaunchesService,
    private _internalEntries: InternalEntriesService
  ) { }

  ngOnInit() {
    // Deferred to a new macrotask so the loading bar toggle below doesn't land inside the
    // change-detection cycle still finishing the router navigation into this page (NG0100).
    setTimeout(() => {
      this.searchCategories();
      this.searchLaunches();
      this.searchEntries();
    });

    combineLatest([
      this._internalCategories.getInternalCategories(),
      this._internalLaunches.getInternalLaunchesByCurrentMonth(),
      this._internalEntries.getInternalEntriesByCurrentMonth()
    ]).pipe(takeUntil(this._destroy$)).subscribe(([categories, launchesMonth, entriesMonth]) => {
      this.buildBudgetChart(categories);
      this.buildCashFlowChart(entriesMonth, launchesMonth);
      this.buildCategorySpendChart(launchesMonth);
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  barWidthPercent(value: number, max: number): number {
    if (max <= 0 || value <= 0) {
      return 0;
    }
    return Math.max((value / max) * 100, 2);
  }

  private searchCategories() {
    this._internalCategories.getInternalCategories().pipe(takeUntil(this._destroy$)).subscribe(categories => {
      if (!categories) {
        this.callApiCategories();
      }
    });
  }

  private searchLaunches() {
    this._internalLaunches.getInternalLaunches().pipe(takeUntil(this._destroy$)).subscribe(launches => {
      if (!launches) {
        this.callApiLaunches();
      }
    });
  }

  private searchEntries() {
    this._internalEntries.getInternalEntries().pipe(takeUntil(this._destroy$)).subscribe(entries => {
      if (!entries) {
        this.callApiEntries();
      }
    });
  }

  private beginLoading() {
    this.pendingRequests++;
    if (this.pendingRequests === 1) {
      this._loadingBar.setLoadingBar(true);
    }
  }

  private endLoading() {
    this.pendingRequests = Math.max(this.pendingRequests - 1, 0);
    if (this.pendingRequests === 0) {
      this._loadingBar.setLoadingBar(false);
    }
  }

  private callApiCategories() {
    this.beginLoading();
    this._apiCategories.getCategories().subscribe((response: HttpResponse<Category[]>) => {
      if (response.body) {
        this._internalCategories.setInternalCategories(response.body);
      }
      this.endLoading();
    });
  }

  private callApiLaunches() {
    this.beginLoading();
    this._apiLaunches.getLaunches().subscribe((response: HttpResponse<Launch[]>) => {
      if (response.body) {
        this._internalLaunches.setInternalLaunches(response.body);
      }
      this.endLoading();
    });
  }

  private callApiEntries() {
    this.beginLoading();
    this._apiEntries.getEntries().subscribe((response: HttpResponse<Entry[]>) => {
      if (response.body) {
        this._internalEntries.setInternalEntries(response.body);
      }
      this.endLoading();
    });
  }

  private buildBudgetChart(categories: Category[] | null) {
    this.hasCategories = !!categories && categories.length > 0;

    if (!categories || categories.length === 0) {
      this.budgetTotal = 0;
      this.expenseTotal = 0;
      this.availableTotal = 0;
      this.budgetUsedPercent = 0;
      this.isOverBudget = false;
      this.overBudgetValue = 0;
      return;
    }

    this.budgetTotal = categories.map(category => category.budget || 0).reduce((acc, value) => acc + value, 0);
    this.expenseTotal = categories.map(category => category.expense || 0).reduce((acc, value) => acc + value, 0);
    this.availableTotal = categories.map(category => category.available || 0).reduce((acc, value) => acc + value, 0);

    this.isOverBudget = this.availableTotal < 0;
    this.overBudgetValue = this.isOverBudget ? Math.abs(this.availableTotal) : 0;

    this.budgetUsedPercent = this.budgetTotal > 0
      ? Math.min((this.expenseTotal / this.budgetTotal) * 100, 100)
      : (this.expenseTotal > 0 ? 100 : 0);
  }

  private buildCashFlowChart(entriesMonth: Entry[] | null, launchesMonth: Launch[] | null) {
    this.entriesTotal = entriesMonth ? entriesMonth.map(entry => entry.value || 0).reduce((acc, value) => acc + value, 0) : 0;
    this.launchesTotal = launchesMonth ? launchesMonth.map(launch => launch.value || 0).reduce((acc, value) => acc + value, 0) : 0;
    this.monthBalance = this.entriesTotal - this.launchesTotal;
    this.cashFlowMaxValue = Math.max(this.entriesTotal, this.launchesTotal);
    this.hasCashFlowData = this.entriesTotal > 0 || this.launchesTotal > 0;
  }

  private buildCategorySpendChart(launchesMonth: Launch[] | null) {
    if (!launchesMonth || launchesMonth.length === 0) {
      this.categorySpend = [];
      this.categorySpendMax = 0;
      this.hasCategorySpend = false;
      return;
    }

    const totalsByCategory = new Map<string, number>();
    launchesMonth.forEach(launch => {
      const current = totalsByCategory.get(launch.categoryName) || 0;
      totalsByCategory.set(launch.categoryName, current + (launch.value || 0));
    });

    let sorted: CategorySpend[] = Array.from(totalsByCategory, ([name, value]) => ({ name, value }))
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value);

    if (sorted.length > MAX_CATEGORY_BARS) {
      const top = sorted.slice(0, MAX_CATEGORY_BARS - 1);
      const othersValue = sorted.slice(MAX_CATEGORY_BARS - 1).reduce((acc, item) => acc + item.value, 0);
      sorted = [...top, { name: 'Outras', value: othersValue }];
    }

    this.categorySpend = sorted;
    this.categorySpendMax = sorted.length > 0 ? sorted[0].value : 0;
    this.hasCategorySpend = sorted.length > 0;
  }
}
