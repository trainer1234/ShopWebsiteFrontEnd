import {Customer} from './customer';
import {Product} from './product';

export class Order {
  id: string;
  orderId: string;
  productAmount: number;
  totalCost: number;
  orderDate: string;
  orderStatus: number;
  customer: Customer;
  products: Product[];
}
