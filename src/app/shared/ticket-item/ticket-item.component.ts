import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SelectedItemType, StoreItemType, ITotalCart } from 'src/app/types/store';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, OnChanges {
  @Input() item: StoreItemType | undefined;
  @Input() cartItems: ITotalCart = {
    list: [] as SelectedItemType[],
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
      this.cartItems?.list.push({
        id: this.item?.id || '',
        name: this.item?.name || '',
        quantity: 1,
        total: this.item?.price || 0,
        type: 'ticket'
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
    console.log('cartItems', this.item);
    const itemQuantity = this.cartItems?.list.find(
      (item) => item.id === this.item?.id
    )?.quantity;
    const itemTotal = this.cartItems?.list.find(
      (item) => item.id === this.item?.id
    )?.total;
    this.quantity = itemQuantity || 0;
    this.totalQuantity = itemTotal || 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cartItems'] && !changes['cartItems'].firstChange) {
      const cartItem = this.cartItems.list.find(
        (item) => item.id === this.item?.id
      );
      if (cartItem) {
        this.quantity = cartItem.quantity;
        this.totalQuantity = cartItem.quantity;
      }
    }
  }
}
