import {
  NgModule
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  AppRoutingModule
} from './app-routing.module';
import {
  RouteReuseStrategy
} from '@angular/router';

import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import {
  IonicModule,
  IonicRouteStrategy
} from '@ionic/angular';

import {
  AppComponent
} from './app.component';
import {
  RequestInterceptor
} from './interceptors/request.interceptor';
import {
  TitleCasePipe
} from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true
  }, TitleCasePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
