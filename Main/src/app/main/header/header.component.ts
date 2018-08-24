import { AfterViewChecked, AfterViewInit, Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { EmitterService } from '../../shared/services/emitter.service';
import { until } from 'selenium-webdriver';
import elementLocated = until.elementLocated;
import { Router } from '@angular/router';

import { isPlatformBrowser } from '@angular/common';

import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewChecked {
  chosenProductNum = 0;

  cartEmitter = EmitterService.get('cart');
  searchEmitter = EmitterService.get('search');

  searchKeyword: string;

  userName = '';

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.cartEmitter.subscribe(
        msg => {
          if (msg === 'add') {
            this.chosenProductNum++;
          } else if (msg === 'reset') {
            this.chosenProductNum = 0;
            const cart = JSON.parse(sessionStorage.getItem('cart'));
            cart.forEach(
              element => {
                this.chosenProductNum += element.quantity;
              }
            );
          } else if (msg === 'clear') {
            this.chosenProductNum = 0;
            sessionStorage.clear();
          } else {
            const token: string[] = msg.split('/');
            this.chosenProductNum = Number(token[1]);
          }
        }
      );
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.userName = sessionStorage.getItem('currentUser');
      console.log(this.userName);
      const cart = JSON.parse(sessionStorage.getItem('cart'));
      if (cart) {
        cart.forEach(
          element => {
            this.chosenProductNum += element.quantity;
          }
        );
      }
    }
  }

  ngAfterViewChecked() {
    $('#search').keyup(function (event) {
      if (event.keyCode === 13) {
        $('#search-button').click();
      }
    });
  }

  search() {
    this.searchEmitter.emit(this.searchKeyword);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
      this.userName = '';
      this.router.navigate(['/']);
    }
  }
}
