import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {PhoneComponent} from './phone/phone.component';
import {TabletComponent} from './tablet/tablet.component';
import {AccessoriesComponent} from './accessories/accessories.component';
import {PromotionComponent} from './promotion/promotion.component';
import {CartComponent} from './cart/cart.component';
import {HomepageComponent} from './homepage/homepage.component';
import {ProductOrderSearchComponent} from './product-order-search/product-order-search.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';

const routes: Routes = [
  {path: '', component: HeaderComponent, outlet: 'header'},
  {path: '', component: FooterComponent, outlet: 'footer'},
  {
    path: '',
    component: HomepageComponent,
  },
  {path: 'phone', component: PhoneComponent},
  {path: 'tablet', component: TabletComponent},
  {path: 'accessories', component: AccessoriesComponent},
  {path: 'promotion', component: PromotionComponent},
  {path: 'cart', component: CartComponent},
  {path: 'product-order-search', component: ProductOrderSearchComponent},
  {
    path: ':id',
    component: ProductDetailComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class MainRoutingModule {
}
