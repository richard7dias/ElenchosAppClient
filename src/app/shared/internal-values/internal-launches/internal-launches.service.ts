import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Launch } from 'src/app/core/interfaces/launches/launch.interface';
import { DateService } from '../../formatting/date/date.service';
import { InternalDateService } from '../internal-date/internal-date.service';

@Injectable({
  providedIn: 'root'
})
export class InternalLaunchesService {
  private internalLaunches: BehaviorSubject<Launch[] | null> = new BehaviorSubject<Launch[] | null>(null);

  private internalLaunchesByCurrentMonth: BehaviorSubject<Launch[] | null> = new BehaviorSubject<Launch[] | null>(null);

  constructor(
    private _dateFormat: DateService,
    public _internalDate: InternalDateService
  ) { }

  setInternalLaunches(launches: Launch[] | null) {
    if (launches) {
      const launchesWithFormatedDate: Launch[] = this.formatDate(launches);
      this.internalLaunches.next(launchesWithFormatedDate);
      this.setInternalLaunchesByCurrentMonth(launchesWithFormatedDate);
    } else {
      this.internalLaunches.next(null);
      this.internalLaunchesByCurrentMonth.next(null);
    }
  }

  private setInternalLaunchesByCurrentMonth(launches: Launch[]) {
    this.internalLaunchesByCurrentMonth.next(launches.filter(launch => {
      const launchMonth = parseInt(launch.date.split('/')[1]);
      return launchMonth === this._internalDate.getCurrentMonthNumber();
    }));
  }

  private formatDate(launches: Launch[]): Launch[] {
    return [...launches].reverse().map(launch => ({
      ...launch,
      date: this._dateFormat.datePtBr(launch.date)
    }));
  }

  getInternalLaunchesByCurrentMonth(): Observable<Launch[] | null> {
    return this.internalLaunchesByCurrentMonth.asObservable();
  }

  getInternalLaunches(): Observable<Launch[] | null> {
    return this.internalLaunches.asObservable();
  }
}
