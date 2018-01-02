import {Component, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {DataTableResource} from 'angular-2-data-table';
import {FileUploader} from 'ng2-file-upload';
import {AuthService} from '../../shared/services/auth.service';
import {ProductService} from '../../shared/services/product.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
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
  selectedImageUrlPath: SafeUrl;

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
      this.selectedImageUrlPath = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file)));
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status === 200) {

      }
    };
  }

  ngOnInit() {
  }

  reload(event) {
    this.phonesResource.query(event).then(phones => this.currentPagePhones = phones);
  }

  addNew() {
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

  finishAddNew(item: Product) {
    item.isModify = false;
    this.productService.addProduct(item).subscribe(
      data => {

      },
      err => {
        console.log(err);
      }
    );
  }
}
