import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientOrderService } from '../../services/domain/ClientOrderService';
import { ClientOrderConfirmationPage } from './client-order-confirmation';

@NgModule({
  declarations: [
    ClientOrderConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientOrderConfirmationPage),
  ],
  providers:[
    ClientOrderService
  ]
})
export class ClientOrderConfirmationPageModule {}
