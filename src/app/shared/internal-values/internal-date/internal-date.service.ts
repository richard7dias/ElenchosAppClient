import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InternalDateService {

  private currentDate = new Date();
  private monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  constructor() { }

  getCurrentMonthNumber(): number {
    return this.currentDate.getMonth() + 1;
  }

  getCurrentMonthName(): string {
    return this.monthNames[this.currentDate.getMonth()]
  }

  getCurrentYearNumber(): number {
    return this.currentDate.getFullYear();
  }

  getMonthNameByNumber(monthNumber: number): string {
    return this.monthNames[monthNumber - 1];
  }

  getMonthNames(): string[] {
    return this.monthNames;
  }
}
