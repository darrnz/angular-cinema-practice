import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { IItemInCart } from 'src/app/types/store';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit, OnDestroy {
  public cartItemsSubscription!: Subscription;
  public isOpen: boolean = false;
  public itemsInCartList: IItemInCart[] = [];
  public totalToPay: number = 0;

  constructor(private cartService: CartService) {}

  
  ngOnInit() {
    this.cartItemsSubscription = this.cartService.cart$.subscribe((cart) => {
      this.isOpen = cart.isOpen ?? false;
      this.itemsInCartList = cart.list;
      this.totalToPay = cart.totalToPay;
    });

    console.log('itemsInCartList', this.itemsInCartList);
  }
  toggleSideNav() {
    this.cartService.openCartDetails(!this.isOpen);
  }

  ngOnDestroy() {
    if (this.cartItemsSubscription) {
      this.cartItemsSubscription.unsubscribe();
    }
  }
}
