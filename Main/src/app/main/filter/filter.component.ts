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
    this.filterEmmiter.emit(msg);
  }
}
