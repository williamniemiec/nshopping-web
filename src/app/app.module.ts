import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorProvider } from './interceptors/AuthInterceptor';
import { HttpErrorInterceptorProvider } from './interceptors/HttpErrorInterceptor';
import { ErrorInterceptor } from './interceptors/ErrorInterceptor';
import { CategoryService } from './services/domain/CategoryService';
import { AuthService } from './services/AuthService';
import { StorageService } from './services/StorageService';
import { ClientService } from './services/domain/ClientService';
import { ProductService } from './services/domain/ProductService';
import { CartService } from './services/CartService';
import { ImageService } from './services/ImageService';


/**
 * Responsible for managing AppComponent context.
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: ErrorInterceptor},
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    CategoryService,
    AuthInterceptorProvider,
    HttpErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClientService,
    ProductService,
    CartService,
    ImageService
  ]
})
export class AppModule {}
