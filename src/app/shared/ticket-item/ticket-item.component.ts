import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  SelectedItemType,
  StoreItemType,
  TotalCartType,
} from 'src/app/types/store';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss'],
})
export class TicketItemComponent {
  @Input() selectedTicketsForm!: FormGroup;
  @Input() item: StoreItemType | undefined;
  @Input() customName?: string = '';
  @Input() cartItems: TotalCartType = {
    list: [] as SelectedItemType[],
    totalToPay: 0,
  };
  @Output() quantityChange = new EventEmitter<any>();

  onQuantityChange($event: any): void {
    console.log('$event.value', $event);
    if ($event.value !== null) {
      this.quantityChange.emit($event);
    }
  }
  totalQuantity: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cartItems'] && !changes['cartItems'].firstChange) {
      const cartItem = this.cartItems.list.find(
        (item) => item.id === this.item?.id
      );
      if (cartItem) {
        this.totalQuantity = cartItem.quantity;
      }
    }
  }
}
