import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITotalCart } from 'src/app/types/store';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject =  new BehaviorSubject<ITotalCart>({
  list: [],
  totalToPay: 0,
})

cart$ = this.cartSubject.asObservable();

constructor() { }

getCartItems(): ITotalCart {
  return this.cartSubject.getValue();
}

addCartItem(item: ITotalCart) {
  this.cartSubject.next(item);
}

}
