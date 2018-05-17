import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../shared/models/product';
import {ProductService} from '../../shared/services/product.service';
import {RatingService} from "../../shared/services/rating.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = new Product();
  userRating: number = 0;

  constructor(private route: ActivatedRoute, private productService: ProductService,
              private ratingService: RatingService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const id = params['id'];
        this.productService.getProductById(id).subscribe(
          data => {
            this.product = data['content'];
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

  userLeaveRating() {
    console.log(this.userRating);
    this.ratingService.updateRating(this.product.id, this.userRating).subscribe(
      data => {

      },
      err => {
        console.log(err);
      }
    );
  }
}
