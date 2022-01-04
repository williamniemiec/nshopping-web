import { CartPageRoutingModule } from './cart-routing.module';
import { NgModule } from '@angular/core';
import { CartPage } from './cart.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    CartPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    CartPageRoutingModule
  ],
})
export class CartPageModule {}
