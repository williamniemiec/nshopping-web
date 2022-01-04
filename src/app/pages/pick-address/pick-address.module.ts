import { PickAddressPageRoutingModule } from './pick-address-routing.module';
import { NgModule } from '@angular/core';
import { PickAddressPage } from './pick-address.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


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
