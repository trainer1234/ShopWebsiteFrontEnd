import {Customer} from './customer';
import {Product} from './product';
import {OrderProduct} from './order-product';

export class Order {
  id: string;
  orderId: string;
  productAmount: number;
  totalCost: number;
  orderDate: string;
  orderStatus: number;
  customer: Customer;
  products: OrderProduct[];
  paymentMethod: number;
}
