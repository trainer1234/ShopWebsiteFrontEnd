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
  searchEmitter = EmitterService.get('search');

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.keyword = params['key'];
        this.searchEmitter.emit(params['key']);
      }
    );
  }

}
