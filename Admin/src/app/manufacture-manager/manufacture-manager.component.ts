import {Component, OnInit} from '@angular/core';
import {ManufactureService} from '../shared/services/manufacture.service';
import {Manufacture} from '../shared/models/manufacture';
import {DataTableResource} from 'angular-2-data-table';

@Component({
  selector: 'app-manufacture-manager',
  templateUrl: './manufacture-manager.component.html',
  styleUrls: ['./manufacture-manager.component.css']
})
export class ManufactureManagerComponent implements OnInit {

  manufactures: Manufacture[] = [];
  currentPageManufactures: Manufacture[] = [];
  manufacturesCount: number;
  manufacturesResource = new DataTableResource(this.manufactures);

  pageLimit = 10;

  constructor(private manufactureService: ManufactureService) {
  }

  ngOnInit() {
    this.manufactureService.getManufacture().subscribe(
      data => {
        console.log(data);
        if (data['succeed']) {
          this.manufactures = data['content'];
        }
        this.manufacturesResource = new DataTableResource(this.manufactures);
        this.manufacturesResource.count().then(count => this.manufacturesCount = count);

        const query = {
          limit: this.pageLimit,
          offset: (this.manufactures.length % this.pageLimit) && this.manufactures.length ?
            (this.manufactures.length - this.manufactures.length % this.pageLimit) : this.manufactures.length - this.pageLimit
        };
        this.manufacturesResource.query(query).then(manufactures => this.currentPageManufactures = manufactures);
      },
      err => {
        console.log(err);
      }
    );
  }

  reload(event) {
    this.manufacturesResource.query(event).then(manufacture => this.currentPageManufactures = manufacture);
  }

  addNew() {
    const newManufacture = new Manufacture();
    newManufacture.isModify = true;
    console.log(newManufacture);
    this.manufactures.push(newManufacture);
    this.manufacturesResource = new DataTableResource(this.manufactures);
    this.manufacturesResource.count().then(count => this.manufacturesCount = count);

    const query = {
      limit: this.pageLimit,
      offset: (this.manufactures.length % this.pageLimit) && this.manufactures.length ?
        (this.manufactures.length - this.manufactures.length % this.pageLimit) : this.manufactures.length - this.pageLimit
    };
    this.manufacturesResource.query(query).then(manufactures => this.currentPageManufactures = manufactures);
  }

  finishAddNew(item: Manufacture) {
    this.manufactureService.addManufacture(item).subscribe(
      data => {
        item.isModify = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  choosenManufacture(item: Manufacture, productType: string) {
    if (item.types.indexOf(productType) !== -1) {
      item.types.splice(item.types.indexOf(productType), 1);
    } else {
      item.types.push(productType);
    }
  }
}
