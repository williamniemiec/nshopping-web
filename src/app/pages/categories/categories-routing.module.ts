import { CategoriesPage } from './categories.page';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';


const routes: Array<Route> = [
  {
    path: '',
    component: CategoriesPage
  }
];


/**
 * Responsible for handling categories page routes.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesPageRoutingModule {}
