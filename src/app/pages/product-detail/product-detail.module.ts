import { ProductDetailPageRoutingModule } from './product-detail-routing.module';
import { NgModule } from '@angular/core';
import { ProductDetailPage } from './product-detail.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


/**
 * Responsible for managing product detail page context.
 */
@NgModule({
  declarations: [
    ProductDetailPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ProductDetailPageRoutingModule
  ],
})
export class ProductDetailPageModule {}
