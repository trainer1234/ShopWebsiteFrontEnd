import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.loginForm = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  login(username: string, password: string) {
    console.log(username);
    console.log(password);
    this.authService.login(username, password).subscribe(
      data => {
        sessionStorage.setItem('currentUser', username);
        sessionStorage.setItem('accessToken', data['accessToken']);
        sessionStorage.setItem('role', data['role']);
        this.router.navigate(['/']);
      },
      err => {
        alert('Login failed!');
        console.log(err);
      }
    );
  }
}
