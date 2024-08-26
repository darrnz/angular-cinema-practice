import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { SnackServiceService } from 'src/app/services/snack-service/snack-service.service';
import { SelectedItemType, StoreItemType, TotalCartType } from 'src/app/types/store';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit, OnDestroy {
  public cartItemsSubscription!: Subscription;
  public isOpen: boolean = false;
  public cartInfo: TotalCartType = { list: [], totalToPay: 0 };
  public totalToPay: number = 0;
  public selectedMovie: StoreItemType | undefined;

  constructor(
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.cartItemsSubscription = this.cartService.cart$.subscribe((cart) => {
      this.isOpen = cart.isOpen ?? false;
      this.cartInfo = { list: cart.list, totalToPay: cart.totalToPay };
      this.totalToPay = cart.totalToPay;
      this.selectedMovie = cart.list.find((item) => {
        item.type === 'ticket'});
    });
  }
  toggleSideNav() {
    this.cartService.openCartDetails(!this.isOpen);
    console.log('itemsInCartList', this.cartInfo);
  }

  cartHasTickets() {
    this.cartInfo.list.some(item => item.type === 'ticket')
  }

  ngOnDestroy() {
    if (this.cartItemsSubscription) {
      this.cartItemsSubscription.unsubscribe();
    }
  }
}
