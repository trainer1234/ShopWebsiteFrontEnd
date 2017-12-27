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

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
  ],
  declarations: [HomepageComponent, HeaderComponent, FooterComponent, PhoneComponent, TabletComponent, AccessoriesComponent, PromotionComponent, ContactComponent, CartComponent]
})
export class MainModule { }
