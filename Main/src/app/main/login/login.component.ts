import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userName: string;
  public password: string;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.userName, this.password).subscribe(
      data => {
        alert('Đăng nhập thành công!');
        sessionStorage.setItem('currentUser', this.userName);
        sessionStorage.setItem('accessToken', data['accessToken']);
        sessionStorage.setItem('role', data['role']);
        window.location.reload();
        this.router.navigate(['/']);
      },
      err => {
        alert('Đăng nhập thất bại!');
        console.log(err);
      }
    );    
  }
}
