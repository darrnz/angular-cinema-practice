import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart-service/cart.service';

@Component({
  
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    cartQuantity: number = 0;

    constructor(
      private cartQuantityService: CartService = new CartService()
    ) { }
  
    ngOnInit(): void {
      this.cartQuantityService.cart$.subscribe((cart) => {
        this.cartQuantity = cart.list.reduce((acc, item) => acc + item.quantity, 0);
      });
    }
}
