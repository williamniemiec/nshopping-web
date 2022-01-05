import { SignUpPageRoutingModule } from './signup-routing.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CityService } from '../../services/domain/city.service';
import { StateService } from '../../services/domain/state.service';
import { SignUpPage } from './signup.page';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


/**
 * Responsible for managing sign up page context.
 */
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
