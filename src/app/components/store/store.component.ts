import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { SnackServiceService } from 'src/app/services/snack-service/snack-service.service';
import { StoreItemType, TotalCartType } from 'src/app/types/store';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  snackList: any[] = [];
  cartItems: TotalCartType = {
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

  onUpdateCart(item: TotalCartType) {
    this.cartItems.list = item.list;
    this.calculateTotalCart();
    this.cartService.addCartItem({
      list: item.list,
      totalToPay: this.cartItems.totalToPay,
    });
  }
  ngOnInit() {
    this.snackService
      .getSnacks()
      .pipe()
      .subscribe((res: StoreItemType[]) => {
        const filteredItems = res.filter((item) => {
          return item.type === 'snack';
        });
        this.snackList = filteredItems;
      });

    this.cartService.cart$.subscribe((res) => {
      this.cartItems = res;
      this.calculateTotalCart();
    });
  }
  ngOnChanges() {}
}
