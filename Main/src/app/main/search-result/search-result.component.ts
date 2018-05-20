import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../shared/services/product.service';
import {Product} from '../../shared/models/product';
import {EmitterService} from '../../shared/services/emitter.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  keyword: string;
  products: Product[] = undefined;
  searchEmitter = EmitterService.get('search');

  constructor(private route: ActivatedRoute, private productService: ProductService) { 
    this.searchEmitter.subscribe(
      msg => {
        console.log(msg);
        this.products = undefined;
        this.productService.searchProduct(msg).subscribe(
          data => {
            this.products = data['content'];
          },
          err => {
            console.log(err);
          }
        );
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.keyword = params['key'];
        this.searchEmitter.emit(params['key']);
      }
    );
    this.productService.searchProduct(this.keyword).subscribe(
          data => {
            this.products = data['content'];            
            console.log(this.products);
          },
          err => {
            this.products = null;
            console.log(err);
          }
        );
  }

}
