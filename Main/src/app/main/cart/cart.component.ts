import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any;
  itemsQuantity = 0;
  totalPrice = 0;

  constructor() {
    this.cartItems = JSON.parse(sessionStorage.getItem('cart'));
  }

  ngOnInit() {
    this.cartItems.forEach(
      element => {
        this.itemsQuantity += element.quantity;
        this.totalPrice += element.price * element.quantity;
      }
    );
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
  }
}
