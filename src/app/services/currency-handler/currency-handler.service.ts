import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyHandlerService {
  private currencyInput = new BehaviorSubject<string>('MXN');
  selectedCurrency$ = this.currencyInput.asObservable();
  excangeRates = {
    MXN: 20,
    USD: 1,
    EUR: 0.85,
  };
  handleChangeCurrency(currency: string) {
    this.currencyInput.next(currency);
  }

  getSelectedCurrency(): string {
    return this.currencyInput.getValue();
  }

  currencyConverter(value: number,targetCurrency: string) {
    switch (targetCurrency) {
      case 'USD':
        return value / this.excangeRates.MXN;
      case 'EUR':
        return (value / this.excangeRates.MXN) * this.excangeRates.EUR;

      default:
        return value;
    }
  }
  format(value: number, currencyCode: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(value);
  }


  constructor() {}
}
