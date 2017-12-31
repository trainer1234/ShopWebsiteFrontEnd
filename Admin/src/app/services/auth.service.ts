import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {
  apiUrl = 'http://localhost:61151/api/';
  loginUrl = this.apiUrl + 'account/login';

  constructor(private http: HttpClient) {
  }

  getAccessToken() {
    return 'bearer' + sessionStorage.getItem('accessToken');
  }

  login(username: string, password: string) {
    const url = this.loginUrl;
    return this.http.post(url, {
      userName: username,
      password: password
    });
  }
}
