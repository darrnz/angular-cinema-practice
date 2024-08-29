import {
  Input,
  OnChanges,
  Pipe,
  PipeTransform,
  SimpleChanges,
} from '@angular/core';
import { CurrencyHandlerService } from 'src/app/services/currency-handler/currency-handler.service';

@Pipe({
  name: 'currencyConverter',
  pure: false,
})
export class CurrencyConverterPipe implements PipeTransform {
  constructor(private selectedCurrencyService: CurrencyHandlerService) {}

  transform(value:number) {
    const targetCurrency = this.selectedCurrencyService.getSelectedCurrency();
    const convertedValue = this.selectedCurrencyService.currencyConverter(value, targetCurrency);
    return this.selectedCurrencyService.format(convertedValue, targetCurrency);
  }
}
