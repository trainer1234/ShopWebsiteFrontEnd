import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { WaitingProcessManagerComponent } from './order-manager/waiting-process-manager/waiting-process-manager.component';
import { FinishedOrderManagerComponent } from './order-manager/finished-order-manager/finished-order-manager.component';
import {UnprocessedOrderManagerComponent} from './order-manager/unprocessed-order-manager/unprocessed-order-manager.component';
import {ProcessingOrderManagerComponent} from './order-manager/processing-order-manager/processing-order-manager.component';
import { ProductPropertyManagerComponent } from './product-property-manager/product-property-manager.component';
import { AccountManagerComponent } from './account-manager/account-manager.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import {AuthGuard} from './auth.guard';
import {HttpClientModule} from '@angular/common/http';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductManagerComponent,
    UnprocessedOrderManagerComponent,
    ProcessingOrderManagerComponent,
    WaitingProcessManagerComponent,
    FinishedOrderManagerComponent,
    ProductPropertyManagerComponent,
    AccountManagerComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [FormBuilder, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
