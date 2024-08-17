export interface ISnack {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface IItemInCart {
  id: number;
  name: string;
  quantity: number;
  total: number;
}

export interface ITotalCart {
  list: IItemInCart[];
  totalToPay: number;
  isOpen?: boolean;
}