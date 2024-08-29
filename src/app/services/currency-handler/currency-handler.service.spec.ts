import { TestBed } from '@angular/core/testing';

import { CurrencyHandlerService } from './currency-handler.service';

describe('CurrencyHandlerService', () => {
  let service: CurrencyHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
