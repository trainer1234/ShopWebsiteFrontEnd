import {Component, OnInit} from '@angular/core';
import {DataTableResource} from 'angular-2-data-table';
import {Property} from '../shared/models/property';
import {PropertyService} from '../shared/services/property.service';

@Component({
  selector: 'app-product-property-manager',
  templateUrl: './product-property-manager.component.html',
  styleUrls: ['./product-property-manager.component.css']
})
export class ProductPropertyManagerComponent implements OnInit {
  properties: Property[] = [];
  currentPageProperties: Property[] = [];
  propertiesCount: number;
  propertiesResource = new DataTableResource(this.properties);

  pageLimit = 10;

  isAddNew = false;
  isModify = false;

  constructor(private propertyService: PropertyService) {
  }

  ngOnInit() {
    this.propertyService.getAllProperties().subscribe(
      data => {
        console.log(data);
        if (data['succeed']) {
          this.properties = data['content'];
        }
        this.propertiesResource = new DataTableResource(this.properties);
        this.propertiesResource.count().then(count => this.propertiesCount = count);

        this.updateDataTable();
      },
      err => {
        console.log(err);
      }
    );
  }

  reload(event) {
    this.propertiesResource.query(event).then(manufacture => this.currentPageProperties = manufacture);
  }

  addNew() {
    this.isAddNew = true;

    const newProperty = new Property();
    newProperty.isModify = true;
    console.log(newProperty);
    this.properties.push(newProperty);
    this.propertiesResource = new DataTableResource(this.properties);
    this.propertiesResource.count().then(count => this.propertiesCount = count);

    this.updateDataTable();
  }

  finish(item: Property) {
    if (this.isAddNew) {
      this.finishModify(item);
    } else {
      this.finishEdit(item);
    }
  }

  finishModify(item: Property) {
    this.propertyService.addProperty(item).subscribe(
      data => {
        item.isModify = false;
        this.isAddNew = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  edit(item: Property) {
    item.isModify = true;
    this.isModify = true;
  }

  finishEdit(item: Property) {
    console.log(item);
    this.propertyService.editProperty(item).subscribe(
      data => {
        item.isModify = false;
        this.isModify = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  remove(item: Property) {
    if (confirm('Bạn có chắc chắn muốn xóa ?')) {
      this.propertyService.removeProperty(item.id).subscribe(
        data => {
          this.properties.splice(this.properties.indexOf(item), 1);
          this.updateDataTable();
        },
        err => {
          console.log(err);
        }
      );
    }
    this.propertiesResource = new DataTableResource(this.properties);
    this.propertiesResource.count().then(count => this.propertiesCount = count);
    this.updateDataTable();
  }

  updateDataTable() {
    const query = {
      limit: this.pageLimit,
      offset: (this.properties.length % this.pageLimit) && this.properties.length ?
        ((this.properties.length - this.properties.length % this.pageLimit) < 0 ? 0 : 0)
        : ((this.properties.length - this.pageLimit) < 0 ? 0 : 0)
    };
    this.propertiesResource.query(query).then(properties => this.currentPageProperties = properties);
  }
}
