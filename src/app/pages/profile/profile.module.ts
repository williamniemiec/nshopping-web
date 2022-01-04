import { ProfilePageRoutingModule } from './profile-routing.module';
import { NgModule } from '@angular/core';
import { ProfilePage } from './profile.page';
import { CameraOriginal } from '@ionic-native/camera';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


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
    CameraOriginal
  ]
})
export class ProfilePageModule {}
