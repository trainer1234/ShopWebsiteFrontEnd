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
  products: Product[] = [];
  currentPageProducts: Product[] = [];

  manufactures: Manufacture[] = [];
  properties: Property[] = [];

  productsCount: number;
  productsResource = new DataTableResource(this.products);

  pageLimit = 10;

  editorOptions = {};
  uploader: FileUploader;
  selectedImageUrlPaths: any[] = [];

  isAddNewProduct = false;
  isModifyProduct = false;
  isAddNewProperty = false;

  selectedProduct: Product = new Product();
  newProperty: Property = new Property();

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
        this.products = data['content'];
        console.log(this.products);
        this.productsResource = new DataTableResource(this.products);
        this.productsResource.count().then(count => this.productsCount = count);
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
          this.selectedProduct.isModifyProduct = false;
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
    this.productsResource.query(event).then(products => this.currentPageProducts = products);
  }

  addNewProduct(item: Product) {
    if (this.isModifyProduct || this.isAddNewProduct) {
      return;
    }

    this.isAddNewProduct = true;
    this.selectedProduct = new Product();
    this.selectedProduct.isModifyProduct = true;

    this.products.push(this.selectedProduct);
    this.productsResource = new DataTableResource(this.products);
    this.productsResource.count().then(count => this.productsCount = count);

    const query = {
      limit: this.pageLimit,
      offset: (this.products.length % this.pageLimit) && this.products.length ?
        (this.products.length - this.products.length % this.pageLimit) : this.products.length - this.pageLimit
    };
    this.productsResource.query(query).then(products => this.currentPageProducts = products);
  }

  finish(item: Product) {
    if (this.isAddNewProduct) {
      this.finishAddNew(item);
    } else {
      this.finishEdit(item);
    }
  }

  finishAddNew(item: Product) {
    console.log(item);
    if (this.uploader.queue.length > 0) {
      this.uploader.queue[0].upload();
    } else {
      this.productService.addProduct(this.selectedProduct).subscribe(
        data => {
          item.isModifyProduct = false;
          this.isAddNewProduct = false;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  refillProduct(item: Product) {
    let quantity = prompt('Nhập số lượng hàng hóa bổ sung: ');
    while (isNaN(Number(quantity)) || Number(quantity) < 0) {
      quantity = prompt('Nhập số lượng hàng hóa bổ sung: \n *Chỉ được nhập vào chữ số nguyên dương');
    }
    if (Number(quantity) > 0) {
      item.remain += Number(quantity);
      this.productService.refillProduct(item.id, quantity).subscribe(
        data => {

        },
        err => {
          console.log(err);
        }
      );
    }
  }

  edit(item: Product) {
    item.isModifyProduct = true;
    this.selectedProduct = item;
    this.isModifyProduct = true;
  }

  finishEdit(item: Product) {
    console.log(item);
    this.selectedProduct = item;
    if (this.uploader.queue.length > 0) {
      this.uploader.queue[0].upload();
    } else {
      this.productService.editProduct(item).subscribe(
        data => {
          item.isModifyProduct = false;
          this.isModifyProduct = false;
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
          this.products.splice(this.products.indexOf(item), 1);
          this.updateDataTable();
        },
        err => {
          console.log(err);
        }
      );
    }
    this.productsResource = new DataTableResource(this.products);
    this.productsResource.count().then(count => this.productsCount = count);
    this.updateDataTable();
  }

  addNewProperty() {
    this.newProperty = new Property();
    this.isAddNewProperty = true;
  }

  finishAddNewProperty() {
    if (!this.selectedProduct.properties) {
      this.selectedProduct.properties = [];
    }
    this.selectedProduct.properties.push(this.newProperty);
    this.isAddNewProperty = false;
    console.log(this.selectedProduct);
  }

  removeProperty(propertyIndex: number) {
    if (confirm('Bạn có chắc chắn muốn xóa ?')) {
      this.selectedProduct.properties.splice(propertyIndex, 1);
    }
  }

  updateDataTable() {
    const query = {
      limit: this.pageLimit,
      offset: (this.products.length % this.pageLimit) && this.products.length ?
        ((this.products.length - this.products.length % this.pageLimit) < 0 ? 0 : 0)
        : ((this.products.length - this.pageLimit) < 0 ? 0 : 0)
    };
    this.productsResource.query(query).then(products => this.currentPageProducts = products);
  }

  change(event){
    console.log(event);
  }
}
