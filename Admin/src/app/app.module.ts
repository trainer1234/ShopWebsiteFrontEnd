import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {WaitingProcessManagerComponent} from './order-manager/waiting-process-manager/waiting-process-manager.component';
import {FinishedOrderManagerComponent} from './order-manager/finished-order-manager/finished-order-manager.component';
import {UnprocessedOrderManagerComponent} from './order-manager/unprocessed-order-manager/unprocessed-order-manager.component';
import {ProcessingOrderManagerComponent} from './order-manager/processing-order-manager/processing-order-manager.component';
import {ProductPropertyManagerComponent} from './product-property-manager/product-property-manager.component';
import {AccountManagerComponent} from './account-manager/account-manager.component';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './auth.guard';
import {HttpClientModule} from '@angular/common/http';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './shared/services/auth.service';
import {DataTableModule} from 'angular-2-data-table';
import {PhoneComponent} from './product-manager/phone/phone.component';
import {TabletComponent} from './product-manager/tablet/tablet.component';
import {AccessitoryComponent} from './product-manager/accessitory/accessitory.component';
import {LaptopComponent} from './product-manager/laptop/laptop.component';
import {FileUploadModule} from 'ng2-file-upload';
import {ProductService} from './shared/services/product.service';
import {ManufactureService} from './shared/services/manufacture.service';
import { ManufactureManagerComponent } from './manufacture-manager/manufacture-manager.component';
import {PropertyService} from './shared/services/property.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UnprocessedOrderManagerComponent,
    ProcessingOrderManagerComponent,
    WaitingProcessManagerComponent,
    FinishedOrderManagerComponent,
    ProductPropertyManagerComponent,
    AccountManagerComponent,
    LoginComponent,
    AdminComponent,
    PhoneComponent,
    TabletComponent,
    AccessitoryComponent,
    LaptopComponent,
    ManufactureManagerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DataTableModule,
    FileUploadModule
  ],
  providers: [
    FormBuilder,
    AuthGuard,
    AuthService,
    ProductService,
    PropertyService,
    ManufactureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
