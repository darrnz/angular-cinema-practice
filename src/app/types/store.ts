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
}

export interface TotalCartType {
  list: SelectedItemType[];
  totalToPay: number;
  isOpen?: boolean;
}