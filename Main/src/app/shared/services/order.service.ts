import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Order } from '../models/order';

@Injectable()
export class OrderService {
  private getOrderUrl: string;
  private getOrderByCodeUrl: string;
  private addOrderUrl: string;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.getOrderUrl = this.authService.apiUrl + 'order/get/';
    this.getOrderByCodeUrl = this.authService.apiUrl + 'order/get/';
    this.addOrderUrl = this.authService.apiUrl + 'order/add/';
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
}
