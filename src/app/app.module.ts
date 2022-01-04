import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ErrorhandlingService } from './services/ErrorHandleService';
import { RouteReuseStrategy } from '@angular/router';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { CategoryService } from './services/domain/CategoryService';
import { ErrorInterceptorProvider } from './interceptors/ErrorInterceptor';
import { AuthService } from './services/AuthService';
import { StorageService } from './services/StorageService';
import { ClientService } from './services/domain/ClientService';
import { AuthInterceptorProvider } from './interceptors/AuthInterceptor';
import { ProductService } from './services/domain/ProductService';
import { CartService } from './services/CartService';
import { ImageService } from './services/ImageService';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  bootstrap: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: ErrorhandlingService},
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    CategoryService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClientService,
    ProductService,
    CartService,
    ImageService
  ]
})
export class AppModule {}
