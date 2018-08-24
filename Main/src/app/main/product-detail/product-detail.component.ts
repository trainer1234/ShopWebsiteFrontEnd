import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';
import { RatingService } from '../../shared/services/rating.service';
import { EmitterService } from '../../shared/services/emitter.service';
import { Meta, Title, DOCUMENT } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, Inject, Renderer2, AfterViewInit } from '@angular/core';

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
  slugUrl = window.location.href.split('/');
  slugindex = this.slugUrl[this.slugUrl.length - 1];
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(DOCUMENT) private document, private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object, private route: ActivatedRoute, private productService: ProductService,
    private ratingService: RatingService, private titleService: Title, private meta: Meta, private routeService: Router) {
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
        const id = params['id'].split('-');
        const index = id[id.length - 1];
        console.log(id);
        this.productService.getProductById(index).subscribe(
          data => {
            this.product = data['content'];
            this.titleService.setTitle(this.product.name);
            this.meta.updateTag({ property: 'og:title', content: this.product.name });
            this.meta.updateTag({ property: 'og:description', content: 'Mua ' + this.product.name + 'với giá' + this.product.price });
            this.meta.updateTag({ property: 'og:image', content: this.product.productImageUrls.toString() });
            this.meta.updateTag({ property: 'og:url', content: `https://www.ee.ncnu.edu.tw:9999/${this.slugindex}` });
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
