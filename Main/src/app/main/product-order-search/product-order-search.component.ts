import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../shared/services/order.service';
import {Order} from '../../shared/models/order';

@Component({
  selector: 'app-product-order-search',
  templateUrl: './product-order-search.component.html',
  styleUrls: ['./product-order-search.component.css']
})
export class ProductOrderSearchComponent implements OnInit {

  orderCode: string;
  orderResult: Order;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
  }

  search() {
    this.orderService.getOrderByCode(this.orderCode).subscribe(
      data => {
        console.log(data);
        this.orderResult = data['content'];
      },
      err => {
        console.log(err);
      }
    );
  }
}
