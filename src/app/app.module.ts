import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { HttpErrorInterceptorProvider } from './interceptors/http-error.interceptor';
import { ErrorInterceptorProvider } from './interceptors/error.interceptor';
import { CategoryService } from './services/domain/category.service';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { ClientService } from './services/domain/client.service';
import { ProductService } from './services/domain/product.service';
import { CartService } from './services/cart.service';
import { ImageService } from './services/image.service';


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
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    CategoryService,
    AuthInterceptorProvider,
    HttpErrorInterceptorProvider,
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
