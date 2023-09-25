import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(
    private datePipe: DatePipe
  ) { }

  datePtBr(date: string): string {
    const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    return formattedDate || '';
  }

  stringToDate(dateStr: string): Date {
    const parts = dateStr.split('/');
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const year = parseInt(parts[2]);
    return new Date(year, month, day);
  }
}