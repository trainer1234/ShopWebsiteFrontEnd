import {Component, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {DataTableResource} from 'angular-2-data-table';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {
  phones: Product[] = [];
  currentPagePhones: Product[] = [];

  phonesCount;
  phonesResource = new DataTableResource(this.phones);

  pageLimit = 10;

  constructor() {
    let n = 20;
    while (n--) {
      this.phones.push(new Product());
    }
    this.phonesResource.count().then(count => this.phonesCount = count);
  }

  ngOnInit() {
  }

  reload(event) {
    this.phonesResource.query(event).then(phones => this.currentPagePhones = phones);
  }

  addNew() {
    const newProduct = new Product();
    newProduct.isModify = true;
    this.phones.push(newProduct);
    this.phonesResource = new DataTableResource(this.phones);
    this.phonesResource.count().then(count => this.phonesCount = count);

    const query = {
      limit: this.pageLimit,
      offset: (this.phones.length % this.pageLimit) && this.phones.length ?
        (this.phones.length - this.phones.length % this.pageLimit) : this.phones.length - this.pageLimit
    };
    this.phonesResource.query(query).then(phones => this.currentPagePhones = phones);
  }
}
