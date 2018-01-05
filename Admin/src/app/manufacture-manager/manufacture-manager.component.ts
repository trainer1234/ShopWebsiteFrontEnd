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

  isAddNew = false;

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

        this.updateDataTable();
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
    this.isAddNew = true;

    const newManufacture = new Manufacture();
    newManufacture.isModify = true;
    console.log(newManufacture);
    this.manufactures.push(newManufacture);
    this.manufacturesResource = new DataTableResource(this.manufactures);
    this.manufacturesResource.count().then(count => this.manufacturesCount = count);

    this.updateDataTable();
  }

  finish(item: Manufacture) {
    if (this.isAddNew) {
      this.finishAddNew(item);
    } else {
      this.finishEdit(item);
    }
  }

  finishAddNew(item: Manufacture) {
    this.manufactureService.addManufacture(item).subscribe(
      data => {
        item.isModify = false;
        this.isAddNew = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  chooseManufacture(item: Manufacture, productType: number) {
    if (item.types.indexOf(productType) !== -1) {
      item.types.splice(item.types.indexOf(productType), 1);
    } else {
      item.types.push(productType);
    }
  }

  edit(item: Manufacture) {
    item.isModify = true;
  }

  finishEdit(item: Manufacture) {
    console.log(item);
    this.manufactureService.editManufacture(item).subscribe(
      data => {
        item.isModify = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  remove(item: Manufacture) {
    if (confirm('Bạn có chắc chắn muốn xóa ?')) {
      this.manufactureService.removeManufacture(item.id).subscribe(
        data => {
          this.manufactures.splice(this.manufactures.indexOf(item), 1);
          this.updateDataTable();
        },
        err => {
          console.log(err);
        }
      );
    }
    this.manufacturesResource = new DataTableResource(this.manufactures);
    this.manufacturesResource.count().then(count => this.manufacturesCount = count);
    this.updateDataTable();
  }

  updateDataTable() {
    const query = {
      limit: this.pageLimit,
      offset: (this.manufactures.length % this.pageLimit) && this.manufactures.length ?
        ((this.manufactures.length - this.manufactures.length % this.pageLimit) < 0 ? 0 : 0)
        : ((this.manufactures.length - this.pageLimit) < 0 ? 0 : 0)
    };
    this.manufacturesResource.query(query).then(manufactures => this.currentPageManufactures = manufactures);
  }
}
