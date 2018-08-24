import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PhoneComponent } from './phone/phone.component';
import { TabletComponent } from './tablet/tablet.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { PromotionComponent } from './promotion/promotion.component';
import { CartComponent } from './cart/cart.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductOrderSearchComponent } from './product-order-search/product-order-search.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LaptopComponent } from './laptop/laptop.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from '../shared/auth.guard';
import { BaoKimComponent } from '../bao-kim/bao-kim/bao-kim.component';

const routes: Routes = [
  { path: '', component: HeaderComponent, outlet: 'header' },
  { path: '', component: FooterComponent, outlet: 'footer' },
  {
    path: '',
    component: HomepageComponent,
  },
  { path: 'phone', component: PhoneComponent },
  { path: 'laptop', component: LaptopComponent },
  { path: 'tablet', component: TabletComponent },
  { path: 'accessories', component: AccessoriesComponent },
  { path: 'promotion', component: PromotionComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'search/:key', component: SearchResultComponent },
  { path: 'product-order-search', component: ProductOrderSearchComponent },
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
