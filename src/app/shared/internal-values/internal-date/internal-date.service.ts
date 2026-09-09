import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InternalDateService {

  private monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  constructor() { }

  getCurrentMonthNumber(): number {
    return new Date().getMonth() + 1;
  }

  getCurrentMonthName(): string {
    return this.monthNames[new Date().getMonth()]
  }

  getCurrentYearNumber(): number {
    return new Date().getFullYear();
  }

  getMonthNameByNumber(monthNumber: number): string {
    return this.monthNames[monthNumber - 1];
  }

  getMonthNames(): string[] {
    return this.monthNames;
  }
}
