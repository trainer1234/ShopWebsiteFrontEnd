import {Component, OnInit} from '@angular/core';
import {EmitterService} from '../../shared/services/emitter.service';
import {until} from 'selenium-webdriver';
import elementLocated = until.elementLocated;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  chosenProductNum = 0;

  cartEmitter = EmitterService.get('cart');

  constructor() {
    this.cartEmitter.subscribe(
      msg => {
        if (msg === 'add') {
          this.chosenProductNum++;
        } else if(msg === 'reset'){
          this.chosenProductNum = 0;
          const cart = JSON.parse(sessionStorage.getItem('cart'));
          cart.forEach(
            element => {
              this.chosenProductNum += element.quantity;
            }
          );
        } else if(msg === 'clear'){
          this.chosenProductNum = 0;
        } else{
          const token: string[] = msg.split('/');
          this.chosenProductNum = Number(token[1]);
        }
      }
    );
  }

  ngOnInit() {
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    cart.forEach(
      element => {
        this.chosenProductNum += element.quantity;
      }
    );
  }

}
