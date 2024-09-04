import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TotalCartType } from 'src/app/types/store';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<TotalCartType>({
    list: [],
    totalToPay: 0,
    isOpen: false,
  });

  cart$ = this.cartSubject.asObservable();

  constructor() {}

  getCartItems(): TotalCartType {
    return this.cartSubject.getValue();
  }

  addCartItem(item: TotalCartType) {
    const currentCartState = this.cartSubject.value;

    this.cartSubject.next({
      ...currentCartState,
      list: item.list,
      totalToPay: item.totalToPay,
      isOpen: true,
    });
  }

  openCartDetails(value: boolean) {
    const currentCartState = this.cartSubject.value;

    this.cartSubject.next({ ...currentCartState, isOpen: value });
  }

  clearTickets() {
    const currentCartState = this.cartSubject.value;
    const updatedList = currentCartState.list.filter(
      (item) => item.type !== 'ticket'
    );
    const recalculateTotal = updatedList.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    this.cartSubject.next({
      ...currentCartState,
      list: updatedList,
      totalToPay: recalculateTotal,
    });
  }

  clearCart() {
    this.cartSubject.next({ list: [], totalToPay: 0, isOpen: false });
  }
}
