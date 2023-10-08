import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DateService } from '../../formatting/date/date.service';
import { InternalDateService } from '../internal-date/internal-date.service';
import { Entry } from 'src/app/core/interfaces/entries/entry.interface';


@Injectable({
  providedIn: 'root'
})
export class InternalEntriesService {

  private internalEntries: BehaviorSubject<Entry[] | null> = new BehaviorSubject<Entry[] | null>(null);

  constructor(
    private _dateFormat: DateService,
    public _internalDate: InternalDateService
  ) { }

  setInternalEntries(entries: Entry[] | null) {
    if (entries) {
      const entriesWithFormatedDate: Entry[] = this.formatDate(entries);
      this.internalEntries.next(entriesWithFormatedDate);
    } else {
      this.internalEntries.next(null);
    }
  }

  getInternalEntries(): Observable<Entry[] | null> {
    return this.internalEntries.asObservable();
  }

  private formatDate(entries: Entry[]): Entry[] {
    const formatedEntries = entries.reverse();
    formatedEntries.forEach(entry => {
      const newDate = this._dateFormat.datePtBr(entry.date);
      entry.date = newDate;
    });
    return formatedEntries;
  }
}