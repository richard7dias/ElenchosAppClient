import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberService {

  constructor() { }

  inRealBRL(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }

  inPortToDuo(value: number): string {
    const formattedValue = value.toFixed(2).replace('.', ',');

    // Verifica se há números após a vírgula
    if (formattedValue.endsWith(',00')) {
      return formattedValue.replace(',00', ''); // Remove as casas decimais se forem '00'
    }

    return formattedValue;
  }
}
