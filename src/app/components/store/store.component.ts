import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { SnackServiceService } from 'src/app/services/snack-service/snack-service.service';
import { SelectedItemType, StoreItemType, ITotalCart } from 'src/app/types/store';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent {
  snackList: any[] = [];
  cartItems: ITotalCart = {
    list: [],
    totalToPay: 0,
  };
  totalCart: number = this.cartItems.totalToPay;
  constructor(
    private snackService: SnackServiceService,
    private cartService: CartService
  ) {}
  calculateTotalCart() {
    this.totalCart = this.cartItems.list.reduce(
      (acc, item) => acc + item.total,
      0
    );
    this.cartItems.totalToPay = this.totalCart;
  }

  onUpdateCart(item: ITotalCart) {
    this.cartItems.list = item.list;
    this.calculateTotalCart();
    this.cartService.addCartItem({
      list: item.list,
      totalToPay: this.cartItems.totalToPay,
    })
  }
  ngOnInit() {
    this.snackService
      .getSnacks()
      .pipe()
      .subscribe((res: StoreItemType[]) => {
        console.log('res', res);
        this.snackList = res;
      });

      this.cartService.cart$.subscribe((res) => {
        this.cartItems = res;
        this.calculateTotalCart();
      })
  }
  ngOnChanges() {
    console.log('Onchanges', this.cartItems);
  }
}
