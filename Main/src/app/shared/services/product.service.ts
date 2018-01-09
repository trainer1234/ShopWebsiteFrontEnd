import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class ProductService {
  getProductByTypeUrl: string;
  getProductByIdUrl: string;
  getSearchedProductUrl: string;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.getProductByIdUrl = authService.apiUrl + 'product/get/';
    this.getProductByTypeUrl = authService.apiUrl + 'product/get-recent/';
    this.getSearchedProductUrl = authService.apiUrl + 'product/search/';
  }

  getAllProductsByType(type: string, num: number) {
    const url = this.getProductByTypeUrl;
    const params = new HttpParams().set('type', type).set('num', String(num));

    return this.http.get(url, {
      params: params
    });
  }

  getProductById(id: string) {
    const url = this.getProductByIdUrl + id;
    return this.http.get(url);
  }

  searchProduct(keyword: string){
    const url = this.getSearchedProductUrl + keyword;
    return this.http.get(url);
  }
}
