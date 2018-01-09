import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../shared/models/product';
import {ProductService} from '../../shared/services/product.service';
import {EmitterService} from '../../shared/services/emitter.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = new Product();

  constructor(private route: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const id = params['id'];
        this.productService.getProductById(id).subscribe(
          data => {
            this.product = data['content'];
          },
          err => {
            console.log(err);
          }
        );
      }
    );
  }

}
