import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { ApiServiceService } from 'src/app/services/movie-service/api-service.service';
import { IMovies } from 'src/app/types/movies';
import { StoreItemType, TotalCartType } from 'src/app/types/store';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  availableMovies: IMovies[] = [];
  ticketStoreInformation: StoreItemType | undefined;
  cartItems: TotalCartType = {
    list: [],
    totalToPay: 0,
  };
  totalCart: number = this.cartItems.totalToPay;
  constructor(
    private apiServiceService: ApiServiceService,
    private cartService: CartService
  ) {}

  setTicketStoreItems(movieId: string | number) {
    const movieInfo = this.availableMovies.find(
      (movie) => movie.id === movieId
    );
    this.ticketStoreInformation = {
      id: movieInfo?.id ?? '',
      name: movieInfo?.title ?? '',
      description: movieInfo?.title ?? '',
      price: 50,
      imageUrl: movieInfo?.image ?? '',
      category: 'ticket',
      type: 'ticket'
    };
  }

  ngOnInit(): void {
    this.availableMovies = this.apiServiceService.movieList;
    this.cartService.cart$.subscribe((res) => {
      this.cartItems = res;
      this.calculateTotalCart();
    })
    console.log(this.availableMovies);
  }

  onUpdateCart(item: TotalCartType) {
    this.cartItems.list = item.list;
    this.calculateTotalCart();
    this.cartService.addCartItem({
      list: item.list,
      totalToPay: this.cartItems.totalToPay,
    });
  }

  calculateTotalCart() {
    this.totalCart = this.cartItems.list.reduce(
      (acc, item) => acc + item.total,
      0
    );
    this.cartItems.totalToPay = this.totalCart;
  }
}
