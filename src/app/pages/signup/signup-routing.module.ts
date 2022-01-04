import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { SignUpPage } from './signup.page';


const routes: Array<Route> = [
  {
    path: '',
    component: SignUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpPageRoutingModule {}
