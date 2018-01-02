import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Manufacture} from '../models/manufacture';

@Injectable()
export class ManufactureService {
  getManufactureUrl: string;
  addManufactureUrl: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getManufactureUrl = authService.apiUrl + 'manufacture/get';
    this.addManufactureUrl = authService.apiUrl + 'manufacture/add';
  }

  getManufacture() {
    const url = this.getManufactureUrl;
    return this.http.get(url);
  }

  addManufacture(manufacture: Manufacture) {
    const url = this.addManufactureUrl;
    const options = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.authService.getAccessToken()
        }
      )
    };
    return this.http.post(url, manufacture, options);
  }
}
