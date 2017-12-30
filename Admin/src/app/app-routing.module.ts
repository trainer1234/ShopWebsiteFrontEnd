import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin/admin.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  // {path: '', component: HeaderComponent, outlet: 'header'},
  // {path: '', component: FooterComponent, outlet: 'footer'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
