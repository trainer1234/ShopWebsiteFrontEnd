import { Component, OnInit } from '@angular/core';
import Order = jasmine.Order;
import {OrderService} from '../../shared/services/order.service';

@Component({
  selector: 'app-waiting-process-manager',
  templateUrl: './waiting-process-manager.component.html',
  styleUrls: ['./waiting-process-manager.component.css']
})
export class WaitingProcessManagerComponent implements OnInit {

  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {

  }

}
