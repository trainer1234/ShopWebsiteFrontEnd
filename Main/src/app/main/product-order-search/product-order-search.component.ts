import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../shared/services/order.service';
import {Order} from '../../shared/models/order';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-order-search',
  templateUrl: './product-order-search.component.html',
  styleUrls: ['./product-order-search.component.css']
})
export class ProductOrderSearchComponent implements OnInit {

  orderCode: string;
  orderResult: Order;
  orderId: string;
  showLoadingIndicator = false;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        if(params['paymentId']){
          this.showLoadingIndicator = true;
          this.orderService.finishPayment(params['paymentId'], params['PayerID']).subscribe(
            data => {
              this.showLoadingIndicator = false;
              this.orderId = data['content'];
              document.getElementById("finishOrderButton").click();
              console.log(data['content']);
            },
            err => {
              this.showLoadingIndicator = false;
              console.log(err);
            }
          )
        }
      }
    )
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
