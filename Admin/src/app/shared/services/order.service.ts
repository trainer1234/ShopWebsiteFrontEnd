import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class OrderService {
  private getOrderUrl: string;
  private editOrderUrl: string;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.getOrderUrl = this.authService.apiUrl + 'order/get/';
    this.editOrderUrl = this.authService.apiUrl + 'order/edit/';
  }

  getAllOrdersByType(type: string) {
    const url = this.getOrderUrl;
    const params = new HttpParams().set('type', type);

    return this.http.get(url, {
      params: params
    });
  }

  editOrder() {

  }
}
