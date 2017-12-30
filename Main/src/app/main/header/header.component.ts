import {Component, OnInit} from '@angular/core';
import {EmitterService} from '../../shared/services/emitter.service';

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
        } else {
          this.chosenProductNum--;
        }
      }
    );
  }

  ngOnInit() {
  }

}
