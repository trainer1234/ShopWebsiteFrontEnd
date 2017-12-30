import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {AdminComponent} from './admin/admin.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
