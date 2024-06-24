import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IItemInCart, ISnack, ITotalCart } from 'src/app/types/store';

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.scss'],
})
export class StoreItemComponent implements OnInit {
  @Input() item: ISnack | undefined;
  @Input() cartItems: ITotalCart = {
    list: [] as IItemInCart[],
    totalToPay: 0,
  };
  @Output() cartItemsChange = new EventEmitter<ITotalCart>();
  quantity: number = 0;
  totalQuantity: number = 0;

  cartHasItem() {
    return this.cartItems?.list.some((item) => item.id === this.item?.id);
  }

  increaseQuantity() {
    this.quantity++;
    this.totalQuantity = this.quantity * (this.item?.price || 0);
    if (!this.cartHasItem()) {
      console.log('Item', this.item);
      this.cartItems?.list.push({
        id: this.item?.id || 0,
        name: this.item?.name || '',
        quantity: 1,
        total: this.item?.price || 0,
      });
    } else {
      this.cartItems?.list.forEach((item) => {
        if (item.id === this.item?.id) {
          item.quantity++;
          item.total = item.quantity * (this.item?.price || 0);
        }
      });
    }
    this.cartItemsChange.emit(this.cartItems);
  }

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
      this.totalQuantity = this.quantity * (this.item?.price || 0);
      if (this.cartHasItem()) {
        this.cartItems?.list.forEach((item) => {
          
          if (item.id === this.item?.id) {
            item.quantity--;
            item.total = item.quantity * (this.item?.price || 0);
          }
        });
        this.cartItems.list = this.cartItems.list.filter((item) => {
          return item.quantity > 0;
        });
      }
      this.cartItemsChange.emit(this.cartItems);
    }
  }

  ngOnInit() {
    const itemQuantity = this.cartItems?.list.find(
      (item) => item.id === this.item?.id
    )?.quantity;
    const itemTotal = this.cartItems?.list.find(
      (item) => item.id === this.item?.id
    )?.total;
    this.quantity = itemQuantity || 0;
    this.totalQuantity = itemTotal || 0;
    console.log('itemQuantity', { itemQuantity, itemTotal });
    console.log('Quanitty ITem', this.quantity);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cartItems'] && !changes['cartItems'].firstChange) {
      console.log('CartItems - Changes', this.cartItems);
      const cartItem = this.cartItems.list.find(
        (item) => item.id === this.item?.id
      );
      console.log('CartItem', cartItem);
      if (cartItem) {
        this.quantity = cartItem.quantity;
        this.totalQuantity = cartItem.quantity;
      }
    }
  }
}
