import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {MainRoutingModule} from './main-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PhoneComponent } from './phone/phone.component';
import { TabletComponent } from './tablet/tablet.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { PromotionComponent } from './promotion/promotion.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FilterComponent } from './filter/filter.component';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../shared/services/product.service';
import {AuthService} from '../shared/services/auth.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ManufactureService} from '../shared/services/manufacture.service';
import {OrderService} from '../shared/services/order.service';
import { ProductOrderSearchComponent } from './product-order-search/product-order-search.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import { LaptopComponent } from './laptop/laptop.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MainRoutingModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  providers: [
    AuthService,
    ProductService,
    ManufactureService,
    OrderService
  ],
  declarations: [HomepageComponent, HeaderComponent, FooterComponent, PhoneComponent, TabletComponent, AccessoriesComponent, PromotionComponent, CartComponent, ProductComponent, ProductListComponent, FilterComponent, ProductOrderSearchComponent, ProductDetailComponent, LaptopComponent]
})
export class MainModule { }
