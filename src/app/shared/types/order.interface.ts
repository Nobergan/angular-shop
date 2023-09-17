import { ProductInterface } from '../../admin/shared/type/product.interface';

export interface OrderInterface {
  id?: string;
  name: string;
  phone: number;
  address: string;
  payment: string;
  orders: ProductInterface[];
  price: number;
  date?: Date;
}
