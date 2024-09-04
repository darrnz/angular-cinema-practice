export interface StoreItemType {
  id: number |string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  type: 'snack' | 'ticket'

}

export interface SelectedItemType extends StoreItemType {
  quantity: number;
  total: number;
  time?: string;
  date?: Date;
}

export interface TotalCartType {
  list: SelectedItemType[];
  totalToPay: number;
  isOpen?: boolean;
}

export interface MovieSelectionType {
  movieInfo: StoreItemType & {
    time: string
    price: number;
    movieId: string | number;
  },
  date: Date | undefined,
  quantity: number | undefined,
}