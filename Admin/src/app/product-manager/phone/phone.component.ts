import {Component, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {DataTableResource} from 'angular-2-data-table';
import {FileUploader} from 'ng2-file-upload';
import {AuthService} from '../../shared/services/auth.service';
import {ProductService} from '../../shared/services/product.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ManufactureService} from '../../shared/services/manufacture.service';
import {Manufacture} from '../../shared/models/manufacture';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {
  phones: Product[] = [];
  currentPagePhones: Product[] = [];

  manufactures: Manufacture[] = [];

  phonesCount: number;
  phonesResource = new DataTableResource(this.phones);

  pageLimit = 10;

  uploader: FileUploader;
  selectedImageUrlPaths: any[] = [];

  isAddNew = false;
  isModify = false;
  selectedProduct: Product = new Product();

  constructor(private authService: AuthService, private productService: ProductService,
              private sanitizer: DomSanitizer, private manufactureService: ManufactureService) {

    this.manufactureService.getManufacture().subscribe(
      data => {
        this.manufactures = data['content'];
      },
      err => {
        console.log(err);
      }
    );

    this.productService.getAllProductsByType('0', null).subscribe(
      data => {
        this.phones = data['content'];
        this.phonesResource = new DataTableResource(this.phones);
        this.phonesResource.count().then(count => this.phonesCount = count);
        this.updateDataTable();
      },
      err => {
        console.log(err);
      }
    );

    this.uploader = new FileUploader(
      {
        url: this.productService.uploadImageUrl,
        authToken: this.authService.getAccessToken(),
        itemAlias: 'ImgFile'
      });
    this.uploader.onAfterAddingFile = (fileItem) => {
      fileItem.withCredentials = false;
      this.selectedImageUrlPaths.push(this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file))));
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(response);
      if (status === 200) {
        this.selectedProduct.productImageUrls.push(JSON.parse(response)['content']);
      }
    };
    this.uploader.onCompleteAll = () => {
      console.log(this.selectedProduct.productImageUrls);
      this.productService.addProduct(this.selectedProduct).subscribe(
        data => {
          this.selectedProduct.isModify = false;
        },
        err => {
          console.log(err);
        }
      );
    };
  }

  ngOnInit() {
  }

  reload(event) {
    this.phonesResource.query(event).then(phones => this.currentPagePhones = phones);
  }

  addNew() {
    if (this.isModify || this.isAddNew) {
      return;
    }
    this.isAddNew = true;
    const newProduct = new Product();
    newProduct.isModify = true;
    this.phones.push(newProduct);
    this.phonesResource = new DataTableResource(this.phones);
    this.phonesResource.count().then(count => this.phonesCount = count);

    const query = {
      limit: this.pageLimit,
      offset: (this.phones.length % this.pageLimit) && this.phones.length ?
        (this.phones.length - this.phones.length % this.pageLimit) : this.phones.length - this.pageLimit
    };
    this.phonesResource.query(query).then(phones => this.currentPagePhones = phones);
  }

  finish(item: Product) {
    if (this.isAddNew) {
      this.finishAddNew(item);
    } else {
      this.finishEdit(item);
    }
  }

  finishAddNew(item: Product) {
    console.log(item);
    this.selectedProduct = item;
    if (this.uploader.queue.length > 0) {
      this.uploader.queue[0].upload();
    } else {
      this.productService.addProduct(this.selectedProduct).subscribe(
        data => {
          item.isModify = false;
          this.isAddNew = false;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  edit(item: Product) {
    item.isModify = true;
    this.isModify = true;
  }

  finishEdit(item: Product) {
    console.log(item);
    this.selectedProduct = item;
    if (this.uploader.queue.length > 0) {
      this.uploader.queue[0].upload();
    } else {
      this.productService.editProduct(item).subscribe(
        data => {
          item.isModify = false;
          this.isModify = false;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  remove(item: Product) {
    if (confirm('Bạn có chắc chắn muốn xóa ?')) {
      this.productService.removeProduct(item.id).subscribe(
        data => {
          this.phones.splice(this.phones.indexOf(item), 1);
          this.updateDataTable();
        },
        err => {
          console.log(err);
        }
      );
    }
    this.phonesResource = new DataTableResource(this.phones);
    this.phonesResource.count().then(count => this.phonesCount = count);
    this.updateDataTable();
  }

  updateDataTable() {
    const query = {
      limit: this.pageLimit,
      offset: (this.phones.length % this.pageLimit) && this.phones.length ?
        ((this.phones.length - this.phones.length % this.pageLimit) < 0 ? 0 : 0)
        : ((this.phones.length - this.pageLimit) < 0 ? 0 : 0)
    };
    this.phonesResource.query(query).then(phones => this.currentPagePhones = phones);
  }
}
