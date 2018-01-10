import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Order} from '../models/order';

@Injectable()
export class OrderService {
  private getOrderByTypeUrl: string;
  private editOrderUrl: string;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.getOrderByTypeUrl = this.authService.apiUrl + 'order/filter/';
    this.editOrderUrl = this.authService.apiUrl + 'order/edit/';
  }

  getAllOrdersByType(type: string) {
    const url = this.getOrderByTypeUrl + type;

    return this.http.get(url);
  }

  editOrder(order: Order) {
    const url = this.editOrderUrl;
    const options = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.authService.getAccessToken()
        }
      )
    };
    return this.http.put(url, order, options);
  }
}
