import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AccountService {

  getAllAccountUrl: string;
  addAccountUrl: string;
  editAccountUrl: string;
  removeAccountUrl: string;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.getAllAccountUrl = this.authService.apiUrl + 'account/get';
    this.addAccountUrl = this.authService.apiUrl + 'account/register';
    this.editAccountUrl = this.authService.apiUrl + 'account/edit';
    this.removeAccountUrl = this.authService.apiUrl + 'account/remove';
  }

  getAllAccounts() {
    const url = this.getAllAccountUrl;
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

  addAccount(account) {
    const url = this.addAccountUrl;
    return this.http.post(url, account);
  }

  editAccount(account) {
    const url = this.editAccountUrl;
    const options = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.authService.getAccessToken()
        }
      )
    };
    return this.http.put(url, account, options);
  }

  removeAccount(userName: string) {
    const url = this.removeAccountUrl;
    const data: FormData = new FormData();
    data.append('userName', userName);
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
