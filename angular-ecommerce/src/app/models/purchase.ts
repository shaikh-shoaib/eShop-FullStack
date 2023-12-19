import { Address } from './address';
import { Customer } from './cutomer';
import { Order } from './order';
import { OrderItem } from './order-item';

export class Purchase {
  customer!: Customer;
  shippingAddress!: Address;
  order!: Order;
  orderItems!: OrderItem[];
}
