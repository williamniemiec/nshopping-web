import { ClientOrderConfirmationPageRoutingModule } from './client-order-confirmation-routing.module';
import { NgModule } from '@angular/core';
import { ClientOrderService } from '../../services/domain/client-order.service';
import { ClientOrderConfirmationPage } from './client-order-confirmation.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


/**
 * Responsible for managing client order confirmation page context.
 */
@NgModule({
  declarations: [
    ClientOrderConfirmationPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ClientOrderConfirmationPageRoutingModule
  ],
  providers:[
    ClientOrderService
  ]
})
export class ClientOrderConfirmationPageModule {}
