import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HomePage } from './home.page';


const routes: Array<Route> = [
  {
      path: '',
      component: HomePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
