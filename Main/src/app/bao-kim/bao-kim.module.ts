import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaoKimComponent} from "./bao-kim/bao-kim.component";
import {BaoKimRoutingModule} from "./bao-kim-routing.module";


@NgModule({
  imports: [
    CommonModule,
    BaoKimRoutingModule
  ],
  providers: [

  ],
  declarations: [BaoKimComponent]
})
export class BaoKimModule { }
