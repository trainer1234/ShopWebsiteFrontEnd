import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {ProductService} from '../../shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() type: string;

  products: Product[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAllProductsByType(this.type, 5).subscribe(
      data => {
        this.products = data['content'];
        console.log(this.products);
      },
      err => {
        console.log(err);
      }
    );
  }

}
