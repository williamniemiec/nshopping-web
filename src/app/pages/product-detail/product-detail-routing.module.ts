import { ProductDetailPage } from './product-detail.page';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';


const routes: Array<Route> = [
  {
    path: '',
    component: ProductDetailPage
  }
];


/**
 * Responsible for handling product detail page routes.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailPageRoutingModule {}
