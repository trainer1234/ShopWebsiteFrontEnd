import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';
import { RatingService } from '../../shared/services/rating.service';
import { EmitterService } from '../../shared/services/emitter.service';

import {ShareButtons} from '@ngx-share/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  cartEmitter = EmitterService.get('cart');

  product: Product = new Product();
  // tslint:disable-next-line:no-inferrable-types
  userRating: number = 0;
  recommendProducts: Product[] = null;
  constructor(private route: ActivatedRoute, private productService: ProductService,
    private ratingService: RatingService, public share: ShareButtons) {
  }

  ngOnInit() {
    this.productService.getRecommendProduct().subscribe(
      data => {
        this.recommendProducts = data['content'];
        console.log(this.recommendProducts);
      },
      err => {
        console.log(err);
      }
    );

    this.route.params.subscribe(
      params => {
        const id = params['id'];
        this.productService.getProductById(id).subscribe(
          data => {
            this.product = data['content'];
            if (sessionStorage.getItem('currentUser') == null) {
              return;
            }
            this.ratingService.getRating(this.product.id).subscribe(
              ratingData => {
                this.userRating = ratingData['content'].rating;
                console.log(this.userRating);
              },
              ratingErr => {
                console.log(ratingErr);
              }
            );
          },
          err => {
            console.log(err);
          }
        );
      }
    );
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

  userLeaveRating() {
    if (sessionStorage.getItem('currentUser') == null) {
      alert('Bạn phải đăng nhập để đánh giá sản phẩm!');
      return;
    }
    this.ratingService.updateRating(this.product.id, this.userRating).subscribe(
      data => {

      },
      err => {
        console.log(err);
      }
    );
  }
}
