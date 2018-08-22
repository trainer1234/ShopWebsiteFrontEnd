import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Order } from '../models/order';

@Injectable()
export class OrderService {
  private getOrderUrl: string;
  private getOrderByCodeUrl: string;
  private addOrderUrl: string;
  private finishPaymentUrl: string;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.getOrderUrl = this.authService.apiUrl + 'order/get/';
    this.getOrderByCodeUrl = this.authService.apiUrl + 'order/get/';
    this.addOrderUrl = this.authService.apiUrl + 'order/add/';
    this.finishPaymentUrl= this.authService.apiUrl + 'order/execute-paypal/';
  }

  getAllOrdersByType(type: string) {
    const url = this.getOrderUrl;
    const params = new HttpParams().set('type', type);

    return this.http.get(url, {
      params: params
    });
  }

  addOrder(order) {
    const url = this.addOrderUrl;
    return this.http.post(url, order);
  }

  getOrderByCode(code: string) {
    const url = this.getOrderByCodeUrl + code;
    return this.http.get(url);
  }

  finishPayment(paymentId, payerId){
    const url = this.finishPaymentUrl;
    const data: FormData = new FormData();
    data.append('paymentId', paymentId);
    data.append('payerId', payerId);
    const options = {
      headers: new HttpHeaders(
        {
          'Accept': 'application/json',
        }
      )
    };
    return this.http.post(url, data, options);
  }
}
