import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/main/main.module#MainModule'
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule,
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: PreloadAllModules
      }
    )
  ],
  declarations: [],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
}
