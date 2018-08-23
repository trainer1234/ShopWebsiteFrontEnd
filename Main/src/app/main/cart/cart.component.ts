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
  paymentMethod = 0;
  showLoadingIndicator = false;

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
    console.log(this.paymentMethod);
    this.cartEmitter.emit('clear');
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
      products: products,
      paymentMethod: this.paymentMethod,
    };
    console.log(order);
    this.showLoadingIndicator = true;
    this.orderService.addOrder(order).subscribe(
      data => {
        this.cartItems = null;
        sessionStorage.setItem('cart', null);
        console.log(data['content']);
        if(this.paymentMethod == 0){
          this.orderId = data['content'].orderId;
          this.showLoadingIndicator = false;
        }
        else {
          const redirectUrl = data['content'].paypal_redirect;
          window.location.href = redirectUrl;
        }
      },
      err => {
        console.log(err);
        this.showLoadingIndicator = false;
      }
    );
  }
}
