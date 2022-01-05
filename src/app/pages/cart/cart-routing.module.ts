import { CartPage } from './cart.page';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';


const routes: Array<Route> = [
  {
    path: '',
    component: CartPage
  }
];


/**
 * Responsible for handling cart page routes.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartPageRoutingModule {}
