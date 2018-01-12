import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userName: string;
  role: number;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.userName = sessionStorage.getItem('currentUser');
    this.role = Number(sessionStorage.getItem('role'));
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
