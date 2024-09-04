import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { ApiServiceService } from 'src/app/services/movie-service/api-service.service';
import { IMovies } from 'src/app/types/movies';
import {
  MovieSelectionType,
  StoreItemType,
  TotalCartType,
} from 'src/app/types/store';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  availableMovies: IMovies[] = [];
  ticketStoreInformation!: StoreItemType;
  cartItems: TotalCartType = {
    list: [],
    totalToPay: 0,
  };
  totalCart: number = this.cartItems.totalToPay;
  selectedTicketsForm!: FormGroup;
  date: string = '';
  price: number = 50;

  selectedTime: string = '';
  constructor(
    private apiServiceService: ApiServiceService,
    private cartService: CartService,
    private formBuilder: FormBuilder
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
      type: 'ticket',
    };
  }

  getDate(elem = 'date', $event: any) {
    console.log('elem', elem, '--', $event, '--', this.date);
  }

  handleSelectedTime(time: any) {
    console.log(time);
  }

  ngOnInit(): void {
    this.selectedTicketsForm = this.formBuilder.group({
      id: '',
      movieInfo: '',
      date: '',
      quantity: 0,
    });
    this.cartService.cart$.subscribe((res) => {
      this.cartItems = res;
      this.calculateTotalCart();
    });
    this.availableMovies = this.apiServiceService.movieList?.filter((movie) => {
      const moviesInCart = this.cartItems.list.filter(
        (item) => item.type === 'ticket'
      );
      return !moviesInCart.some((item) => item.id === movie.id);
    });

  }

  updateQuantity($event: any): void {
    console.log('new Quantity', $event);
    if ($event !== null) {
      this.selectedTicketsForm.get('quantity')?.setValue($event.target.value);
    }
  }

  calculateTotalCart() {
    this.totalCart = this.cartItems.list.reduce(
      (acc, item) => acc + item.total,
      0
    );
    this.cartItems.totalToPay = this.totalCart;
  }

  handleOnSubmit() {
    console.log('UPDATE TICKETs', {
      ticketFoprm: this.selectedTicketsForm?.value,
      cart: this.cartItems,
    });
    const isValidForm = this.selectedTicketsForm.valid;
    if (isValidForm) {
      const { movieInfo, date, quantity } = this.selectedTicketsForm
        ?.value as MovieSelectionType;
      const selectedMovie = this.ticketStoreInformation;

      console.log('selected', selectedMovie);
      this.cartItems.list.push({
        ...selectedMovie,
        quantity: Number(quantity) ?? 0,
        total: movieInfo.price ?? 0 * (Number(quantity) ?? 0),
        time: movieInfo.time ?? '',
        date: date,
        price: this.price,
        id: movieInfo.movieId,
      });
      this.calculateTotalCart();
      this.cartService.addCartItem({
        list: this.cartItems.list,
        totalToPay: this.cartItems.totalToPay,
        isOpen: true
      });
      this.availableMovies = this.availableMovies.filter(
        (movie) => movie.id !==  movieInfo.movieId
      );
    }
  }
}
