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
    const currentCartState = this.cartSubject.value;
    console.log('currentCartState', currentCartState);
    return this.cartSubject.getValue();
  }

  addCartItem(item: TotalCartType) {
    const currentCartState = this.cartSubject.value;
    console.log('item', item);
    console.log('currentCartState', this.cartSubject.value);

    this.cartSubject.next({...currentCartState, list: item.list, totalToPay: item.totalToPay});
  }

  openCartDetails(value: boolean) {
    const currentCartState = this.cartSubject.value;

    console.log('CurrentState', currentCartState);
    console.log('Updated State', {...this.cartSubject.value, isOpen: value})

    this.cartSubject.next({ ...currentCartState, isOpen: value });
  }
}
