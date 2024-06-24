import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { SnackServiceService } from 'src/app/services/snack-service/snack-service.service';
import { IItemInCart, ISnack, ITotalCart } from 'src/app/types/store';

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
    console.log('UPDATE CART', item);
    this.cartItems.list = item.list;
    this.calculateTotalCart();
    this.cartService.addCartItem(this.cartItems);
  }
  ngOnInit() {
    console.log('Init', this.cartItems);
    this.snackService
      .getSnacks()
      .pipe()
      .subscribe((res: ISnack[]) => {
        console.log('res', res);
        this.snackList = res;
      });
  }
  ngOnChanges() {
    console.log('Onchanges', this.cartItems);
  }
}
