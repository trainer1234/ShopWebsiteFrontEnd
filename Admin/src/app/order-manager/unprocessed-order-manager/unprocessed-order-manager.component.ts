import {Component, OnInit} from '@angular/core';
import {Order} from '../../shared/models/order';
import {DataTableResource} from 'angular-2-data-table';
import {OrderService} from '../../shared/services/order.service';

@Component({
  selector: 'app-unprocessed-order-manager',
  templateUrl: './unprocessed-order-manager.component.html',
  styleUrls: ['./unprocessed-order-manager.component.css']
})
export class UnprocessedOrderManagerComponent implements OnInit {

  orders: Order[] = [];
  currentPageOrder: Order[] = [];

  ordersCount: number;
  ordersResource = new DataTableResource(this.orders);

  pageLimit = 10;

  constructor(private orderService: OrderService) {
    this.orderService.getAllOrdersByType('0').subscribe(
      data => {
        this.orders = data['content'];
        console.log(this.orders);
        this.ordersResource = new DataTableResource(this.orders);
        this.ordersResource.count().then(count => this.ordersCount = count);
        this.updateDataTable();
      }
    );
  }

  ngOnInit() {

  }

  reload(event) {
    this.ordersResource.query(event).then(orders => this.currentPageOrder = orders);
  }

  updateDataTable() {
    const query = {
      limit: this.pageLimit,
      offset: (this.orders.length % this.pageLimit) && this.orders.length ?
        ((this.orders.length - this.orders.length % this.pageLimit) < 0 ? 0 : 0)
        : ((this.orders.length - this.pageLimit) < 0 ? 0 : 0)
    };
    this.ordersResource.query(query).then(products => this.currentPageOrder = products);
  }

  confirm(item: Order) {
    if (confirm('Xác nhận đơn hàng ?')) {
      item.orderStatus = 1;
      this.orderService.editOrder(item).subscribe(
        data => {
        },
        err => {
          console.log(err);
        }
      );
      this.orders.splice(this.orders.indexOf(item), 1);
      this.ordersResource = new DataTableResource(this.orders);
      this.ordersResource.count().then(count => this.ordersCount = count);
      this.updateDataTable();
    }
  }

  reject(item: Order) {
    if (confirm('Hủy bỏ đơn hàng ?')) {
      item.orderStatus = 4;
      this.orderService.editOrder(item).subscribe(
        data => {
        },
        err => {
          console.log(err);
        }
      );
      this.orders.splice(this.orders.indexOf(item), 1);
      this.ordersResource = new DataTableResource(this.orders);
      this.ordersResource.count().then(count => this.ordersCount = count);
      this.updateDataTable();
    }
  }
}
