import {Component, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {DataTableResource} from 'angular-2-data-table';
import {FileUploader} from 'ng2-file-upload';
import {AuthService} from '../../shared/services/auth.service';
import {ProductService} from '../../shared/services/product.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ManufactureService} from '../../shared/services/manufacture.service';
import {Manufacture} from '../../shared/models/manufacture';
import {Property} from '../../shared/models/property';
import {PropertyService} from '../../shared/services/property.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {
  phones: Product[] = [];
  currentPagePhones: Product[] = [];

  manufactures: Manufacture[] = [];
  properties: Property[] = [];

  phonesCount: number;
  phonesResource = new DataTableResource(this.phones);

  pageLimit = 10;

  editorOptions = {};
  uploader: FileUploader;
  selectedImageUrlPaths: any[] = [];

  isAddNew = false;
  isModify = false;
  selectedProduct: Product = new Product();

  constructor(private authService: AuthService, private productService: ProductService,
              private sanitizer: DomSanitizer, private manufactureService: ManufactureService,
              private propertyService: PropertyService) {

    this.manufactureService.getManufacture().subscribe(
      data => {
        this.manufactures = data['content'];
      },
      err => {
        console.log(err);
      }
    );

    this.propertyService.getAllProperties().subscribe(
      data => {
        this.properties = data['content'];
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

    this.editorOptions = {
      heightMin: 600,
      heightMax: 600,
      requestHeaders: {
        'Authorization': authService.getAccessToken()
      },
      imageUploadParam: 'imgFile',
      imageUploadURL: this.productService.uploadImageUrl,
      imageUploadMethod: 'POST',
      imageMaxSize: 10 * 1024 * 1024,
      events: {
        'froalaEditor.image.uploaded': function (e, editor, response) {
          console.log(response);
          const url = JSON.parse(response)['content'];
          console.log(url);
          editor.image.insert(url);

          return false;
        },
        'froalaEditor.image.error': function (e, editor, error, response) {
          console.log(response);
          console.log(error);
        }
      }
    };

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
