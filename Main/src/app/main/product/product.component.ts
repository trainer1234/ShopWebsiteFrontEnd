import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {EmitterService} from '../../shared/services/emitter.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  cartEmitter = EmitterService.get('cart');

  constructor() {
  }

  ngOnInit() {
    this.product.quantity = 1;
  }

  chooseProduct() {
    this.cartEmitter.emit('add');
    let isProductExist = false;
    let cart: Product[] = JSON.parse(sessionStorage.getItem('cart'));
    if (!cart) {
      cart = [];
    } else {
      cart.forEach(
        element => {
          if (element.id === this.product.id) {
            isProductExist = true;
            element.quantity++;
          }
        }
      );
    }
    if (!isProductExist) {
      cart.push(this.product);
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }
}
