import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CityService } from '../../services/domain/CityService';
import { StateService } from '../../services/domain/StateService';
import { SignupPage } from './signup';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  providers: [
    StateService,
    CityService
  ]
})
export class SignupPageModule {}
