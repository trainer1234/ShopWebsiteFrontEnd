import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {PhoneComponent} from './phone/phone.component';
import {TabletComponent} from './tablet/tablet.component';
import {AccessoriesComponent} from './accessories/accessories.component';
import {PromotionComponent} from './promotion/promotion.component';
import {ContactComponent} from './contact/contact.component';
import {CartComponent} from './cart/cart.component';

const routes: Routes = [
  {path: '', component: HeaderComponent, outlet: 'header'},
  {path: '', component: HomepageComponent},
  {path: '', component: FooterComponent, outlet: 'footer'},
  {path: 'phone', component: PhoneComponent},
  {path: 'tablet', component: TabletComponent},
  {path: 'accessories', component: AccessoriesComponent},
  {path: 'promotion', component: PromotionComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'cart', component: CartComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class MainRoutingModule { }
