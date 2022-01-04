import { HomePageRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { HomePage} from './home.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HomePageRoutingModule
  ]
})
export class HomePageModule {
}
