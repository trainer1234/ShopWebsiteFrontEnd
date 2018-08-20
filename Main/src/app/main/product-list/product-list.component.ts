import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';
import { EmitterService } from '../../shared/services/emitter.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() type: string;
  @Input() number: number;

  @Input() products: Product[];
  displayProducts: Product[] = [];

  filterEmitter = EmitterService.get('Filter');
  searchEmitter = EmitterService.get('search');

  filterManufacture: string[] = [];
  filterPrice: string[] = [];

  constructor(private productService: ProductService) {
    this.filterEmitter.subscribe(
      msg => {
        const token: string[] = msg.split('/');
        if (token[0] === 'm') {
          if (this.filterManufacture.indexOf(token[1]) !== -1) {
            this.filterManufacture.splice(this.filterManufacture.indexOf(token[1]), 1);
          } else {
            this.filterManufacture.push(token[1]);
          }
        } else if (token[0] === 'p') {
          if (this.filterPrice.indexOf(token[1]) !== -1) {
            this.filterPrice.splice(this.filterPrice.indexOf(token[1]), 1);
          } else {
            this.filterPrice.push(token[1]);
          }
        }
        this.refreshList();
      }
    );
  }

  ngOnInit() {
    if (this.products != null) {
      this.displayProducts = this.products;
      return;
    }
    this.products = [];
    if (Number(this.type) === 5) {
      this.productService.getTopViewProduct().subscribe(
        data => {
          this.products = data['content'];
          this.displayProducts = this.products;
          console.log(this.products);
        },
        err => {
          console.log(err);
        }
      );
    }
    // tslint:disable-next-line:one-line
    else if (Number(this.type) === 6) {
      this.productService.getTopPurchasedProduct().subscribe(
        data => {
          this.products = data['content'];
          this.displayProducts = this.products;
        },
        err => {
          console.log(err);
        }
      );
    }
    // tslint:disable-next-line:one-line
    else if (Number(this.type) >= 0) {
      this.productService.getAllProductsByType(this.type, this.number).subscribe(
        data => {
          this.products = data['content'];
          this.displayProducts = this.products;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  refreshList() {
    console.log(this.filterManufacture);
    console.log(this.filterPrice);
    this.displayProducts = [];
    if (this.products) {
      this.products.forEach(
        product => {
          let flag = true;
          this.filterManufacture.forEach(
            munufacture => {
              if (this.filterManufacture.indexOf(product.manufacture.id) !== -1) {
                flag = false;
              }
            }
          );
          this.filterPrice.forEach(
            price => {
              if (price === '0') {
                if (product.price <= 5000000) {
                  flag = false;
                }
              } else if (price === '1') {
                if (product.price >= 5000000 && product.price <= 7000000) {
                  flag = false;
                }
              } else if (price === '2') {
                if (product.price >= 7000000 && product.price <= 10000000) {
                  flag = false;
                }
              } else if (price === '3') {
                if (product.price >= 10000000 && product.price <= 20000000) {
                  flag = false;
                }
              } else if (price === '4') {
                if (product.price >= 20000000 && product.price <= 30000000) {
                  flag = false;
                }
              } else if (price === '5') {
                if (product.price >= 30000000) {
                  flag = false;
                }
              }
            }
          );
          if (flag) {
            this.displayProducts.push(product);
          }
        }
      );
    }
  }
}
