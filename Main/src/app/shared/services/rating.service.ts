import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class RatingService {

  public getRatingUrl: string;
  public updateRatingUrl: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getRatingUrl = authService.apiUrl + 'rating/get/';
    this.updateRatingUrl = authService.apiUrl + 'rating/update/';
  }

  getRating(productId) {
    const url = this.getRatingUrl + productId;
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

  updateRating(productId, rating: number) {
    const url = this.updateRatingUrl;
    const data = {
      productId: productId,
      rating: rating
    };
    const options = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.authService.getAccessToken()
        }
      )
    };
    return this.http.put(url, data, options);
  }
}
