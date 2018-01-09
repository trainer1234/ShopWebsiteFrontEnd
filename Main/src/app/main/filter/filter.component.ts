import {Component, Input, OnInit} from '@angular/core';
import {ManufactureService} from '../../shared/services/manufacture.service';
import {Manufacture} from '../../shared/models/manufacture';
import {EmitterService} from '../../shared/services/emitter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() type: string;

  manufactures: Manufacture[];

  filterEmmiter = EmitterService.get('Filter');
  checkManufactuer: boolean[] = [];
  checkPrice: boolean[] = [];

  constructor(private manufactureService: ManufactureService) {
  }

  ngOnInit() {
    this.checkManufactuer[0] = true;
    this.checkPrice[0] = true;

    this.manufactureService.getManufactureByType(this.type).subscribe(
      data => {
        this.manufactures = data['content'];
      },
      err => {
        console.log(err);
      }
    );
  }

  check(msg: string, index: number) {
    // const token: string[] = msg.split('/');
    // if (token[0] === 'm') {
    //   if (index !== 0) {
    //     this.checkManufactuer[0] = false;
    //     let flag = false;
    //     for (let i = 1; i <= this.manufactures.length; i++) {
    //       if(!this.checkManufactuer[i]){
    //         flag = true;
    //         break;
    //       }
    //     }
    //     if(!flag){
    //       this.checkManufactuer[0] = true;
    //       for (let i = 1; i <= this.manufactures.length; i++) {
    //         this.checkManufactuer[i] = false;
    //       }
    //     }else {
    //       // this.checkManufactuer[index] = !this.checkManufactuer[index];
    //     }
    //     console.log(this.checkManufactuer);
    //   }
    // } else if (token[0] === 'p') {
    //   if (index !== 0) {
    //     this.checkPrice[index] = !this.checkPrice[index];
    //     let flag = false;
    //     for (let i = 1; i < 7; i++) {
    //       if(!this.checkPrice[i]){
    //
    //       }
    //     }
    //   }
    // }

    this.filterEmmiter.emit(msg);
  }
}
