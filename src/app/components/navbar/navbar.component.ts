import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { CurrencyHandlerService } from 'src/app/services/currency-handler/currency-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public cartItemsSubscription!: Subscription;
  public cartIsOpen: boolean = false;
  public cartQuantity: number = 0;
  public currencySelected = 'MXN';
  public currencyTypesOptions = [
    { value: 'MXN', viewValue: 'MXN' },
    { value: 'USD', viewValue: 'USD' },
    { value: 'EUR', viewValue: 'EUR' },
  ];

  constructor(
    private cartService: CartService,
    private currencyHandlerService: CurrencyHandlerService
  ) {}
  @Output() currencySelectedEvent = new EventEmitter<string>();
  ngOnInit() {
    this.cartItemsSubscription = this.cartService.cart$.subscribe((cart) => {
      this.cartQuantity = cart.list.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      this.cartIsOpen = cart.isOpen ?? false;
    });
  }

  toggleCart() {
    this.cartService.openCartDetails(!this.cartIsOpen);
  }

  changeCurrency($event: any) {
    this.currencySelected = $event.value;
    this.currencyHandlerService.handleChangeCurrency(this.currencySelected);
  }
}
