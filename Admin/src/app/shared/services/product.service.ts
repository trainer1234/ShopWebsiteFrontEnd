import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Product} from '../models/product';
import {Manufacture} from '../models/manufacture';

@Injectable()
export class ProductService {
  getProductByTypeUrl: string;
  getProductByIdUrl: string;
  addProductUrl: string;
  editProductUrl: string;
  removeProductUrl: string;
  uploadImageUrl: string;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.uploadImageUrl = authService.apiUrl + 'image/upload/';
    this.getProductByIdUrl = authService.apiUrl + 'product/get/';
    this.getProductByTypeUrl = authService.apiUrl + 'product/get-recent/';
    this.addProductUrl = authService.apiUrl + 'product/add/';
    this.editProductUrl = authService.apiUrl + 'product/edit/';
    this.removeProductUrl = authService.apiUrl + 'product/remove/';
  }

  getAllProductsByType(type: string, num: number) {
    const url = this.getProductByTypeUrl;
    const params = new HttpParams().set('type', type);

    if (num != null) {
      params.set('num', String(num));
    }

    return this.http.get(url, {
      params: params
    });
  }

  getProductById(id: string) {
    const url = this.getProductByIdUrl + id;
    return this.http.get(url);
  }

  addProduct(product: Product) {
    const url = this.addProductUrl;
    const options = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.authService.getAccessToken()
        }
      )
    };
    return this.http.post(url, product, options);
  }

  editProduct(product: Product) {
    const url = this.editProductUrl;
    const options = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.authService.getAccessToken()
        }
      )
    };
    return this.http.put(url, product, options);
  }

  removeProduct(productId: string) {
    const url = this.removeProductUrl;
    const data: FormData = new FormData();
    data.append('productId', productId);
    const options = {
      headers: new HttpHeaders(
        {
          'Accept': 'application/json',
          'Authorization': this.authService.getAccessToken()
        }
      )
    };
    return this.http.post(url, data, options);
  }
}
