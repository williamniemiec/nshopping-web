import { PaymentPageRoutingModule } from './payment-routing.module';
import { NgModule } from '@angular/core';
import { PaymentPage } from './payment.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


/**
 * Responsible for managing payment page context.
 */
@NgModule({
  declarations: [
    PaymentPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule, 
    ReactiveFormsModule,
    PaymentPageRoutingModule
  ],
})
export class PaymentPageModule {}
