import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ManufactureService {
  getManufactureUrl: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getManufactureUrl = authService.apiUrl + 'manufacture/get';
  }

  getManufacture(){
    const url = this.getManufactureUrl;
    return this.http.get(url);
  }
}
