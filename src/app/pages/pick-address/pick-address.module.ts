import { PickAddressPageRoutingModule } from './pick-address-routing.module';
import { NgModule } from '@angular/core';
import { PickAddressPage } from './pick-address.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


/**
 * Responsible for managing pick address page context.
 */
@NgModule({
  declarations: [
    PickAddressPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    PickAddressPageRoutingModule
  ],
})
export class PickAddressPageModule {}
