import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart-service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public cartItemsSubscription!: Subscription;
  public cartIsOpen: boolean = false;
  public cartQuantity: number = 0;

  constructor(private cartService: CartService) {}

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
}
