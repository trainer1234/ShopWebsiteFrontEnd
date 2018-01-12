import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UnprocessedOrderManagerComponent} from './order-manager/unprocessed-order-manager/unprocessed-order-manager.component';
import {WaitingProcessManagerComponent} from './order-manager/waiting-process-manager/waiting-process-manager.component';
import {FinishedOrderManagerComponent} from './order-manager/finished-order-manager/finished-order-manager.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProcessingOrderManagerComponent} from './order-manager/processing-order-manager/processing-order-manager.component';
import {ProductPropertyManagerComponent} from './product-property-manager/product-property-manager.component';
import {AccountManagerComponent} from './account-manager/account-manager.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {AdminComponent} from './admin/admin.component';
import {PhoneComponent} from './product-manager/phone/phone.component';
import {TabletComponent} from './product-manager/tablet/tablet.component';
import {AccessitoryComponent} from './product-manager/accessitory/accessitory.component';
import {LaptopComponent} from './product-manager/laptop/laptop.component';
import {ManufactureService} from './shared/services/manufacture.service';
import {ManufactureManagerComponent} from './manufacture-manager/manufacture-manager.component';
import {CanceledOrderManagerComponent} from './order-manager/canceled-order-manager/canceled-order-manager.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/product-manager/phone',
        pathMatch: 'full'
      },
      {
        path: 'product-manager',
        children: [
          {
            path: '',
            redirectTo: '/product-manager/phone',
            pathMatch: 'full'
          },
          {
            path: 'phone',
            component: PhoneComponent
          },
          {
            path: 'laptop',
            component: LaptopComponent
          },
          {
            path: 'tablet',
            component: TabletComponent
          },
          {
            path: 'accessitory',
            component: AccessitoryComponent
          }
        ]
      },
      {
        path: 'order-manager',
        children: [
          {
            path: '',
            redirectTo: '/order-manager/unprocessed',
            pathMatch: 'full'
          },
          {
            path: 'unprocessed',
            component: UnprocessedOrderManagerComponent
          },
          {
            path: 'wating-process',
            component: WaitingProcessManagerComponent
          },
          {
            path: 'processing',
            component: ProcessingOrderManagerComponent
          },
          {
            path: 'finished',
            component: FinishedOrderManagerComponent
          },
          {
            path: 'canceled',
            component: CanceledOrderManagerComponent
          }
        ]
      },
      {
        path: 'manufacture-manager',
        component: ManufactureManagerComponent
      },
      {
        path: 'product-property-manager',
        component: ProductPropertyManagerComponent
      },
      {
        path: 'account-manager',
        component: AccountManagerComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule {
}
