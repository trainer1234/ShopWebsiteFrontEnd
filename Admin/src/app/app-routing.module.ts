import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UnprocessedOrderManagerComponent} from './order-manager/unprocessed-order-manager/unprocessed-order-manager.component';
import {WaitingProcessManagerComponent} from './order-manager/waiting-process-manager/waiting-process-manager.component';
import {FinishedOrderManagerComponent} from './order-manager/finished-order-manager/finished-order-manager.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProcessingOrderManagerComponent} from './order-manager/processing-order-manager/processing-order-manager.component';
import {ProductPropertyManagerComponent} from './product-property-manager/product-property-manager.component';
import {AccountManagerComponent} from './account-manager/account-manager.component';
import {ProductManagerComponent} from './product-manager/product-manager.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
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
      }
    ]
  },
  {
    path: 'product-manager',
    component: ProductManagerComponent
  },
  {
    path: 'product-property-manager',
    component: ProductPropertyManagerComponent
  },
  {
    path: 'account-manager',
    component: AccountManagerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule {
}
