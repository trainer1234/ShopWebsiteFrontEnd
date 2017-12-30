import { Component, OnInit } from '@angular/core';
import {Product} from '../../shared/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  constructor() { }

  ngOnInit() {
    this.products = [
      {
        id: '1',
        name: 'iPhone X',
        price: 1000000,
        manufacture: {id: 'dasdsad'},
        manufacutreYear: 2017,
        productImageUrls: ['https://staticshop.o2.co.uk/product/images/iphone-x-space-grey-sku-header.png?cb=4097182fcd8a0d7b7e51b89d4a48f5bc'],
        type: 1,
        specificType: 1,
        promotionRate: 0
      },
      {
        id: '1',
        name: 'iPhone X',
        price: 1000000,
        manufacture: {id: 'dasdsad'},
        manufacutreYear: 2017,
        productImageUrls: ['https://staticshop.o2.co.uk/product/images/iphone-x-space-grey-sku-header.png?cb=4097182fcd8a0d7b7e51b89d4a48f5bc'],
        type: 1,
        specificType: 1,
        promotionRate: 0
      },{
        id: '1',
        name: 'iPhone X',
        price: 1000000,
        manufacture: {id: 'dasdsad'},
        manufacutreYear: 2017,
        productImageUrls: ['https://staticshop.o2.co.uk/product/images/iphone-x-space-grey-sku-header.png?cb=4097182fcd8a0d7b7e51b89d4a48f5bc'],
        type: 1,
        specificType: 1,
        promotionRate: 0
      },{
        id: '1',
        name: 'iPhone X',
        price: 1000000,
        manufacture: {id: 'dasdsad'},
        manufacutreYear: 2017,
        productImageUrls: ['https://staticshop.o2.co.uk/product/images/iphone-x-space-grey-sku-header.png?cb=4097182fcd8a0d7b7e51b89d4a48f5bc'],
        type: 1,
        specificType: 1,
        promotionRate: 0
      },{
        id: '1',
        name: 'iPhone X',
        price: 1000000,
        manufacture: {id: 'dasdsad'},
        manufacutreYear: 2017,
        productImageUrls: ['https://staticshop.o2.co.uk/product/images/iphone-x-space-grey-sku-header.png?cb=4097182fcd8a0d7b7e51b89d4a48f5bc'],
        type: 1,
        specificType: 1,
        promotionRate: 0
      },{
        id: '1',
        name: 'iPhone X',
        price: 1000000,
        manufacture: {id: 'dasdsad'},
        manufacutreYear: 2017,
        productImageUrls: ['https://staticshop.o2.co.uk/product/images/iphone-x-space-grey-sku-header.png?cb=4097182fcd8a0d7b7e51b89d4a48f5bc'],
        type: 1,
        specificType: 1,
        promotionRate: 0
      },{
        id: '1',
        name: 'iPhone X',
        price: 1000000,
        manufacture: {id: 'dasdsad'},
        manufacutreYear: 2017,
        productImageUrls: ['https://staticshop.o2.co.uk/product/images/iphone-x-space-grey-sku-header.png?cb=4097182fcd8a0d7b7e51b89d4a48f5bc'],
        type: 1,
        specificType: 1,
        promotionRate: 0
      },{
        id: '1',
        name: 'iPhone X',
        price: 1000000,
        manufacture: {id: 'dasdsad'},
        manufacutreYear: 2017,
        productImageUrls: ['https://staticshop.o2.co.uk/product/images/iphone-x-space-grey-sku-header.png?cb=4097182fcd8a0d7b7e51b89d4a48f5bc'],
        type: 1,
        specificType: 1,
        promotionRate: 0
      },{
        id: '1',
        name: 'iPhone X',
        price: 1000000,
        manufacture: {id: 'dasdsad'},
        manufacutreYear: 2017,
        productImageUrls: ['https://staticshop.o2.co.uk/product/images/iphone-x-space-grey-sku-header.png?cb=4097182fcd8a0d7b7e51b89d4a48f5bc'],
        type: 1,
        specificType: 1,
        promotionRate: 0
      },
    ];
  }

}
