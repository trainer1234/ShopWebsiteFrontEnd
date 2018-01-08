import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../shared/services/order.service';
import {Customer} from '../../shared/models/customer';
import {EmitterService} from '../../shared/services/emitter.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any = [];
  itemsQuantity = 0;
  totalPrice = 0;
  orderId: string;
  customer: Customer = new Customer();
  cartEmitter = EmitterService.get('cart');

  constructor(private orderService: OrderService) {
    this.cartItems = JSON.parse(sessionStorage.getItem('cart'));
  }

  ngOnInit() {
    if (this.cartItems) {
      this.cartItems.forEach(
        element => {
          this.itemsQuantity += element.quantity;
          this.totalPrice += element.price * element.quantity;
        }
      );
    }
  }

  onItemQuantityChange(event) {
    this.itemsQuantity = 0;
    this.totalPrice = 0;
    this.cartItems.forEach(
      element => {
        this.itemsQuantity += element.quantity;
        this.totalPrice += element.price * element.quantity;
      }
    );
    this.cartEmitter.emit('set/' + this.itemsQuantity);
  }

  removeItem(item) {
    this.itemsQuantity -= item.quantity;
    this.totalPrice -= item.price * item.quantity;
    this.cartItems.splice(this.cartItems.indexOf(item), 1);
    this.cartEmitter.emit('set/' + this.itemsQuantity);
  }

  submitOrder() {
    let products = [];
    this.cartItems.forEach(
      element => {
        products.push(
          {
            id: element.id,
            amount: element.quantity
          }
        );
      }
    );
    let order = {
      customer: this.customer,
      products: products
    };
    console.log(order);
    this.orderService.addOrder(order).subscribe(
      data => {
        this.orderId = data['content'];
        this.cartItems = null;
        sessionStorage.setItem('cart', null);
      },
      err => {
        console.log(err);
      }
    );
  }
}
