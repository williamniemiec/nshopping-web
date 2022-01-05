import { NgModule } from '@angular/core';
import { ProductsPage } from './products.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductsPageRoutingModule } from './products-routing.module';


/**
 * Responsible for managing products page context.
 */
@NgModule({
  declarations: [
    ProductsPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ProductsPageRoutingModule
  ]
})
export class ProductsPageModule {}
