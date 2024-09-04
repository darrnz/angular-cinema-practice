import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  SelectedItemType,
  StoreItemType,
  TotalCartType,
} from 'src/app/types/store';

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.scss'],
})
export class StoreItemComponent implements OnInit {
  @Input() item: StoreItemType | undefined;
  @Input() customName?: string = '';
  @Input() isCartItem: boolean = false;
  @Input() cartItems: TotalCartType = {
    list: [] as SelectedItemType[],
    totalToPay: 0,
  };
  @Output() cartItemsChange = new EventEmitter<TotalCartType>();
  quantity: number = 0;
  totalQuantity: number = 0;

  cartHasItem() {
    if (this.item?.type === 'ticket') {
      return true; // Always return true for tickets
    }
    return this.cartItems?.list.some((item) => item.id === this.item?.id);
  }

  increaseQuantity() {
    this.quantity++;
    this.totalQuantity = this.quantity * (this.item?.price || 0);
    if (!this.cartHasItem()) {
      this.cartItems?.list.push({
        id: this.item?.id || 0,
        name: this.item?.name || '',
        quantity: 1,
        total: this.item?.price || 0,
        description: this.item?.description || '',
        price: this.item?.price || 0,
        category: this.item?.category || '',
        type: this.item?.type || 'snack',
        imageUrl: this.item?.imageUrl || '',
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
      (item) => item.id === this.item?.id || this.item?.type === 'ticket'
    )?.quantity;
    const itemTotal = this.cartItems?.list.find(
      (item) => item.id === this.item?.id || this.item?.type === 'ticket'
    )?.total;
    this.quantity = itemQuantity || 0;
    this.totalQuantity = itemTotal || 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cartItems'] && !changes['cartItems'].firstChange) {
      const cartItem = this.cartItems.list.find(
        (item) => item.id === this.item?.id || this.item?.type === 'ticket'
      );
      if (cartItem) {
        this.quantity = cartItem.quantity;
        this.totalQuantity = cartItem.quantity;
      }
    }
  }
}
