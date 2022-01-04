import { SignUpPageRoutingModule } from './signup-routing.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CityService } from '../../services/domain/CityService';
import { StateService } from '../../services/domain/StateService';
import { SignUpPage } from './signup.page';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SignUpPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule, 
    ReactiveFormsModule,
    SignUpPageRoutingModule
  ],
  providers: [
    StateService,
    CityService
  ]
})
export class SignUpPageModule {}