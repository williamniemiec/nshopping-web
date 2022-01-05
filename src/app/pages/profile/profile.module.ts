import { ProfilePageRoutingModule } from './profile-routing.module';
import { NgModule } from '@angular/core';
import { ProfilePage } from './profile.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


/**
 * Responsible for managing profile page context.
 */
@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  providers:[
  ]
})
export class ProfilePageModule {}
