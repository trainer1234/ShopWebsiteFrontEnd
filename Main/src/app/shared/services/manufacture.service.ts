import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ManufactureService {
  getManufactureUrl: string;
  getManufactureByTypeUrl: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getManufactureUrl = authService.apiUrl + 'manufacture/get/';
    this.getManufactureByTypeUrl = authService.apiUrl + 'manufacture/filter/';
  }

  getManufacture(){
    const url = this.getManufactureUrl;
    return this.http.get(url);
  }

  getManufactureByType(type: string) {
    const url = this.getManufactureByTypeUrl + type;
    return this.http.get(url);
  }
}
