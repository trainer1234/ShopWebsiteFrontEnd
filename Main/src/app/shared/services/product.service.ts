import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProductService {
  getProductByTypeUrl: string;
  getProductByIdUrl: string;
  getSearchedProductUrl: string;
  getTopViewProductUrl: string;
  getTopPurchasedProductUrl: string;
  getRecommendProductUrl: string;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.getProductByIdUrl = authService.apiUrl + 'product/get/';
    this.getProductByTypeUrl = authService.apiUrl + 'product/get-recent/';
    this.getSearchedProductUrl = authService.apiUrl + 'product/search/';
    this.getTopViewProductUrl = authService.apiUrl + 'product/view/get/5';
    this.getTopPurchasedProductUrl = authService.apiUrl + 'product/purchasecounter/get/5';
    this.getRecommendProductUrl = authService.apiUrl + 'rating/recommend';
  }

  getAllProductsByType(type: string, num: number) {
    const url = this.getProductByTypeUrl;
    const params = new HttpParams().set('type', type).set('num', String(num));

    return this.http.get(url, {
      params: params
    });
  }

  getTopViewProduct() {
    const url = this.getTopViewProductUrl;
    return this.http.get(url);
  }

  getTopPurchasedProduct() {
    const url = this.getTopPurchasedProductUrl;
    return this.http.get(url);
  }

  getProductById(id: string) {
    const url = this.getProductByIdUrl + id;
    return this.http.get(url);
  }

  searchProduct(keyword: string) {
    const url = this.getSearchedProductUrl + keyword;
    return this.http.get(url);
  }

  getRecommendProduct() {
    const url = this.getRecommendProductUrl;
    const options = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.authService.getAccessToken()
        }
      )
    };
    return this.http.get(url, options);
  }
}
