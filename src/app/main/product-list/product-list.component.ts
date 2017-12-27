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
        Id: '1',
        Name: 'iPhone X',
        Price: 1000000,
        ManufactureName: 'Apple',
        ManufactureYear: '2017',
        ProductImageUrl: ['https://staticshop.o2.co.uk/product/images/iphone-x-space-grey-sku-header.png?cb=4097182fcd8a0d7b7e51b89d4a48f5bc'],
        Type: 1,
        ProductSpecificType: 1,
        Promotion: 0
      },
      {
        Id: '1',
        Name: 'iPhone X',
        Price: 1000000,
        ManufactureName: 'Apple',
        ManufactureYear: '2017',
        ProductImageUrl: ['https://staticshop.o2.co.uk/product/images/iphone-x-space-grey-sku-header.png?cb=4097182fcd8a0d7b7e51b89d4a48f5bc'],
        Type: 1,
        ProductSpecificType: 1,
        Promotion: 0
      },{
        Id: '1',
        Name: 'iPhone X',
        Price: 1000000,
        ManufactureName: 'Apple',
        ManufactureYear: '2017',
        ProductImageUrl: ['https://staticshop.o2.co.uk/product/images/iphone-x-space-grey-sku-header.png?cb=4097182fcd8a0d7b7e51b89d4a48f5bc'],
        Type: 1,
        ProductSpecificType: 1,
        Promotion: 0
      },{
        Id: '1',
        Name: 'iPhone X',
        Price: 1000000,
        ManufactureName: 'Apple',
        ManufactureYear: '2017',
        ProductImageUrl: ['https://staticshop.o2.co.uk/product/images/iphone-x-space-grey-sku-header.png?cb=4097182fcd8a0d7b7e51b89d4a48f5bc'],
        Type: 1,
        ProductSpecificType: 1,
        Promotion: 0
      },{
        Id: '1',
        Name: 'iPhone X',
        Price: 1000000,
        ManufactureName: 'Apple',
        ManufactureYear: '2017',
        ProductImageUrl: ['https://staticshop.o2.co.uk/product/images/iphone-x-space-grey-sku-header.png?cb=4097182fcd8a0d7b7e51b89d4a48f5bc'],
        Type: 1,
        ProductSpecificType: 1,
        Promotion: 0
      },{
        Id: '1',
        Name: 'iPhone X',
        Price: 1000000,
        ManufactureName: 'Apple',
        ManufactureYear: '2017',
        ProductImageUrl: ['https://staticshop.o2.co.uk/product/images/iphone-x-space-grey-sku-header.png?cb=4097182fcd8a0d7b7e51b89d4a48f5bc'],
        Type: 1,
        ProductSpecificType: 1,
        Promotion: 0
      },{
        Id: '1',
        Name: 'iPhone X',
        Price: 1000000,
        ManufactureName: 'Apple',
        ManufactureYear: '2017',
        ProductImageUrl: ['https://staticshop.o2.co.uk/product/images/iphone-x-space-grey-sku-header.png?cb=4097182fcd8a0d7b7e51b89d4a48f5bc'],
        Type: 1,
        ProductSpecificType: 1,
        Promotion: 0
      },{
        Id: '1',
        Name: 'iPhone X',
        Price: 1000000,
        ManufactureName: 'Apple',
        ManufactureYear: '2017',
        ProductImageUrl: ['https://staticshop.o2.co.uk/product/images/iphone-x-space-grey-sku-header.png?cb=4097182fcd8a0d7b7e51b89d4a48f5bc'],
        Type: 1,
        ProductSpecificType: 1,
        Promotion: 0
      },{
        Id: '1',
        Name: 'iPhone X',
        Price: 1000000,
        ManufactureName: 'Apple',
        ManufactureYear: '2017',
        ProductImageUrl: ['https://staticshop.o2.co.uk/product/images/iphone-x-space-grey-sku-header.png?cb=4097182fcd8a0d7b7e51b89d4a48f5bc'],
        Type: 1,
        ProductSpecificType: 1,
        Promotion: 0
      },
    ];
  }

}
