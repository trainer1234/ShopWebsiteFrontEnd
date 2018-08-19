import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BaoKimComponent} from "../bao-kim/bao-kim/bao-kim.component";

const routes: Routes = [
  {
    path: '',
    component: BaoKimComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class BaoKimRoutingModule {
}
