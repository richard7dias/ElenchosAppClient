import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Launch } from 'src/app/core/interfaces/launch.interface';
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
      this.internalLaunches.next(launches);
      this.setInternalLaunchesByCurrentMonth(launches);
    } else {
      this.internalLaunches.next(null);
    }
  }

  private setInternalLaunchesByCurrentMonth(launches: Launch[]) {
    this.internalLaunchesByCurrentMonth.next(launches.filter(launch => {
      const launchMonth = parseInt(this._dateFormat.datePtBr(launch.date).split('/')[1]);
      return launchMonth === this._internalDate.getCurrentMonthNumber();
    }));
  }

  getInternalLaunchesByCurrentMonth(): Observable<Launch[] | null> {
    return this.internalLaunchesByCurrentMonth.asObservable();
  }

  getInternalLaunches(): Observable<Launch[] | null> {
    return this.internalLaunches.asObservable();
  }
}
