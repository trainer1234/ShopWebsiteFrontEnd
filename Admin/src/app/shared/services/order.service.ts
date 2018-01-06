import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class OrderService {
  private getOrderUrl: string;
  private editOrderUrl: string;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.getOrderUrl = this.authService.apiUrl + 'order/get/';
    this.editOrderUrl = this.authService.apiUrl + 'order/edit/';
  }

  getAllOrders() {

  }

  editOrder() {

  }
}
