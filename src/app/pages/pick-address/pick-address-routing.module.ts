import { PickAddressPage } from './pick-address.page';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';


const routes: Array<Route> = [
  {
    path: '',
    component: PickAddressPage
  }
];


/**
 * Responsible for handling pick address page routes.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickAddressPageRoutingModule {}
