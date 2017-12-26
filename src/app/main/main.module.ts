import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainRoutingModule} from './main-routing.module';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
  ],
  declarations: [HomepageComponent]
})
export class MainModule { }
