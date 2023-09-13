import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberService {

  constructor() { }

  inPortToDuo(value: number): string {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
