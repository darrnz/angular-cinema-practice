export interface StoreItemType {
  id: number |string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface SelectedItemType extends StoreItemType {
  id: number | string;
  name: string;
  quantity: number;
  total: number;
  type: 'snack' | 'ticket'
}

export interface ITotalCart {
  list: SelectedItemType[];
  totalToPay: number;
  isOpen?: boolean;
}