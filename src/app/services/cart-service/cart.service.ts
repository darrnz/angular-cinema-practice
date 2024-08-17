import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITotalCart } from 'src/app/types/store';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<ITotalCart>({
    list: [],
    totalToPay: 0,
    isOpen: false,
  });

  cart$ = this.cartSubject.asObservable();

  constructor() {}

  getCartItems(): ITotalCart {
    const currentCartState = this.cartSubject.value;
    return this.cartSubject.getValue();
  }

  addCartItem(item: ITotalCart) {
    this.cartSubject.next(item);
  }

  openCartDetails(value: boolean) {
    const currentCartState = this.cartSubject.value;
    this.cartSubject.next({ ...currentCartState, isOpen: value });
  }
}
