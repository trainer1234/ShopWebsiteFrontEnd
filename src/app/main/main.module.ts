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
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
  ],
  declarations: [HomepageComponent, HeaderComponent, FooterComponent, PhoneComponent, TabletComponent, AccessoriesComponent, PromotionComponent, ContactComponent, CartComponent, ProductComponent, ProductListComponent, FilterComponent]
})
export class MainModule { }
