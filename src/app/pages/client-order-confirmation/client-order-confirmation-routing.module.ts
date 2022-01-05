import { ClientOrderConfirmationPage } from './client-order-confirmation.page';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';


const routes: Array<Route> = [
  {
    path: '',
    component: ClientOrderConfirmationPage
  }
];


/**
 * Responsible for handling client order confirmation page routes.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientOrderConfirmationPageRoutingModule {}
