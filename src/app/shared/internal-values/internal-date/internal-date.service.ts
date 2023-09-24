import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InternalDateService {

  currentDate = new Date();

  constructor() { }

  getCurrentMonthNumber(): number {
    return this.currentDate.getMonth() + 1;
  }

  getCurrentMonthName(): string {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[this.currentDate.getMonth()]
  }
}
