import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { SnackServiceService } from 'src/app/services/snack-service/snack-service.service';
import { SelectedItemType, StoreItemType, ITotalCart } from 'src/app/types/store';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit, OnDestroy {
  public cartItemsSubscription!: Subscription;
  public isOpen: boolean = false;
  public cartInfo: ITotalCart = { list: [], totalToPay: 0 };
  public totalToPay: number = 0;
  snackList: StoreItemType[] = [];
  public selectedMovie: StoreItemType | undefined;

  constructor(
    private cartService: CartService,
    private snackService: SnackServiceService
  ) {}

  ngOnInit() {
    console.log('sede', this.cartInfo)
    this.cartItemsSubscription = this.cartService.cart$.subscribe((cart) => {
      this.isOpen = cart.isOpen ?? false;
      this.cartInfo = { list: cart.list, totalToPay: cart.totalToPay };
      this.totalToPay = cart.totalToPay;
      this.selectedMovie = cart.list.filter((item) => {
        item.type === 'ticket'}).map((item) => ({
          id: item.id,
          name: item.name,
          description: item.name,
          price: item.total,
          imageUrl: '',
          category: item.type
        }))[0];

      // Fetch snacks and filter based on the cart
      this.snackService.getSnacks().subscribe((res: StoreItemType[]) => {
        this.snackList = res.filter((item) =>
          this.cartInfo.list.some(cartItem => cartItem.id === item.id)

        );
        console.log('Filtered snackList', this.snackList);
      });
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
