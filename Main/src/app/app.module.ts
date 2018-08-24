import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule, isPlatformServer, isPlatformBrowser } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './shared/auth.guard';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    NgtUniversalModule,
    BrowserModule.withServerTransition({ appId: 'Main' }),
    RouterModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
})
export class AppModule { }
