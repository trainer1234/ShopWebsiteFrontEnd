import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Property} from '../models/property';

@Injectable()
export class PropertyService {

  getPropertiesUrl: string;
  addPropertyUrl: string;
  editPropertyUrl: string;
  removePropertyUrl: string;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.getPropertiesUrl = authService.apiUrl + 'property/get';
    this.addPropertyUrl = authService.apiUrl + 'property/add';
    this.editPropertyUrl = authService.apiUrl + 'property/edit';
    this.removePropertyUrl = authService.apiUrl + 'property/remove';
  }

  getAllProperties() {
    const url = this.getPropertiesUrl;
    return this.http.get(url);
  }

  addProperty(property: Property) {
    const url = this.addPropertyUrl;
    const options = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.authService.getAccessToken()
        }
      )
    };
    return this.http.post(url, property, options);
  }

  editProperty(property: Property) {
    const url = this.editPropertyUrl;
    const options = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.authService.getAccessToken()
        }
      )
    };
    return this.http.put(url, property, options);
  }

  removeProperty(propertyId: string) {
    const url = this.removePropertyUrl;
    const data: FormData = new FormData();
    data.append('propertyId', propertyId);
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
